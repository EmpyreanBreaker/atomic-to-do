// This function creates and manipulates project objects
const project = () => {
    // Private fields
    let projectId = "";
    let projectName = "";

    const createProject = (newProjectName) => {
        projectId = crypto.randomUUID();
        projectName = newProjectName;
    }

    const changeProjectName = (newProjectName) => {
        if (projectName === "Home") {
            console.log("Default project cannot be renamed");
            return;
        }
        projectName = newProjectName;
    }

    const changeProjectId = (newProjectId) => {
        projectId = newProjectId;
    }

    const deleteProject = () => {
        projectId = null;
        projectName = null;
    }

    const getProjectInfo = () => {
        return { projectId, projectName };
    }

    // Use closure to interact with local variables
    return { createProject, changeProjectName, changeProjectId, deleteProject, getProjectInfo };
}

// This function serves as a manager function that creates, fills, and manipulates an array of projects
const createProjectManager = () => {
    // Private array to hold to-do projects
    const projectManagerArray = [];
    // Private array that serves as a data snapshot
    let projectManagerArraySnapshot = [];

    // Helper Function - Checks if the project already exists
    const alreadyInManagerArray = (projectName) => projectManagerArray.some(project => project.getProjectInfo().projectName === projectName);

    const addProjectToManagerArray = (newProjectName) => {
        // Refuse addition if project already exists in project manager
        if (alreadyInManagerArray(newProjectName)) {
            console.log(`Invalid Addition - ${newProjectName} already exists!`);
            return;
        }

        const newProject = project();
        newProject.createProject(newProjectName);
        projectManagerArray.push(newProject);

        createProjectManagerArraySnapshot();
    }

    const addProjectFromLocalStorageToManagerArray = (newProjectId, newProjectName) => {
        if (alreadyInManagerArray(newProjectName)) {
            console.log(`Invalid Addition - ${newProjectName} already exists!`);
            return;
        }
        const newProject = project();
        newProject.createProject(newProjectName);
        newProject.changeProjectId(newProjectId);
        projectManagerArray.push(newProject);
    }

    const changeProjectNameInManagerArray = (projectName, newProjectName) => {
        // Refuse name change of default project
        if (projectName === "Home") {
            console.log(`Invalid name change - ${projectName} cannot be changed!`);
            return;
        }

        // Refuse name change if project already exists in project manager
        if (alreadyInManagerArray(newProjectName)) {
            console.log(`Invalid name change - ${newProjectName} already exists!`);
            return;
        }

        // Refuse name change if the project does not exist in project manager
        if (!alreadyInManagerArray(projectName)) {
            console.log(`Invalid name change - ${projectName} is not an existing project!`);
            return;
        }

        for (let i = 0; i < projectManagerArray.length; i++) {
            const project = projectManagerArray[i];
            if (project.getProjectInfo().projectName === projectName) {
                project.changeProjectName(newProjectName);
                createProjectManagerArraySnapshot();
                return;
            }
        }
    }

    const clearProjectManagerArray = () => {
        projectManagerArray.length = 0;
    }

    const deleteProjectFromManagerArray = (projectName) => {
        // Refuse deletion of default project
        if (projectName === "Home") {
            console.log(`Invalid Deletion - ${projectName} cannot be deleted!`);
            return;
        }

        // Refuse deletion if the project does not exist in the project manager
        if (!alreadyInManagerArray(projectName)) {
            console.log(`Invalid Deletion - ${projectName} is not an existing project!`);
            return;
        }

        for (let i = 0; i < projectManagerArray.length; i++) {
            const project = projectManagerArray[i];
            if (project.getProjectInfo().projectName === projectName) {
                project.deleteProject();
                projectManagerArray.splice(i, 1);
                createProjectManagerArraySnapshot();
                return;
            }
        }
    }

    const createProjectManagerArraySnapshot = () => {
        projectManagerArraySnapshot = projectManagerArray.map(project => structuredClone(project.getProjectInfo()));
        localStorage.setItem("toDoProjects", JSON.stringify(projectManagerArraySnapshot))
    }

    const displayProjectsInManagerArray = () => {
        createProjectManagerArraySnapshot();
        console.table(projectManagerArray.map(project => project.getProjectInfo()));
    }

    const displayProjectsInManagerArraySnapshot = () => {
        console.table(projectManagerArraySnapshot);
    }

    return {
        addProjectToManagerArray, addProjectFromLocalStorageToManagerArray,
        changeProjectNameInManagerArray, clearProjectManagerArray, displayProjectsInManagerArraySnapshot,
        deleteProjectFromManagerArray, displayProjectsInManagerArray
    }
}

// Create one Project manager for the entire app
// Any import of this will use the same instance instead of separate instances
const projectManager = createProjectManager();

export { projectManager };