import { project } from "./project";
// This function serves as a manager function that creates, fills, and manipulates an array of projects
const createProjectManager = () => {
    // Private array to hold to-do projects
    const projectList = [];

    const addProject = (newProjectName) => {
        // Refuse addition if project already exists in project manager
        if (projectNameExists(newProjectName)) {
            return { success: false, reason: `Duplicate Project - ${newProjectName} already exists!` }
        }

        const newProject = project();
        newProject.create(newProjectName);
        projectList.push(newProject);
        return { success: true, projectData: newProject.getData() };
    }

    const addHydratedProject = (parsedData) => {
        if (projectNameExists(parsedData.projectName)) {
            return { success: false, reason: `Data Error - ${parsedData.projectName} already exists!` }
        }
        const restoredProject = project();
        restoredProject.hydrate(parsedData);
        projectList.push(restoredProject);
        return { success: true, projectData: restoredProject.getData() };
    }

    const changeProjectName = (currProjectName, newProjectName) => {
        if (typeof currProjectName !== "string" || typeof newProjectName !== "string") {
            return { success: false, reason: `Invalid Change - Provide a current project name and new project name!` }
        }

        if (!currProjectName.trim() || !newProjectName.trim()) {
            return { success: false, reason: `Invalid Change - Project names cannot be blank!` }
        }

        if (currProjectName === "All") {
            return { success: false, reason: `Default Project - ${currProjectName} cannot be changed!` }
        }

        if (currProjectName === newProjectName) {
            return { success: false, reason: `No Change - ${currProjectName} & ${newProjectName} are identical!` }
        }

        if (!projectNameExists(currProjectName)) {
            return { success: false, reason: `Non-existent Project - ${currProjectName} is not a current project!` }
        }

        if (projectNameExists(newProjectName)) {
            return { success: false, reason: `Duplicate Name - ${newProjectName} already exists!` }
        }

        for (const project of projectList) {
            if (project.getName() === currProjectName) {
                project.setName(newProjectName);
                return { success: true, projectName: project.getName() };
            }
        }
    }

    const getProjectByName = (projectName) => {
        for (const project of projectList) {
            if (project.getName() === projectName) {
                return { success: true, projectData: project.getData() };
            }
        }
        return { success: false, reason: `Non-existent Project - ${projectName} is not a current project!` }
    }

    const removeProject = (projectName) => {
        // TODO
    }

    const createSnapshot = () => {
        return projectList.map(project => project.getData());
    }

    // Checks if a project already exists in the manager array
    const projectNameExists = (projectName) => projectList.some(project => project.getName() === projectName);

    const reset = () => {
        projectList.length = 0;
    }

    return {
        addProject,
        addHydratedProject,
        changeProjectName,
        createSnapshot,
        getProjectByName,
        projectNameExists,
        removeProject, // TODO
        reset,
    }
}

// Create one Project manager for the entire app
// Any import of this will use the same instance instead of separate instances
const projectManager = createProjectManager();

export { projectManager };