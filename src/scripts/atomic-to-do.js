// This function creates and manipulates atomic-to-do objects
const atomicToDo = () => {
    // Private fields
    let atomicId = ""; // Temporarily increments by itself for now
    let parentId = "";
    let description = "";
    let status = "";
    let dueDate = "";

    const createAtomicToDo = (testAtomicId, newParentId, newDescription, newDueDate, newStatus = "incomplete") => {
        atomicId = testAtomicId;
        parentId = newParentId;
        description = newDescription.trim();
        dueDate = newDueDate;
        status = newStatus;
    }

    const changeDescription = (newDescription) => {
        if (newDescription !== null || newDescription !== "") {
            description = newDescription;
        }
    }

    const changeDueDate = (newDueDate) => {
        if (newDueDate !== null || newDueDate !== "") {
            dueDate = newDueDate;
        }
    }

    const changeStatus = () => {
        status === "incomplete" ? status = "completed" : status = "incomplete";
    }

    const deleteAtomicToDo = () => {
        atomicId = null;
        parentId = null;
        description = null;
        dueDate = null;
        status = null;
    }

    const getAtomicToDoInfo = () => {
        return { atomicId, parentId, description, dueDate, status }
    }
    return { createAtomicToDo, changeDescription, changeDueDate, changeStatus, deleteAtomicToDo, getAtomicToDoInfo }
}

// This function serves as a manager function that creates, fills, and manipulates an array of atomic-to-do objects
const createAtomicToDoManager = () => {
    // Private array to hold atomic-to-do objects
    const atomicManagerArray = [];

    // Testing
    let testAtomicId = 0;

    // Helper Function - Checks if the project already exists
    const alreadyInManagerArray = (atomicId) => atomicManagerArray.some(atomicToDo => atomicToDo.getAtomicToDoInfo().atomicId === atomicId);

    const addAtomicToDoToManagerArray = (newParentId, newDescription, newDueDate, newStatus) => {
        const newAtomicToDo = atomicToDo();
        newAtomicToDo.createAtomicToDo(testAtomicId, newParentId, newDescription, newDueDate, newStatus);
        testAtomicId++;
        atomicManagerArray.push(newAtomicToDo);
    }

    const changeAtomicDescriptionInManagerArray = (atomicId, newDescription) => {
        // Refuse description change if the project does not exist in project manager
        if (!alreadyInManagerArray(atomicId)) {
            console.log(`Invalid description change - This is not an existing Atomic To-Do!`);
            return;
        }

        for (let i = 0; i < atomicManagerArray.length; i++) {
            const atomicToDo = atomicManagerArray[i];
            if (atomicToDo.getAtomicToDoInfo().atomicId === atomicId) {
                atomicToDo.changeDescription(newDescription);
                return;
            }
        }
    }

    const changeAtomicDueDateInManagerArray = (atomicId, newDueDate) => {
        // Refuse description change if the project does not exist in project manager
        if (!alreadyInManagerArray(atomicId)) {
            console.log(`Invalid due date change - This is not an existing Atomic To-Do!`);
            return;
        }

        for (let i = 0; i < atomicManagerArray.length; i++) {
            const atomicToDo = atomicManagerArray[i];
            if (atomicToDo.getAtomicToDoInfo().atomicId === atomicId) {
                atomicToDo.changeDueDate(newDueDate);
                return;
            }
        }
    }

    const changeAtomicStatusInManagerArray = (atomicId) => {
        // Refuse description change if the project does not exist in project manager
        if (!alreadyInManagerArray(atomicId)) {
            console.log(`Invalid status change - This is not an existing Atomic To-Do!`);
            return;
        }

        for (let i = 0; i < atomicManagerArray.length; i++) {
            const atomicToDo = atomicManagerArray[i];
            if (atomicToDo.getAtomicToDoInfo().atomicId === atomicId) {
                atomicToDo.changeStatus();
                return;
            }
        }
    }

    const deleteAtomicToDoFromManagerArray = (atomicId) => {
        // Refuse deletion if the project does not exist in the project manager
        if (!alreadyInManagerArray(atomicId)) {
            console.log(`Invalid Deletion - This is not an existing Atomic To-Do!`);
            return;
        }

        for (let i = 0; i < atomicManagerArray.length; i++) {
            const atomicToDo = atomicManagerArray[i];
            if (atomicToDo.getAtomicToDoInfo().atomicId === atomicId) {
                atomicToDo.deleteAtomicToDo();
                atomicManagerArray.splice(i, 1);
                return;
            }
        }
    }

    const displayAtomicToDosInManagerArray = () => {
        console.table(atomicManagerArray.map(atomicToDo => atomicToDo.getAtomicToDoInfo()));
    }

    return {
        addAtomicToDoToManagerArray, changeAtomicDescriptionInManagerArray,
        changeAtomicDueDateInManagerArray, changeAtomicStatusInManagerArray,
        deleteAtomicToDoFromManagerArray, displayAtomicToDosInManagerArray
    }
}

// Create one Atomic-To-Do manager for the entire app
// Any import of this will use the same instance instead of separate instances
const atomicToDoManager = createAtomicToDoManager();

export { atomicToDoManager };