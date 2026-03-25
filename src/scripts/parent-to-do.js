// This function creates and manipulates Parent To-Do objects
const parentToDo = () => {
    // Private fields
    let parentToDoProjectId = "";
    let parentToDoId = "";
    let parentToDoTitle = "";
    let parentToDoDescription = "";
    let parentToDoStatus = "";
    let parentToDoDueDate = "";

    const createNewParentToDo = (newParentToDoProjectId, newParentToDoTitle, newParentToDoDescription, newParentToDoDueDate, newParentToDoStatus = "incomplete") => {
        parentToDoProjectId = newParentToDoProjectId;
        parentToDoId = crypto.randomUUID();
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
        createNewParentToDo,
        changeParentToDoDescription,
        changeParentToDoDueDate, changeParentToDoId,
        changeParentToDoStatus, changeParentToDoTitle,
        deleteParentToDo, getParentToDoInfo
    }
}

// This function serves as a manager function that creates, fills, and manipulates an array of parent-to-do objects
const createparentToDoManager = () => {
    // Private array to hold atomic-to-do objects
    const parentToDoManagerArray = [];
    let parentToDoManagerArraySnapshot = [];

    // Helper Function - Checks if the project already exists in the array
    const alreadyInManagerArray = (parentToDoId) => parentToDoManagerArray.some(parentToDo => parentToDo.getParentToDoInfo().parentToDoId === parentToDoId);

    // We don't need to be concerned about duplicates. People should be able to duplicate tasks
    // The id will change automatically and they can write the same task title and description as needed
    const addParentToDoToManagerArray = (newParentToDoProjectId, newParentToDoTitle, newParentToDoDescription, newParentToDoDueDate, newParentToDoStatus) => {
        const newParentToDo = parentToDo();
        newParentToDo.createNewParentToDo(newParentToDoProjectId, newParentToDoTitle, newParentToDoDescription, newParentToDoDueDate, newParentToDoStatus);
        parentToDoManagerArray.push(newParentToDo);
        createParentToDoManagerArraySnapshot();
    }

    // We do need to be concerned about duplicates here
    // We don't want to copy the data already in storage into storage all over again
    // There is no need to create a snapshot since we are copying data from local storage
    const addParentToDoFromLocalStorageToManagerArray = (newParentToDoProjectId, newParentToDoId, newParentToDoTitle, newParentToDoDescription, newParentToDoDueDate, newParentToDoStatus) => {
        if (alreadyInManagerArray(newParentToDoId)) {
            console.log(`Invalid Addition - ${newParentToDoId} already exists!`);
            return;
        }
        const newParentToDo = parentToDo();
        newParentToDo.createNewParentToDo(newParentToDoProjectId, newParentToDoTitle, newParentToDoDescription, newParentToDoDueDate, newParentToDoStatus);
        newParentToDo.changeParentToDoId(newParentToDoId);
        parentToDoManagerArray.push(newParentToDo);
    }

    const changeParentToDoDescriptionInManagerArray = (parentToDoId, newParentToDoDescription) => {
        // Refuse parentToDoDescription change if the project does not exist in project manager
        if (!alreadyInManagerArray(parentToDoId)) {
            console.log(`Invalid parentToDoDescription change - This is not an existing Parent To-Do!`);
            return;
        }

        for (let i = 0; i < parentToDoManagerArray.length; i++) {
            const parentToDo = parentToDoManagerArray[i];
            if (parentToDo.getParentToDoInfo().parentToDoId === parentToDoId) {
                parentToDo.changeParentToDoDescription(newParentToDoDescription);
                createParentToDoManagerArraySnapshot();
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

        for (let i = 0; i < parentToDoManagerArray.length; i++) {
            const parentToDo = parentToDoManagerArray[i];
            if (parentToDo.getParentToDoInfo().parentToDoId === parentToDoId) {
                parentToDo.changeParentToDoDueDate(newParentToDoDueDate);
                createParentToDoManagerArraySnapshot();
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

    //     for (let i = 0; i < parentToDoManagerArray.length; i++) {
    //         const parentToDo = parentToDoManagerArray[i];
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

        for (let i = 0; i < parentToDoManagerArray.length; i++) {
            const parentToDo = parentToDoManagerArray[i];
            if (parentToDo.getParentToDoInfo().parentToDoId === parentToDoId) {
                parentToDo.changeParentToDoStatus();
                createParentToDoManagerArraySnapshot();
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

        for (let i = 0; i < parentToDoManagerArray.length; i++) {
            const parentToDo = parentToDoManagerArray[i];
            if (parentToDo.getParentToDoInfo().parentToDoId === parentToDoId) {
                parentToDo.changeParentToDoTitle(newParentToDoTitle);
                createParentToDoManagerArraySnapshot();
                return;
            }
        }
    }

    const clearParentToDoManagerArray = () => {
        parentToDoManagerArray.length = 0;
    }
    
    const createParentToDoManagerArraySnapshot = () => {
        parentToDoManagerArraySnapshot.length = 0;
        parentToDoManagerArraySnapshot = parentToDoManagerArray.map(parentToDo => structuredClone(parentToDo.getParentToDoInfo()));
        localStorage.setItem("parentToDos", JSON.stringify(parentToDoManagerArraySnapshot))
    }

    const deleteParentToDoFromManagerArray = (parentToDoId) => {
        // Refuse deletion if the project does not exist in the project manager
        if (!alreadyInManagerArray(parentToDoId)) {
            console.log(`Invalid deletion - This is not an existing Parent To-Do!`);
            return;
        }

        for (let i = 0; i < parentToDoManagerArray.length; i++) {
            const parentToDo = parentToDoManagerArray[i];
            if (parentToDo.getParentToDoInfo().parentToDoId === parentToDoId) {
                parentToDo.deleteParentToDo();
                parentToDoManagerArray.splice(i, 1);
                createParentToDoManagerArraySnapshot();
                return;
            }
        }
    }

    const displayParentToDosInManagerArray = () => {
        console.table(parentToDoManagerArray.map(parentToDo => parentToDo.getParentToDoInfo()));
    }

    const displayParentToDosInManagerArraySnapshot = () => {
        createParentToDoManagerArraySnapshot();
        console.table(parentToDoManagerArraySnapshot);
    }

    return {
        addParentToDoToManagerArray, addParentToDoFromLocalStorageToManagerArray,
        changeParentToDoDescriptionInManagerArray, clearParentToDoManagerArray,
        changeParentToDoDueDateInManagerArray,
        changeParentToDoStatusInManagerArray, changeParentToDoTitleInManagerArray,
        createParentToDoManagerArraySnapshot, deleteParentToDoFromManagerArray, displayParentToDosInManagerArray, displayParentToDosInManagerArraySnapshot
    }
}

const parentToDoManager = createparentToDoManager();

export { parentToDoManager }