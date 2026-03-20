// This function creates and manipulates Parent To-Do objects
const parentToDo = () => {
    // Private fields
    let testParentId = "";
    let parentId = "";
    let parentCategory = "";
    let parentTitle = "";
    let parentDescription = "";
    let parentStatus = "";
    let parentDueDate = "";

    const createParentToDo = (newTestParentId, newParentCategory, newParentTitle, newParentDescription, newParentDueDate, newParentStatus = "incomplete") => {
        testParentId = newTestParentId;
        parentId = crypto.randomUUID();
        parentCategory = newParentCategory;
        parentTitle = newParentTitle;
        parentDescription = newParentDescription.trim();
        parentDueDate = newParentDueDate;
        parentStatus = newParentStatus;
    }

    const changeParentParentDescription = (newParentDescription) => {
        if (newParentDescription !== null || newParentDescription !== "") {
            parentDescription = newParentDescription;
        }
    }

    const changeParentParentDueDate = (newParentDueDate) => {
        if (newParentDueDate !== null || newParentDueDate !== "") {
            parentDueDate = newParentDueDate;
        }
    }

    const changeParentParentCategory = (newParentCategory) => {
        if (newParentCategory !== null || newParentCategory !== "") {
            parentCategory = newParentCategory;
        }
    }

    const changeParentParentStatus = () => {
        parentStatus === "incomplete" ? parentStatus = "completed" : parentStatus = "incomplete";
    }

    const changeParentParentTitle = (newParentTitle) => {
        if (newParentTitle !== null || newParentTitle !== "") {
            parentTitle = newParentTitle;
        }
    }

    const deleteParentToDo = () => {
        parentId = null;
        parentCategory = null;
        parentTitle = null;
        parentDescription = null;
        parentDueDate = null;
        parentStatus = null;
    }

    const getParentToDoInfo = () => {
        return { testParentId, parentId, parentCategory, parentTitle, parentDescription, parentDueDate, parentStatus }
    }

    return {
        createParentToDo, changeParentParentDescription,
        changeParentParentDueDate, changeParentParentCategory,
        changeParentParentStatus, changeParentParentTitle,
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

    const addParentToDoToManagerArray = (newParentCategory, newParentTitle, newParentDescription, newParentDueDate, newParentStatus) => {
        const newParentToDo = parentToDo();
        newParentToDo.createParentToDo(testParentId, newParentCategory, newParentTitle, newParentDescription, newParentDueDate, newParentStatus);
        testParentId++;
        parentManagerArray.push(newParentToDo);
    }

    const changeParentParentDescriptionInManagerArray = (parentId, newParentDescription) => {
        // Refuse parentDescription change if the project does not exist in project manager
        if (!alreadyInManagerArray(parentId)) {
            console.log(`Invalid parentDescription change - This is not an existing Parent To-Do!`);
            return;
        }

        for (let i = 0; i < parentManagerArray.length; i++) {
            const parentToDo = parentManagerArray[i];
            if (parentToDo.getParentToDoInfo().parentId === parentId) {
                parentToDo.changeParentParentDescription(newParentDescription);
                return;
            }
        }
    }

    const changeParentParentDueDateInManagerArray = (parentId, newParentDueDate) => {
        // Refuse parentDescription change if the project does not exist in project manager
        if (!alreadyInManagerArray(parentId)) {
            console.log(`Invalid due date change - This is not an existing Parent To-Do!`);
            return;
        }

        for (let i = 0; i < parentManagerArray.length; i++) {
            const parentToDo = parentManagerArray[i];
            if (parentToDo.getParentToDoInfo().parentId === parentId) {
                parentToDo.changeParentParentDueDate(newParentDueDate);
                return;
            }
        }
    }

    const changeParentParentCategoryInManagerArray = (parentId, newParentCategory) => {
        // Refuse parentDescription change if the project does not exist in project manager
        if (!alreadyInManagerArray(parentId)) {
            console.log(`Invalid project name change - This is not an existing Parent To-Do!`);
            return;
        }

        for (let i = 0; i < parentManagerArray.length; i++) {
            const parentToDo = parentManagerArray[i];
            if (parentToDo.getParentToDoInfo().parentId === parentId) {
                parentToDo.changeParentParentCategory(newParentCategory);
                return;
            }
        }
    }

    const changeParentParentStatusInManagerArray = (parentId) => {
        // Refuse parentDescription change if the project does not exist in project manager
        if (!alreadyInManagerArray(parentId)) {
            console.log(`Invalid parentStatus change - This is not an existing Parent To-Do!`);
            return;
        }

        for (let i = 0; i < parentManagerArray.length; i++) {
            const parentToDo = parentManagerArray[i];
            if (parentToDo.getParentToDoInfo().parentId === parentId) {
                parentToDo.changeParentParentStatus();
                return;
            }
        }
    }

    const changeParentParentTitleInManagerArray = (parentId, newParentTitle) => {
        // Refuse parentDescription change if the project does not exist in project manager
        if (!alreadyInManagerArray(parentId)) {
            console.log(`Invalid parentTitle change - This is not an existing Parent To-Do!`);
            return;
        }

        for (let i = 0; i < parentManagerArray.length; i++) {
            const parentToDo = parentManagerArray[i];
            if (parentToDo.getParentToDoInfo().parentId === parentId) {
                parentToDo.changeParentParentTitle(newParentTitle);
                return;
            }
        }
    }

    const createParentManagerArrayDeepCopy = () => {
        return parentManagerArray.map(parentToDo => structuredClone(parentToDo.getParentToDoInfo()));
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
        addParentToDoToManagerArray, changeParentParentDescriptionInManagerArray,
        changeParentParentDueDateInManagerArray, changeParentParentCategoryInManagerArray,
        changeParentParentStatusInManagerArray, changeParentParentTitleInManagerArray,
        createParentManagerArrayDeepCopy, deleteParentToDoFromManagerArray, displayParentToDosInManagerArray
    }
}

const parentToDoManager = createparentToDoManager();

export { parentToDoManager }