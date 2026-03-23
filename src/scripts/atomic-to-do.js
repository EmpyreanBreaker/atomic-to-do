// This function creates and manipulates atomic-to-do objects
// FIX THE ATOMIC ID AFTER TODO CREATION
const atomicToDo = () => {
    // Private fields
    let atomicParentId = ""; // Temporarily increments by itself for now
    let atomicId = "";
    let atomicParentCategory = "";
    let atomicTask = "";
    let atomicDueDate = "";
    let atomicStatus = "";

    const createAtomicToDo = (newAtomicParentId, newAtomicParentCategory, newAtomicTask, newAtomicDueDate, newAtomicStatus = "incomplete") => {
        atomicParentId = Number(newAtomicParentId);
        atomicId = crypto.randomUUID();
        atomicParentCategory = newAtomicParentCategory;
        atomicTask = newAtomicTask.trim();
        atomicDueDate = newAtomicDueDate;
        atomicStatus = newAtomicStatus;
    }

    const changeAtomicAtomicTask = (newAtomicTask) => {
        if (newAtomicTask !== null || newAtomicTask !== "") {
            atomicTask = newAtomicTask;
        }
    }

    const changeAtomicAtomicDueDate = (newAtomicDueDate) => {
        if (newAtomicDueDate !== null || newAtomicDueDate !== "") {
            atomicDueDate = newAtomicDueDate;
        }
    }

    const changeAtomicAtomicStatus = () => {
        atomicStatus === "incomplete" ? atomicStatus = "completed" : atomicStatus = "incomplete";
    }

    const deleteAtomicToDo = () => {
        atomicId = null;
        atomicParentCategory = null;
        atomicTask = null;
        atomicDueDate = null;
        atomicStatus = null;
    }

    const getAtomicToDoInfo = () => {
        return { atomicParentId, atomicId, atomicParentCategory, atomicTask, atomicDueDate, atomicStatus }
    }
    return { createAtomicToDo, changeAtomicAtomicTask, changeAtomicAtomicDueDate, changeAtomicAtomicStatus, deleteAtomicToDo, getAtomicToDoInfo }
}

// This function serves as a manager function that creates, fills, and manipulates an array of atomic-to-do objects
const createAtomicToDoManager = () => {
    // Private array to hold atomic-to-do objects
    const atomicManagerArray = [];

    // Helper Function - Checks if the atomic to-do is already exists in the array
    const alreadyInManagerArray = (atomicId) => atomicManagerArray.some(atomicToDo => atomicToDo.getAtomicToDoInfo().atomicId === atomicId);

    const addAtomicToDoToManagerArray = (newAtomicParentId, newAtomicParentCategory, newAtomicTask, newAtomicDueDate, newAtomicStatus) => {
        const newAtomicToDo = atomicToDo();
        newAtomicToDo.createAtomicToDo(newAtomicParentId, newAtomicParentCategory, newAtomicTask, newAtomicDueDate, newAtomicStatus);
        atomicManagerArray.push(newAtomicToDo);
    }

    const changeAtomicAtomicTaskInManagerArray = (atomicId, newAtomicTask) => {
        // Refuse atomicTask change if the project does not exist in project manager
        if (!alreadyInManagerArray(atomicId)) {
            console.log(`Invalid Atomic To-Do task change - This is not an existing Atomic To-Do!`);
            return;
        }

        for (let i = 0; i < atomicManagerArray.length; i++) {
            const atomicToDo = atomicManagerArray[i];
            if (atomicToDo.getAtomicToDoInfo().atomicId === atomicId) {
                atomicToDo.changeAtomicAtomicTask(newAtomicTask);
                return;
            }
        }
    }

    const changeAtomicAtomicDueDateInManagerArray = (atomicId, newAtomicDueDate) => {
        // Refuse atomicTask change if the project does not exist in project manager
        if (!alreadyInManagerArray(atomicId)) {
            console.log(`Invalid due date change - This is not an existing Atomic To-Do!`);
            return;
        }

        for (let i = 0; i < atomicManagerArray.length; i++) {
            const atomicToDo = atomicManagerArray[i];
            if (atomicToDo.getAtomicToDoInfo().atomicId === atomicId) {
                atomicToDo.changeAtomicAtomicDueDate(newAtomicDueDate);
                return;
            }
        }
    }

    const changeAtomicAtomicStatusInManagerArray = (atomicId) => {
        // Refuse atomicTask change if the project does not exist in project manager
        if (!alreadyInManagerArray(atomicId)) {
            console.log(`Invalid atomicStatus change - This is not an existing Atomic To-Do!`);
            return;
        }

        for (let i = 0; i < atomicManagerArray.length; i++) {
            const atomicToDo = atomicManagerArray[i];
            if (atomicToDo.getAtomicToDoInfo().atomicId === atomicId) {
                atomicToDo.changeAtomicAtomicStatus();
                return;
            }
        }
    }

    const createAtomicManagerArrayDeepCopy = () => {
        return atomicManagerArray.map(atomicToDo => structuredClone(atomicToDo.getAtomicToDoInfo()));
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
        addAtomicToDoToManagerArray, changeAtomicAtomicTaskInManagerArray,
        changeAtomicAtomicDueDateInManagerArray, changeAtomicAtomicStatusInManagerArray,
        createAtomicManagerArrayDeepCopy, deleteAtomicToDoFromManagerArray, displayAtomicToDosInManagerArray
    }
}

// Create one Atomic-To-Do manager for the entire app
// Any import of this will use the same instance instead of separate instances
const atomicToDoManager = createAtomicToDoManager();

// I think I store the atomic Manager in storage and retrieve from storage
// Then build like I did the displays
// If atomicManager isn't present then store, if it is then populate from storage
export { atomicToDoManager };