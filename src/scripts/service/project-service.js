import { toDoRepository } from "../repository/to-do-repository";
import { project } from "../model/project";
import { projectManager } from "../model/project-manager";

const createProjectService = () => {
  const changeProjectName = (currName, newName) => {
    const changeResult = projectManager.changeProjectName(currName, newName);

    if (!changeResult.success) {
      return { success: false, reason: changeResult.reason };
    }

    toDoRepository.save("projects", createProjectListSnapshot());
    return { success: true, name: changeResult.name };
  };

  const createProject = (newName) => {
    const createResult = projectManager.addProject(newName);

    if (!createResult.success) {
      return { success: false, reason: createResult.reason };
    }

    toDoRepository.save("projects", createProjectListSnapshot());
    return { success: true, projectData: createResult.projectData };
  };

  const createProjectListSnapshot = () => {
    return projectManager.createSnapshot();
  };

  const getDefaultProjectId = () => {
    const retrievalResult = projectManager.getDefaultProjectId();

    if (!retrievalResult.success) {
      return { success: false, reason: retrievalResult.reason };
    }

    return { success: true, defaultProjectId: retrievalResult.defaultProjectId };
  };

  const getProject = (name) => {
    const retrievalResult = projectManager.getProject(name);

    if (!retrievalResult.success) {
      return { success: false, reason: retrievalResult.reason };
    }

    return { success: true, projectData: retrievalResult.projectData };
  };

  const getProjectId = (name) => {
    const retrievalResult = projectManager.getProjectId(name);

    if (!retrievalResult.success) {
      return { success: false, reason: retrievalResult.reason };
    }

    return { success: true, projectId: retrievalResult.projectId };
  };

  const initializeProjectAppData = () => {
    if (toDoRepository.exists("projects")) {
      return { success: true, initialized: false };
    }

    const defaultProject = project();
    defaultProject.create("All");

    toDoRepository.save("projects", [defaultProject.getData()]);
    return { success: true, initialized: true };
  };

  const loadProjectAppData = () => {
    if (!toDoRepository.exists("projects")) {
      return { success: true, loaded: false, count: 0, failed: 0 };
    }

    const retrievedProjects = toDoRepository.load("projects");
    const hydrationFailureList = [];
    let failed = 0;

    projectManager.reset();

    retrievedProjects.forEach((project) => {
      const hydrationResult = projectManager.addHydratedProject(project);

      if (!hydrationResult.success) {
        failed += 1;
        hydrationFailureList.push(hydrationResult.reason);
      }
    });

    return {
      success: true,
      loaded: true,
      count: retrievedProjects.length,
      failed,
      hydrationFailureList,
    };
  };

  const removeProject = (name) => {
    const removalResult = projectManager.removeProject(name);

    if (!removalResult.success) {
      return { success: false, reason: removalResult.reason };
    }
    
    return {
      success: true,
      removedProjectId: removalResult.removedProjectId,
    };
  };

  return {
    changeProjectName,
    createProject,
    createProjectListSnapshot,
    getDefaultProjectId,
    getProject,
    getProjectId,
    initializeProjectAppData,
    loadProjectAppData,
    removeProject,
  };
};

const projectService = createProjectService();
export { projectService };
