import { project } from "./project";
// This function serves as a manager function that creates, fills, and manipulates an array of projects
const createProjectManager = () => {
  // Private array to hold to-do projects
  const projectList = [];

  const addProject = (newName) => {
    // Refuse addition if project already exists in project manager
    if (nameExists(newName)) {
      return {
        success: false,
        reason: `Duplicate Project - ${newName} already exists!`,
      };
    }

    const newProject = project();
    newProject.create(newName);
    projectList.push(newProject);
    return { success: true, projectData: newProject.getData() };
  };

  const addHydratedProject = (parsedData) => {
    if (nameExists(parsedData.name)) {
      return {
        success: false,
        reason: `Data Error - ${parsedData.name} already exists!`,
      };
    }
    const restoredProject = project();
    restoredProject.hydrate(parsedData);
    projectList.push(restoredProject);
    return { success: true, projectData: restoredProject.getData() };
  };

  const changeProjectName = (currName, newName) => {
    if (
      typeof currName !== "string" ||
      typeof newName !== "string"
    ) {
      return {
        success: false,
        reason: `Invalid Change - Provide a current project name and new project name!`,
      };
    }

    if (!currName.trim() || !newName.trim()) {
      return {
        success: false,
        reason: `Invalid Change - Project names cannot be blank!`,
      };
    }

    if (currName === "All") {
      return {
        success: false,
        reason: `Default Project - ${currName} cannot be changed!`,
      };
    }

    if (currName === newName) {
      return {
        success: false,
        reason: `No Change - ${currName} & ${newName} are identical!`,
      };
    }

    if (!nameExists(currName)) {
      return {
        success: false,
        reason: `Non-existent Project - ${currName} is not a current project!`,
      };
    }

    if (nameExists(newName)) {
      return {
        success: false,
        reason: `Duplicate Name - ${newName} already exists!`,
      };
    }

    for (const project of projectList) {
      if (project.getName() === currName) {
        project.setName(newName);
        return { success: true, name: project.getName() };
      }
    }
  };

  const getProjectByName = (name) => {
    for (const project of projectList) {
      if (project.getName() === name) {
        return { success: true, projectData: project.getData() };
      }
    }
    return {
      success: false,
      reason: `Non-existent Project - ${name} is not a current project!`,
    };
  };

  const removeProject = (name) => {
    // TODO
  };

  const createSnapshot = () => {
    return projectList.map((project) => project.getData());
  };

  // Checks if a project already exists in the manager array
  const nameExists = (name) =>
    projectList.some((project) => project.getName() === name);

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
