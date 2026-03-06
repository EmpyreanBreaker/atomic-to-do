// This function creates and manipulates atomic-to-do objects
// FIX THE ATOMIC ID AFTER TODO CREATION
const atomicToDo = () => {
    // Private fields
    let atomicId = ""; // Temporarily increments by itself for now
    let parentId = "";
    let description = "";
    let dueDate = "";
    let status = "";

    const createAtomicToDo = (testAtomicId, newParentId, newDescription, newDueDate, newStatus = "incomplete") => {
        atomicId = testAtomicId;
        parentId = newParentId;
        description = newDescription.trim();
        dueDate = newDueDate;
        status = newStatus;
    }

    const changeAtomicDescription = (newDescription) => {
        if (newDescription !== null || newDescription !== "") {
            description = newDescription;
        }
    }

    const changeAtomicDueDate = (newDueDate) => {
        if (newDueDate !== null || newDueDate !== "") {
            dueDate = newDueDate;
        }
    }

    const changeAtomicStatus = () => {
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
    return { createAtomicToDo, changeAtomicDescription, changeAtomicDueDate, changeAtomicStatus, deleteAtomicToDo, getAtomicToDoInfo }
}

// This function serves as a manager function that creates, fills, and manipulates an array of atomic-to-do objects
const createAtomicToDoManager = () => {
    // Private array to hold atomic-to-do objects
    const atomicManagerArray = [];

    // Testing
    let testAtomicId = 0;

    // Helper Function - Checks if the project already exists in the array
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
                atomicToDo.changeAtomicDescription(newDescription);
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
                atomicToDo.changeAtomicDueDate(newDueDate);
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
                atomicToDo.changeAtomicStatus();
                return;
            }
        }
    }

    const deleteAtomicToDoFromManagerArray = (atomicId) => {
        // Refuse deletion if the project does not exist in the project manager
        if (!alreadyInManagerArray(atomicId)) {
            console.log(`Invalid deletion - This is not an existing Atomic To-Do!`);
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