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
    if (nameExists(cleanNewName)) {
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
        reason: `Data Error - Stored project data is invalid!`,
      };
    }

    if (typeof parsedData.id !== "string" || parsedData.id.trim() === "") {
      return {
        success: false,
        reason: `Data Error - Project id is invalid in stored data!`,
      };
    }

    const cleanName = normalizeName(parsedData.name);

    if (cleanName === "") {
      return {
        success: false,
        reason: `Data Error - Project name is invalid in stored data!`,
      };
    }

    if (nameExists(cleanName)) {
      return {
        success: false,
        reason: `Data Error - ${cleanName} already exists in the project list!`,
      };
    }

    const cleanedData = {
      id: parsedData.id,
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
        reason: `Invalid Change - Project names must be a string and not blank!`,
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

    if (nameExists(cleanNewName)) {
      return {
        success: false,
        reason: `Duplicate Name - ${cleanNewName} already exists in the project list!`,
      };
    }
    
    targetProject.setName(cleanNewName);
    return { success: true, name: targetProject.getName() };
  };

  const findProjectByName = (cleanName) => {
    return projectList.find((project) => project.getName() === cleanName);
  };

  const getProjectByName = (name) => {
    const cleanName = normalizeName(name);

    if (!cleanName) {
      return {
        success: false,
        reason: `Invalid Project Name - Project names must be a string and not blank!`,
      };
    }

    for (const project of projectList) {
      if (project.getName() === cleanName) {
        return { success: true, projectData: project.getData() };
      }
    }

    return {
      success: false,
      reason: `Non-existent Project - ${cleanName} is not a current project!`,
    };
  };

  const normalizeName = (name) => {
    if (typeof name !== "string") {
      return "";
    }
    const trimmedName = name.trim().toLowerCase();
    return trimmedName.charAt(0).toUpperCase() + trimmedName.slice(1);
  };

  const removeProject = (name) => {
    // TODO
  };

  const createSnapshot = () => {
    return projectList.map((project) => project.getData());
  };

  // Checks if a project already exists in the manager array
  const nameExists = (cleanName) => {
    return projectList.some((project) => project.getName() === cleanName);
  };

  const reset = () => {
    projectList.length = 0;
  };

  return {
    addProject,
    addHydratedProject,
    changeProjectName,
    createSnapshot,
    getProjectByName,
    nameExists,
    removeProject, // TODO
    reset,
  };
};

// Create one Project manager for the entire app
// Any import of this will use the same instance instead of separate instances
const projectManager = createProjectManager();

export { projectManager };
