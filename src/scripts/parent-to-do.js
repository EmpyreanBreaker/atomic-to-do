// This function creates and manipulates Parent To-Do objects
const parentToDo = () => {
    // Private fields
    let parentToDoProjectId = "";
    let parentToDoId = "";
    let parentToDoTitle = "";
    let parentToDoDescription = "";
    let parentToDoStatus = "";
    let parentToDoDueDate = "";

    const createParentToDo = (newParentToDoProjectId, newParentToDoId, newParentToDoTitle, newParentToDoDescription, newParentToDoDueDate, newParentToDoStatus = "incomplete") => {
        parentToDoProjectId = newParentToDoProjectId;
        parentToDoId = newParentToDoId ?? crypto.randomUUID();
        parentToDoTitle = newParentToDoTitle;
        parentToDoDescription = newParentToDoDescription.trim();
        parentToDoDueDate = newParentToDoDueDate;
        parentToDoStatus = newParentToDoStatus;
    }

    const changeParentToDoDescription = (newParentToDoDescription) => {
        if (newParentToDoDescription !== null || newParentToDoDescription !== "") {
            parentToDoDescription = newParentToDoDescription;
        }
    }

    const changeParentToDoDueDate = (newParentToDoDueDate) => {
        if (newParentToDoDueDate !== null || newParentToDoDueDate !== "") {
            parentToDoDueDate = newParentToDoDueDate;
        }
    }

    const changeParentToDoId = (newParentToDoId) => {
        parentToDoId = newParentToDoId;
    }

    // SHOULD BE CHANGE PARENT PROJECT ID
    // const changeParentParentToDoCategory = (newParentToDoCategory) => {
    //     if (newParentToDoCategory !== null || newParentToDoCategory !== "") {
    //         parentToDoCategory = newParentToDoCategory;
    //     }
    // }

    const changeParentToDoStatus = () => {
        parentToDoStatus === "incomplete" ? parentToDoStatus = "completed" : parentToDoStatus = "incomplete";
    }

    const changeParentToDoTitle = (newParentToDoTitle) => {
        if (newParentToDoTitle !== null || newParentToDoTitle !== "") {
            parentToDoTitle = newParentToDoTitle;
        }
    }

    const deleteParentToDo = () => {
        parentToDoId = null;
        parentToDoTitle = null;
        parentToDoDescription = null;
        parentToDoDueDate = null;
        parentToDoStatus = null;
    }

    const getParentToDoInfo = () => {
        return { parentToDoProjectId, parentToDoId, parentToDoTitle, parentToDoDescription, parentToDoDueDate, parentToDoStatus }
    }

    return {
        createParentToDo, changeParentToDoDescription,
        changeParentToDoDueDate, changeParentToDoId,
        changeParentToDoStatus, changeParentToDoTitle,
        deleteParentToDo, getParentToDoInfo
    }
}

// This function serves as a manager function that creates, fills, and manipulates an array of parent-to-do objects
const createparentToDoManager = () => {
    // Private array to hold atomic-to-do objects
    const parentManagerArray = [];
    let parentManagerArraySnapshot = [];

    // Helper Function - Checks if the project already exists in the array
    const alreadyInManagerArray = (parentToDoId) => parentManagerArray.some(parentToDo => parentToDo.getParentToDoInfo().parentToDoId === parentToDoId);

    const addParentToDoToManagerArray = (newParentToDoProjectId, newParentToDoId, newParentToDoTitle, newParentToDoDescription, newParentToDoDueDate, newParentToDoStatus) => {
        if (alreadyInManagerArray(newParentToDoId)) {
            console.log(`Invalid Addition - ${newParentToDoId} already exists!`);
            return;
        }
        const newParentToDo = parentToDo();
        newParentToDo.createParentToDo(newParentToDoProjectId, newParentToDoId, newParentToDoTitle, newParentToDoDescription, newParentToDoDueDate, newParentToDoStatus);
        parentManagerArray.push(newParentToDo);
        createParentManagerArraySnapshot();
    }

    const clearParentToDoManagerArray = () => {
        parentManagerArray.length = 0;
    }

    const addParentFromLocalStorageToManagerArray = (newParentToDoProjectId, newParentToDoId, newParentToDoTitle, newParentToDoDescription, newParentToDoDueDate, newParentToDoStatus) => {
        if (alreadyInManagerArray(newParentToDoId)) {
            console.log(`Invalid Addition - ${newParentToDoId} already exists!`);
            return;
        }
        const newParentToDo = parentToDo();
        newParentToDo.createParentToDo(newParentToDoProjectId, newParentToDoId, newParentToDoTitle, newParentToDoDescription, newParentToDoDueDate, newParentToDoStatus);
        parentManagerArray.push(newParentToDo);
    }

    const changeParentToDoDescriptionInManagerArray = (parentToDoId, newParentToDoDescription) => {
        // Refuse parentToDoDescription change if the project does not exist in project manager
        if (!alreadyInManagerArray(parentToDoId)) {
            console.log(`Invalid parentToDoDescription change - This is not an existing Parent To-Do!`);
            return;
        }

        for (let i = 0; i < parentManagerArray.length; i++) {
            const parentToDo = parentManagerArray[i];
            if (parentToDo.getParentToDoInfo().parentToDoId === parentToDoId) {
                parentToDo.changeParentToDoDescription(newParentToDoDescription);
                createParentManagerArraySnapshot();
                return;
            }
        }
    }

    const changeParentToDoDueDateInManagerArray = (parentToDoId, newParentToDoDueDate) => {
        // Refuse parentToDoDescription change if the project does not exist in project manager
        if (!alreadyInManagerArray(parentToDoId)) {
            console.log(`Invalid due date change - This is not an existing Parent To-Do!`);
            return;
        }

        for (let i = 0; i < parentManagerArray.length; i++) {
            const parentToDo = parentManagerArray[i];
            if (parentToDo.getParentToDoInfo().parentToDoId === parentToDoId) {
                parentToDo.changeParentToDoDueDate(newParentToDoDueDate);
                createParentManagerArraySnapshot();
                return;
            }
        }
    }

    // I think the logic is to change the parent project id
    // Get the id of the parent via the UI
    // Get the category
    // Then make the change
    // const changeParentParentToDoCategoryInManagerArray = (parentToDoId, newParentToDoCategory) => {
    //     // Refuse parentToDoDescription change if the project does not exist in project manager
    //     if (!alreadyInManagerArray(parentToDoId)) {
    //         console.log(`Invalid project name change - This is not an existing Parent To-Do!`);
    //         return;
    //     }

    //     for (let i = 0; i < parentManagerArray.length; i++) {
    //         const parentToDo = parentManagerArray[i];
    //         if (parentToDo.getParentToDoInfo().parentToDoId === parentToDoId) {
    //             parentToDo.changeParentParentToDoCategory(newParentToDoCategory);
    //             return;
    //         }
    //     }
    // }

    const changeParentToDoStatusInManagerArray = (parentToDoId) => {
        // Refuse parentToDoDescription change if the project does not exist in project manager
        if (!alreadyInManagerArray(parentToDoId)) {
            console.log(`Invalid parentToDoStatus change - This is not an existing Parent To-Do!`);
            return;
        }

        for (let i = 0; i < parentManagerArray.length; i++) {
            const parentToDo = parentManagerArray[i];
            if (parentToDo.getParentToDoInfo().parentToDoId === parentToDoId) {
                parentToDo.changeParentToDoStatus();
                createParentManagerArraySnapshot();
                return;
            }
        }
    }

    const changeParentToDoTitleInManagerArray = (parentToDoId, newParentToDoTitle) => {
        // Refuse parentToDoDescription change if the project does not exist in project manager
        if (!alreadyInManagerArray(parentToDoId)) {
            console.log(`Invalid parentToDoTitle change - This is not an existing Parent To-Do!`);
            return;
        }

        for (let i = 0; i < parentManagerArray.length; i++) {
            const parentToDo = parentManagerArray[i];
            if (parentToDo.getParentToDoInfo().parentToDoId === parentToDoId) {
                parentToDo.changeParentToDoTitle(newParentToDoTitle);
                createParentManagerArraySnapshot();
                return;
            }
        }
    }

    const createParentManagerArraySnapshot = () => {
        parentManagerArraySnapshot.length = 0;
        parentManagerArraySnapshot = parentManagerArray.map(parentToDo => structuredClone(parentToDo.getParentToDoInfo()));
        localStorage.setItem("parentToDos", JSON.stringify(parentManagerArraySnapshot))
    }

    const deleteParentToDoFromManagerArray = (parentToDoId) => {
        // Refuse deletion if the project does not exist in the project manager
        if (!alreadyInManagerArray(parentToDoId)) {
            console.log(`Invalid deletion - This is not an existing Parent To-Do!`);
            return;
        }

        for (let i = 0; i < parentManagerArray.length; i++) {
            const parentToDo = parentManagerArray[i];
            if (parentToDo.getParentToDoInfo().parentToDoId === parentToDoId) {
                parentToDo.deleteParentToDo();
                parentManagerArray.splice(i, 1);
                createParentManagerArraySnapshot();
                return;
            }
        }
    }

    const displayParentToDosInManagerArray = () => {
        console.table(parentManagerArray.map(parentToDo => parentToDo.getParentToDoInfo()));
    }

    const displayParentToDosInManagerArraySnapshot = () => {
        createParentManagerArraySnapshot();
        console.table(parentManagerArraySnapshot);
    }

    return {
        addParentToDoToManagerArray, addParentFromLocalStorageToManagerArray,
        changeParentToDoDescriptionInManagerArray, clearParentToDoManagerArray,
        changeParentToDoDueDateInManagerArray,
        changeParentToDoStatusInManagerArray, changeParentToDoTitleInManagerArray,
        createParentManagerArraySnapshot, deleteParentToDoFromManagerArray, displayParentToDosInManagerArray, displayParentToDosInManagerArraySnapshot
    }
}

const parentToDoManager = createparentToDoManager();

export { parentToDoManager }