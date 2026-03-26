// This function creates and manipulates project objects
const project = () => {
    // Private fields
    let projectId = "";
    let projectName = "";

    const create = (newProjectName) => {
        projectId = crypto.randomUUID();
        projectName = newProjectName;
    }

    const getData = () => {
        return { projectId, projectName };
    }

    const hydrate = (parsedData) => {
        projectId = parsedData.projectId;
        projectName = parsedData.projectName;
    }

    const setId = (newProjectId) => {
        projectId = newProjectId;
    }

    const setName = (newProjectName) => {
        if (projectName === "All") {
            console.log("Default project cannot be renamed");
            return;
        }
        projectName = newProjectName;
    }

    const remove = () => {
        projectId = null;
        projectName = null;
    }

    const toJSON = () => {
        return { projectId, projectName };
    };

    // Use closure to interact with local variables
    return {
        create,
        getData,
        hydrate,
        setId,
        setName,
        remove,
        toJSON
    };
}

// This function serves as a manager function that creates, fills, and manipulates an array of projects
const createProjectManager = () => {
    // Private array to hold to-do projects
    const managerArray = [];

    const addProject = (newProjectName) => {
        // Refuse addition if project already exists in project manager
        if (projectNameExists(newProjectName)) {
            console.log(`Invalid Addition - ${newProjectName} already exists!`);
            return;
        }

        const newProject = project();
        newProject.create(newProjectName);
        managerArray.push(newProject);
    }

    const addHydratedProject = (parsedData) => {
        if (projectNameExists(parsedData.projectName)) {
            console.log(`Invalid Addition - ${parsedData.projectName} already exists!`);
            return;
        }
        const restoredProject = project();
        restoredProject.hydrate(parsedData);
        managerArray.push(restoredProject);
    }

    const createSnapshot = () => {
        return managerArray.map(project => project.getData());
    }

    // Checks if a project already exists in the manager array
    const projectNameExists = (projectName) => managerArray.some(project => project.getData().projectName === projectName);


    // const addProjectFromLocalStorageToManagerArray = (newProjectId, newProjectName) => {
    //     if (projectNameExists(newProjectName)) {
    //         console.log(`Invalid Addition - ${newProjectName} already exists!`);
    //         return;
    //     }
    //     const newProject = project();
    //     newProject.create(newProjectName);
    //     newProject.setId(newProjectId);
    //     managerArray.push(newProject);
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

    //     for (let i = 0; i < managerArray.length; i++) {
    //         const project = managerArray[i];
    //         if (project.getData().projectName === projectName) {
    //             project.setName(newProjectName);
    //             storeToDoProjectManagerArraySnapshot();
    //             return;
    //         }
    //     }
    // }

    // const removeProjectManagerArray = () => {
    //     managerArray.length = 0;
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

    //     for (let i = 0; i < managerArray.length; i++) {
    //         const project = managerArray[i];
    //         if (project.getData().projectName === projectName) {
    //             project.remove();
    //             managerArray.splice(i, 1);
    //             storeToDoProjectManagerArraySnapshot();
    //             return;
    //         }
    //     }
    // }

    // const createToDoProjectManagerArraySnapshot = () => {
    //     return managerArraySnapshot = managerArray.map(project => structuredClone(project.getData()));
    // }

    // const storeToDoProjectManagerArraySnapshot = () => {
    //     managerArraySnapshot = managerArray.map(project => structuredClone(project.getData()));
    //     localStorage.setItem("projects", JSON.stringify(managerArraySnapshot))
    // }

    // const displayProjectsInManagerArray = () => {
    //     storeToDoProjectManagerArraySnapshot();
    //     console.table(managerArray.map(project => project.getData()));
    // }

    // const displayProjectsInManagerArraySnapshot = () => {
    //     console.table(managerArraySnapshot);
    // }

    // const getDefaultToDoProjectInfo = () => {
    //     for (let i = 0; i < managerArray.length; i++) {
    //         const defaultProject = managerArray[i].getData();
    //         if (defaultProject.projectName === "All") {
    //             return defaultProject;
    //         }
    //     }
    // }

    return {
        addProject,
        addHydratedProject,
        projectNameExists,
        createSnapshot,
    }
}

// Create one Project manager for the entire app
// Any import of this will use the same instance instead of separate instances
const projectManager = createProjectManager();

export { projectManager };