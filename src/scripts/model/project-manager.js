import { project } from "./project";
// This function serves as a manager function that creates, fills, and manipulates an array of projects
const createProjectManager = () => {
    // Private array to hold to-do projects
    const projectList = [];

    const addProject = (newProjectName) => {
        // Refuse addition if project already exists in project manager
        if (projectNameExists(newProjectName)) {
            return { success: false, reason: "duplicate-name" }
        }

        const newProject = project();
        newProject.create(newProjectName);
        projectList.push(newProject);
        return { success: true, project: newProject.getData() };
    }

    const addHydratedProject = (parsedData) => {
        if (projectNameExists(parsedData.projectName)) {
            return { success: false, reason: "duplicate-name" }
        }
        const restoredProject = project();
        restoredProject.hydrate(parsedData);
        projectList.push(restoredProject);
        return { success: true, project: restoredProject.getData() };
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
        createSnapshot,
        projectNameExists,
        reset,
    }
}

// Create one Project manager for the entire app
// Any import of this will use the same instance instead of separate instances
const projectManager = createProjectManager();

export { projectManager };
// const addProjectFromLocalStorageToManagerArray = (newProjectId, newProjectName) => {
//     if (projectNameExists(newProjectName)) {
//         console.log(`Invalid Addition - ${newProjectName} already exists!`);
//         return;
//     }
//     const newProject = project();
//     newProject.create(newProjectName);
//     newProject.setId(newProjectId);
//     projectList.push(newProject);
// }

// const setNameInManagerArray = (projectName, newProjectName) => {
//     // Refuse name change of default project
//     if (projectName === "All") {
//         console.log(`Invalid name change - ${projectName} cannot be changed!`);
//         return;
//     }

//     // Refuse name change if project already exists in project manager
//     if (projectNameExists(newProjectName)) {
//         console.log(`Invalid name change - ${newProjectName} already exists!`);
//         return;
//     }

//     // Refuse name change if the project does not exist in project manager
//     if (!projectNameExists(projectName)) {
//         console.log(`Invalid name change - ${projectName} is not an existing project!`);
//         return;
//     }

//     for (let i = 0; i < projectList.length; i++) {
//         const project = projectList[i];
//         if (project.getData().projectName === projectName) {
//             project.setName(newProjectName);
//             storeToDoProjectManagerArraySnapshot();
//             return;
//         }
//     }
// }



// const removeFromManagerArray = (projectName) => {
//     // Refuse deletion of default project
//     if (projectName === "All") {
//         console.log(`Invalid Deletion - Default Project - '${projectName}' cannot be deleted!`);
//         return;
//     }

//     // Refuse deletion if the project does not exist in the project manager
//     if (!projectNameExists(projectName)) {
//         console.log(`Invalid Deletion - ${projectName} is not an existing project!`);
//         return;
//     }

//     for (let i = 0; i < projectList.length; i++) {
//         const project = projectList[i];
//         if (project.getData().projectName === projectName) {
//             project.remove();
//             projectList.splice(i, 1);
//             storeToDoProjectManagerArraySnapshot();
//             return;
//         }
//     }
// }

// const createToDoProjectManagerArraySnapshot = () => {
//     return managerArraySnapshot = projectList.map(project => structuredClone(project.getData()));
// }

// const storeToDoProjectManagerArraySnapshot = () => {
//     managerArraySnapshot = projectList.map(project => structuredClone(project.getData()));
//     localStorage.setItem("projects", JSON.stringify(managerArraySnapshot))
// }

// const displayProjectsInManagerArray = () => {
//     storeToDoProjectManagerArraySnapshot();
//     console.table(projectList.map(project => project.getData()));
// }

// const displayProjectsInManagerArraySnapshot = () => {
//     console.table(managerArraySnapshot);
// }

// const getDefaultToDoProjectInfo = () => {
//     for (let i = 0; i < projectList.length; i++) {
//         const defaultProject = projectList[i].getData();
//         if (defaultProject.projectName === "All") {
//             return defaultProject;
//         }
//     }
// }