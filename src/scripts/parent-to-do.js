// This function creates and manipulates Parent To-Do objects
const parentToDo = () => {
    // Private fields
    let parentId = "";
    let projectName = "";
    let title = "";
    let description = "";
    let status = "";
    let dueDate = "";

    const createParentToDo = (testParentId, newProjectName, newTitle, newDescription, newDueDate, newStatus = "incomplete") => {
        parentId = testParentId;
        projectName = newProjectName;
        title = newTitle;
        description = newDescription.trim();
        dueDate = newDueDate;
        status = newStatus;
    }

    const changeParentDescription = (newDescription) => {
        if (newDescription !== null || newDescription !== "") {
            description = newDescription;
        }
    }

    const changeParentDueDate = (newDueDate) => {
        if (newDueDate !== null || newDueDate !== "") {
            dueDate = newDueDate;
        }
    }

    const changeParentProjectName = (newProjectName) => {
        if (newProjectName !== null || newProjectName !== "") {
            projectName = newProjectName;
        }
    }

    const changeParentStatus = () => {
        status === "incomplete" ? status = "completed" : status = "incomplete";
    }

    const changeParentTitle = (newTitle) => {
        if (newTitle !== null || newTitle !== "") {
            title = newTitle;
        }
    }

    const deleteParentToDo = () => {
        parentId = null;
        projectName = null;
        title = null;
        description = null;
        dueDate = null;
        status = null;
    }

    const getParentToDoInfo = () => {
        return { parentId, projectName, title, description, dueDate, status }
    }

    return {
        createParentToDo, changeParentDescription,
        changeParentDueDate, changeParentProjectName,
        changeParentStatus, changeParentTitle,
        deleteParentToDo, getParentToDoInfo
    }
}

// This function serves as a manager function that creates, fills, and manipulates an array of parent-to-do objects
const createparentToDoManager = () => {
    // Private array to hold atomic-to-do objects
    const parentManagerArray = [];

    // Testing
    let testParentId = 0;

    // Helper Function - Checks if the project already exists in the array
    const alreadyInManagerArray = (parentId) => parentManagerArray.some(parentToDo => parentToDo.getParentToDoInfo().parentId === parentId);

    const addParentToDoToManagerArray = (newProjectName, newTitle, newDescription, newDueDate, newStatus) => {
        const newParentToDo = parentToDo();
        newParentToDo.createParentToDo(testParentId, newProjectName, newTitle, newDescription, newDueDate, newStatus);
        testParentId++;
        parentManagerArray.push(newParentToDo);
    }

    const changeParentDescriptionInManagerArray = (parentId, newDescription) => {
        // Refuse description change if the project does not exist in project manager
        if (!alreadyInManagerArray(parentId)) {
            console.log(`Invalid description change - This is not an existing Parent To-Do!`);
            return;
        }

        for (let i = 0; i < parentManagerArray.length; i++) {
            const parentToDo = parentManagerArray[i];
            if (parentToDo.getParentToDoInfo().parentId === parentId) {
                parentToDo.changeParentDescription(newDescription);
                return;
            }
        }
    }

    const changeParentDueDateInManagerArray = (parentId, newDueDate) => {
        // Refuse description change if the project does not exist in project manager
        if (!alreadyInManagerArray(parentId)) {
            console.log(`Invalid due date change - This is not an existing Parent To-Do!`);
            return;
        }

        for (let i = 0; i < parentManagerArray.length; i++) {
            const parentToDo = parentManagerArray[i];
            if (parentToDo.getParentToDoInfo().parentId === parentId) {
                parentToDo.changeParentDueDate(newDueDate);
                return;
            }
        }
    }

    const changeParentProjectNameInManagerArray = (parentId, newProjectName) => {
        // Refuse description change if the project does not exist in project manager
        if (!alreadyInManagerArray(parentId)) {
            console.log(`Invalid project name change - This is not an existing Parent To-Do!`);
            return;
        }

        for (let i = 0; i < parentManagerArray.length; i++) {
            const parentToDo = parentManagerArray[i];
            if (parentToDo.getParentToDoInfo().parentId === parentId) {
                parentToDo.changeParentProjectName(newProjectName);
                return;
            }
        }
    }

    const changeParentStatusInManagerArray = (parentId) => {
        // Refuse description change if the project does not exist in project manager
        if (!alreadyInManagerArray(parentId)) {
            console.log(`Invalid status change - This is not an existing Parent To-Do!`);
            return;
        }

        for (let i = 0; i < parentManagerArray.length; i++) {
            const parentToDo = parentManagerArray[i];
            if (parentToDo.getParentToDoInfo().parentId === parentId) {
                parentToDo.changeParentStatus();
                return;
            }
        }
    }

    const changeParentTitleInManagerArray = (parentId, newTitle) => {
        // Refuse description change if the project does not exist in project manager
        if (!alreadyInManagerArray(parentId)) {
            console.log(`Invalid title change - This is not an existing Parent To-Do!`);
            return;
        }

        for (let i = 0; i < parentManagerArray.length; i++) {
            const parentToDo = parentManagerArray[i];
            if (parentToDo.getParentToDoInfo().parentId === parentId) {
                parentToDo.changeParentTitle(newTitle);
                return;
            }
        }
    }

    const deleteParentToDoFromManagerArray = (parentId) => {
        // Refuse deletion if the project does not exist in the project manager
        if (!alreadyInManagerArray(parentId)) {
            console.log(`Invalid deletion - This is not an existing Parent To-Do!`);
            return;
        }

        for (let i = 0; i < parentManagerArray.length; i++) {
            const parentToDo = parentManagerArray[i];
            if (parentToDo.getParentToDoInfo().parentId === parentId) {
                parentToDo.deleteParentToDo();
                parentManagerArray.splice(i, 1);
                return;
            }
        }
    }

    const displayParentToDosInManagerArray = () => {
        console.table(parentManagerArray.map(parentToDo => parentToDo.getParentToDoInfo()));
    }

    return {
        addParentToDoToManagerArray, changeParentDescriptionInManagerArray,
        changeParentDueDateInManagerArray, changeParentProjectNameInManagerArray,
        changeParentStatusInManagerArray, changeParentTitleInManagerArray,
        deleteParentToDoFromManagerArray, displayParentToDosInManagerArray
    }
}

const parentToDoManager = createparentToDoManager();

export { parentToDoManager }