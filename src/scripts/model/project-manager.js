import { project } from "./project";
// This function serves as a manager function that creates, fills, and manipulates an array of projects
const createProjectManager = () => {
  // Private array to hold to-do projects
  const projectList = [];

  const addProject = (newName) => {
    const cleanNewName = normalizeName(newName);

    // Refuse addition if cleanNewName is invalid
    if (cleanNewName === "") {
      return {
        success: false,
        reason: `Invalid Project Name - Project names must be a string and not blank!`,
      };
    }

    // Refuse addition if project already exists in project manager
    if (projectNameExists(cleanNewName)) {
      return {
        success: false,
        reason: `Duplicate Project - ${cleanNewName} already exists in the project list!`,
      };
    }

    const newProject = project();
    newProject.create(cleanNewName);
    projectList.push(newProject);
    return { success: true, projectData: newProject.getData() };
  };

  const addHydratedProject = (parsedData) => {
    if (!parsedData || typeof parsedData !== "object") {
      return {
        success: false,
        reason: `Data Error - Stored project data must be a valid object!`,
      };
    }

    const cleanId = typeof parsedData.id === "string" ? parsedData.id.trim() : "";
    const cleanName = normalizeName(parsedData.name);

    if (cleanId === "") {
      return {
        success: false,
        reason: `Data Error - Stored project id must be a nonblank string!`,
      };
    }

    if (cleanName === "") {
      return {
        success: false,
        reason: `Data Error - Stored project name must be a nonblank string!`,
      };
    }

    if (projectNameExists(cleanName)) {
      return {
        success: false,
        reason: `Data Error - ${cleanName} already exists in the project list!`,
      };
    }

    const cleanedData = {
      id: cleanId,
      name: cleanName,
    };

    const restoredProject = project();
    restoredProject.hydrate(cleanedData);
    projectList.push(restoredProject);
    return { success: true, projectData: restoredProject.getData() };
  };

  const changeProjectName = (currName, newName) => {
    const cleanCurrName = normalizeName(currName);
    const cleanNewName = normalizeName(newName);

    if (!cleanCurrName || !cleanNewName) {
      return {
        success: false,
        reason: `Invalid Change - Project names must be a nonblank string!`,
      };
    }

    if (cleanCurrName === "All") {
      return {
        success: false,
        reason: `Default Project - ${cleanCurrName} cannot be changed!`,
      };
    }

    if (cleanCurrName === cleanNewName) {
      return {
        success: false,
        reason: `No Change - ${cleanCurrName} & ${cleanNewName} are identical!`,
      };
    }

    const targetProject = findProjectByName(cleanCurrName);

    if (!targetProject) {
      return {
        success: false,
        reason: `Non-existent Project - ${cleanCurrName} is not a current project!`,
      };
    }

    if (projectNameExists(cleanNewName)) {
      return {
        success: false,
        reason: `Duplicate Name - ${cleanNewName} already exists in the project list!`,
      };
    }

    targetProject.setName(cleanNewName);
    return { success: true, name: targetProject.getName() };
  };

  const createSnapshot = () => {
    return projectList.map((project) => project.getData());
  };

  const findProjectByName = (cleanName) => {
    return projectList.find((project) => project.getName() === cleanName);
  };

  const getDefaultProjectId = () => {
    const defaultProject = projectList.find((project) => project.getName() === "All");

    if (!defaultProject) {
      return { success: false, reason: `Data Error - There is no default project in the Project List!` };
    }

    return { success: true, defaultProjectId: defaultProject.getId() };
  };

  const getProject = (name) => {
    const cleanName = normalizeName(name);

    if (cleanName === "") {
      return {
        success: false,
        reason: `Invalid Project Name - Project names must be a string and not blank!`,
      };
    }

    const targetProject = projectList.find((project) => project.getName() === cleanName);

    if (!targetProject) {
      return {
        success: false,
        reason: `Non-existent Project - ${cleanName} is not a current project!`,
      };
    }

    return { success: true, projectData: targetProject.getData() };
  };

  const getProjectId = (name) => {
    const cleanName = normalizeName(name);

    if (cleanName === "") {
      return {
        success: false,
        reason: `Invalid Project Name - Project names must be a string and not blank!`,
      };
    }

    const targetProject = projectList.find((project) => project.getName() === cleanName);

    if (!targetProject) {
      return {
        success: false,
        reason: `Non-existent Project - ${cleanName} is not a current project!`,
      };
    }

    return { success: true, projectId: targetProject.getId() };
  };

  const normalizeName = (name) => {
    if (typeof name !== "string") {
      return "";
    }
    const trimmedName = name.trim().toLowerCase();
    return trimmedName.charAt(0).toUpperCase() + trimmedName.slice(1);
  };

  // Checks if a project already exists in the manager array
  const projectNameExists = (cleanName) => {
    return projectList.some((project) => project.getName() === cleanName);
  };

  const removeProject = (name) => {
    const cleanName = normalizeName(name);

    // Refuse deletion if cleanName is invalid
    if (cleanName === "") {
      return {
        success: false,
        reason: `Invalid Project Name - Project names must be a string and not blank!`,
      };
    }

    // Refuse deletion of default project
    if (cleanName === "All") {
      return {
        success: false,
        reason: `Default Project - ${cleanName} cannot be deleted!`,
      };
    }

    for (let i = 0; i < projectList.length; i++) {
      const targetProject = projectList[i];
      const targetProjectName = targetProject.getName();
      const targetProjectId = targetProject.getId();

      if (targetProjectName === cleanName) {
        projectList.splice(i, 1);
        return {
          success: true,
          removedProjectId: targetProjectId,
        };
      }
    }

    return {
      success: false,
      reason: `Invalid Project Name - ${cleanName} does not exist in the project list!`,
    };
  };

  const reset = () => {
    projectList.length = 0;
  };

  return {
    addProject,
    addHydratedProject,
    changeProjectName,
    createSnapshot,
    getDefaultProjectId,
    getProject,
    getProjectId,
    removeProject,
    reset,
  };
};

// Create one Project manager for the entire app
// Any import of this will use the same instance instead of separate instances
const projectManager = createProjectManager();

export { projectManager };
