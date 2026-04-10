import { atomicService } from "../service/atomic-service";
import { parentService } from "../service/parent-service";
import { projectService } from "../service/project-service";

const createCombinedService = () => {
  const initializeAppData = () => {
    projectService.initializeProjectAppData();
    parentService.initializeParentAppData();
    atomicService.initializeAtomicAppData();
  };

  const loadAppData = () => {
    projectService.loadProjectAppData();
    parentService.loadParentAppData();
    atomicService.loadAtomicAppData();
  };

  // Will be used for Default Project - All in the UI
  const buildAllHierarchy = () => {
    // 1) Build Lookup Map:
    // Map<
    //   ProjectId,
    //   {
    //     project: ProjectData,
    //     parents: Map<
    //       ParentId,
    //       {
    //         parent: ParentData,
    //         atomics: AtomicData[]
    //       }
    //     >
    //   }
    // >
    const allHierarchy = new Map();

    // Extra lookup map so atomics can find parents directly by parentId
    const parentLookup = new Map();

    const projects = projectService.getProjects();
    const parents = parentService.getParents();
    const atomics = atomicService.getAtomics();

    // 2) Seed every project first so projects with 0 parents still show up
    for (const project of projects) {
      allHierarchy.set(project.id, {
        project,
        parents: new Map(),
      });
    }

    // 3) Add each parent into the correct project bucket
    // Parents with 0 children still show up because they get seeded with atomics: []
    for (const parent of parents) {
      const matchingProjectEntry = allHierarchy.get(parent.projectId);

      if (!matchingProjectEntry) {
        continue;
      }

      const parentEntry = {
        parent,
        atomics: [],
      };

      matchingProjectEntry.parents.set(parent.id, parentEntry);
      parentLookup.set(parent.id, parentEntry);
    }

    // 4) Add each atomic into the correct parent bucket
    for (const atomic of atomics) {
      const matchingParentEntry = parentLookup.get(atomic.parentId);

      if (!matchingParentEntry) {
        continue;
      }

      matchingParentEntry.atomics.push(atomic);
    }

    // Don't Delete - Study
    // Array destructruring - skip the key and grab the value
    // Outer loop value is the object holding full project data and parents inner map
    // for (const [, projectEntry] of allHierarchy) {
    //   console.log("PROJECT:", projectEntry.project.name);

    //   // Inner loop value is the object holding full parent data and atomics inner array
    //   for (const [, parentEntry] of projectEntry.parents) {
    //     console.log("  PARENT:", parentEntry.parent.title);
    //     console.log("  ATOMICS:", parentEntry.atomics);
    //   }
    // }

    // Explicit Version - Don't Delete - Study
    // for (const entry of allHierarchy) {
    //   const projectId = entry[0];
    //   const projectEntry = entry[1];

    //   console.log("PROJECT:", projectEntry.project.name);

    //   for (const parentMapEntry of projectEntry.parents) {
    //     const parentId = parentMapEntry[0];
    //     const parentEntry = parentMapEntry[1];

    //     console.log("  PARENT:", parentEntry.parent.title);
    //     console.log("  ATOMICS:", parentEntry.atomics);
    //   }
    // }

    // Even more explicit version - Don't Delete - Study
    // for (const [projectId, projectEntry] of allHierarchy) {
    //   console.log("PROJECT ID:", projectId);
    //   console.log("PROJECT:", projectEntry.project.name);

    //   for (const [parentId, parentEntry] of projectEntry.parents) {
    //     console.log("  PARENT ID:", parentId);
    //     console.log("  PARENT:", parentEntry.parent.title);
    //     console.log("  ATOMICS:", parentEntry.atomics);
    //   }
    // }
    return allHierarchy;
  };

  // Remove project without deleting children
  const removeProject = (name) => {
    const defaultProjectResult = projectService.getDefaultProjectId();
    const targetProjectResult = projectService.getProjectId(name);

    if (!defaultProjectResult.success) {
      return { success: false, reason: defaultProjectResult.reason };
    }

    if (!targetProjectResult.success) {
      return { success: false, reason: targetProjectResult.reason };
    }

    const defaultProjectId = defaultProjectResult.defaultProjectId;
    const targetProjectId = targetProjectResult.projectId;

    const reassignResult = parentService.reassignParentsToProject(targetProjectId, defaultProjectId);

    if (!reassignResult.success) {
      return { success: false, reason: reassignResult.reason };
    }

    const removalResult = projectService.removeProject(name);

    if (!removalResult.success) {
      return { success: false, reason: removalResult.reason };
    }

    return {
      success: true,
      changed: reassignResult.changed,
      removedProjectId: removalResult.removedProjectId,
      defaultProjectId,
    };
  };

  return {
    buildAllHierarchy,
    initializeAppData,
    loadAppData,
    removeProject,
  };
};

const combinedService = createCombinedService();

export { combinedService };
