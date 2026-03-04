// Technically I should be building from lowest (Atomic-To-Do) to highest Project
// But let me get my feet wet and we can do it properly then

// Project() is a function that creates and manipulates To-Do projects
const project = () => {
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

    const deleteProject = () => {
        projectId = null;
        projectName = null;
    }

    const getProjectInfo = () => {
        return { projectId, projectName };
    }

    // Use closure to interact with local variables
    return { createProject, changeProjectName, deleteProject, getProjectInfo };
}

// Create, fill, and manipulate an array of projects
const createProjectManager = () => {
    // Create array to hold to-do projects
    const projectManagerArray = [];

    // Helper Function - Checks if the project already exists
    const alreadyInManagerArray = (newProjectName) => projectManagerArray.some(project => project.getProjectInfo().projectName === newProjectName);

    const addProjectToManagerArray = (newProjectName) => {
        // Refuse addition if project already exists in project manager
        if (alreadyInManagerArray(newProjectName)) {
            console.log(`Invalid Addition - ${newProjectName} already exists!`);
            return;
        }

        // Else
        const newProject = project();
        newProject.createProject(newProjectName);
        projectManagerArray.push(newProject);
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
            }
        }
    }

    const displayProjectsInManagerArray = () => {
        console.table(projectManagerArray.map(project => project.getProjectInfo()));
    }

    const renameProjectInManagerArray = (projectName, newProjectName) => {
        // Refuse name change of default project
        if (projectName === "Home") {
            console.log(`Invalid Deletion - ${projectName} cannot be deleted!`);
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
            }
        }
    }

    return { addProjectToManagerArray, deleteProjectFromManagerArray, displayProjectsInManagerArray, renameProjectInManagerArray }
}

// Create one Project manager for the entire app
// Any import of this will use the same instance instead of separate instances
const projectManager = createProjectManager();

// Create default project
projectManager.addProjectToManagerArray("Home");

export { projectManager };