import { toDoRepository } from "../repository/to-do-repository";
import { atomicService } from "../service/atomic-service";
import { parentService } from "../service/parent-service";
import { projectService } from "../service/project-service";

const createCombinedService = () => {
  const buildAllHierarchy = () => {
    // Get every available data point
    const projects = projectService.getProjects();
    const parents = parentService.getParents();
    const atomics = atomicService.createAtomicListSnapshot();

    // allHierarchy: Map where each project id points to that project's hierarchy bucket.
    const allHierarchy = new Map();

    // First pass: initialize allHierarchy so every project gets an entry, even if it has no parents yet.
    // allHierarchy: Map where each project id points to that project’s hierarchy bucket.
    // Key = project.id
    // Value = object containing: {
    //   project: full project snapshot object,
    //   parents: Map of parent entries for that project
    // }
    for (const project of projects) {
      allHierarchy.set(project.id, { project, parents: new Map() });
    }

    // parentLookup: Helper map for finding a parent entry directly by parent id
    // Allows atomic children to find a parent even if that atomic child
    // does not know the projectId to access the project bucket for its parent
    // Key: parent.id
    // Value = object containing: {
    //   parent: full parent snapshot object,
    //   atomics: array that will hold parent's atomic children
    // }
    const parentLookup = new Map();

    // Second pass: Add each parent to the correct project bucket. Every parent gets an array to hold atomics
    // parents: Map where each parent id points to a parent entry under the current project.
    // Key = parent.id
    // Value = object containing: {
    //   parent: full parent snapshot object,
    //   atomics: array that will hold parent's atomic children
    // }
    for (const parent of parents) {
      // Get the project bucket that matches the parent's projectId
      const matchingProjectEntry = allHierarchy.get(parent.projectId);

      if (!matchingProjectEntry) {
        continue;
      }

      // Set the parent and array container for its atomics into this bucket
      const parentEntry = { parent, atomics: [] };
      matchingProjectEntry.parents.set(parent.id, parentEntry);

      // The parentEntry object in the parentLookup map is the exact same parentEntry object in allHierarchy
      // This works because this is a pass by reference. Both maps reference the same object in memory
      parentLookup.set(parent.id, parentEntry);
    }

    // Third pass: Add each atomic to the array of the correct parent bucket.
    for (const atomic of atomics) {
      const matchingParentEntry = parentLookup.get(atomic.parentId);

      if (!matchingParentEntry) {
        continue;
      }

      matchingParentEntry.atomics.push(atomic);
    }

    return { success: true, allHierarchy };
  };

  const displayAllHierarchy = () => {
    const hierarchyResult = buildAllHierarchy();

    if (!hierarchyResult.success) {
      return { success: false, reason: hierarchyResult.reason };
    }

    const allHierarchy = hierarchyResult.allHierarchy;

    // First get the value object of the first layer
    for (const [, projectEntry] of allHierarchy) {
      console.log(`PROJECT: ${projectEntry.project.name}`);

      // Get the value object of the inner layer
      for (const [, parentEntry] of projectEntry.parents) {
        console.log(`Title: ${parentEntry.parent.title}`);
        console.log(`Description: ${parentEntry.parent.description}`);

        for (const atomic of parentEntry.atomics) {
          console.log(`Task: ${atomic.task}`);
        }
      }
    }

    return { success: true };
  };

  const getParentCounts = () => {
    const hierarchyResult = buildAllHierarchy();

    if (!hierarchyResult.success) {
      return { success: false, reason: hierarchyResult.reason };
    }

    const allHierarchy = hierarchyResult.allHierarchy;
    const projectCounts = [];
    let totalParentCount = 0;

    // 1) Build sidebar-friendly project count snapshot
    for (const [projectId, projectEntry] of allHierarchy) {
      const projectName = projectEntry.project.name;
      const parentCount = projectEntry.parents.size;

      if (projectName !== "All") {
        totalParentCount += parentCount;
      }

      projectCounts.push({
        projectId,
        projectName,
        parentCount,
      });
    }

    // 2) Overwrite "All" with the calculated total
    for (const projectCountEntry of projectCounts) {
      if (projectCountEntry.projectName === "All") {
        projectCountEntry.parentCount = totalParentCount;
      }
    }

    return {
      success: true,
      projectCounts: projectCounts,
    };
  };

  const initializeAppData = () => {
    const projectInitializationResult = projectService.initializeProjectAppData();
    const parentInitializationResult = parentService.initializeParentAppData();
    const atomicInitializationResult = atomicService.initializeAtomicAppData();

    return {
      success: true,
      projectInitializationResult,
      parentInitializationResult,
      atomicInitializationResult,
    };
  };

  const loadAppData = () => {
    const projectLoadResult = projectService.loadProjectAppData();
    const parentLoadResult = parentService.loadParentAppData();
    const atomicLoadResult = atomicService.loadAtomicAppData();

    return {
      success: true,
      projectLoadResult,
      parentLoadResult,
      atomicLoadResult,
    };
  };

  // Remove parent, delete children, and save
  const removeParent = (parentId) => {
    const retrievalResult = parentService.getParent(parentId);

    if (!retrievalResult.success) {
      return { success: false, reason: retrievalResult.reason };
    }

    const atomicRemovalResult = atomicService.removeAtomicsOfParent(parentId);

    if (!atomicRemovalResult.success) {
      return { success: false, reason: atomicRemovalResult.reason };
    }

    const parentRemovalResult = parentService.removeParent(parentId);

    if (!parentRemovalResult.success) {
      return { success: false, reason: parentRemovalResult.reason };
    }

    toDoRepository.save("atomics", atomicService.createAtomicListSnapshot());
    toDoRepository.save("parents", parentService.createParentListSnapshot());

    return {
      success: true,
      removed: atomicRemovalResult.removed,
      removedParentId: parentRemovalResult.removedParentId,
    };
  };

  // Helper function
  // Remove parent. Delete children. Don't save
  const removeParentAndChildren = (parentId) => {
    const retrievalResult = parentService.getParent(parentId);

    if (!retrievalResult.success) {
      return { success: false, reason: retrievalResult.reason };
    }

    const atomicRemovalResult = atomicService.removeAtomicsOfParent(parentId);

    if (!atomicRemovalResult.success) {
      return { success: false, reason: atomicRemovalResult.reason };
    }

    const parentRemovalResult = parentService.removeParent(parentId);

    if (!parentRemovalResult.success) {
      return { success: false, reason: parentRemovalResult.reason };
    }

    return {
      success: true,
      removed: atomicRemovalResult.removed,
      removedParentId: parentRemovalResult.removedParentId,
    };
  };

  // Remove project and reassign children if any
  const removeProject = (name) => {
    const defaultProjectResult = projectService.getDefaultProjectId();

    if (!defaultProjectResult.success) {
      return { success: false, reason: defaultProjectResult.reason };
    }

    const targetProjectResult = projectService.getProjectId(name);

    if (!targetProjectResult.success) {
      return { success: false, reason: targetProjectResult.reason };
    }

    const defaultProjectId = defaultProjectResult.defaultProjectId;
    const targetProjectId = targetProjectResult.projectId;

    const reassignResult = parentService.reassignParentsToProject(targetProjectId, defaultProjectId);

    if (!reassignResult.success) {
      return { success: false, reason: reassignResult.reason };
    }

    const projectRemovalResult = projectService.removeProject(name);

    if (!projectRemovalResult.success) {
      return { success: false, reason: projectRemovalResult.reason };
    }

    toDoRepository.save("parents", parentService.createParentListSnapshot());
    toDoRepository.save("projects", projectService.getProjects());

    return {
      success: true,
      changed: reassignResult.changed,
      removedProjectId: projectRemovalResult.removedProjectId,
      defaultProjectId,
    };
  };

  // Remove project and all children
  const removeProjectAndChildren = (name) => {
    const targetProjectResult = projectService.getProjectId(name);

    if (!targetProjectResult.success) {
      return { success: false, reason: targetProjectResult.reason };
    }

    const targetProjectId = targetProjectResult.projectId;
    const parentIdsRetrievalResult = parentService.getParentIdsByProjectId(targetProjectId);

    if (!parentIdsRetrievalResult.success) {
      return { success: false, reason: parentIdsRetrievalResult.reason };
    }

    const targetParentIdsList = parentIdsRetrievalResult.targetParentIdsList;

    // Get a list of parents that have this projectId
    // Loop through them and call removeParent
    // removeParent will handle atomic deletion
    // Don't save until everything goes through successfully
    for (let i = targetParentIdsList.length - 1; i >= 0; i--) {
      const targetParentId = targetParentIdsList[i];
      const parentRemovalResult = removeParentAndChildren(targetParentId);

      if (!parentRemovalResult.success) {
        return { success: false, reason: parentRemovalResult.reason };
      }
    }

    const projectRemovalResult = projectService.removeProject(name);

    if (!projectRemovalResult.success) {
      return { success: false, reason: projectRemovalResult.reason };
    }

    toDoRepository.save("atomics", atomicService.createAtomicListSnapshot());
    toDoRepository.save("parents", parentService.createParentListSnapshot());
    toDoRepository.save("projects", projectService.createProjectListSnapshot());

    return {
      success: true,
      removedProjectId: projectRemovalResult.removedProjectId,
    };
  };

  return {
    buildAllHierarchy,
    displayAllHierarchy,
    getParentCounts,
    initializeAppData,
    loadAppData,
    removeParent,
    removeProject,
    removeProjectAndChildren,
  };
};

const combinedService = createCombinedService();

export { combinedService };
