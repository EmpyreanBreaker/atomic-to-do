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

    const getId = () => {
        return projectId;
    }

    const getName = () => {
        return projectName;
    }

    const hydrate = (parsedData) => {
        projectId = parsedData.projectId;
        projectName = parsedData.projectName;
    }

    const setName = (newProjectName) => {
        if (projectName === "All") {
            return { success: false, reason: "default-project-cannot-be-renamed" };
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
        getId,
        getName,
        hydrate,
        setName,
        remove,
        toJSON
    };
}

export { project }