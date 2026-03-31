// This function creates and manipulates atomic-to-do objects
// FIX THE ATOMIC ID AFTER TODO CREATION
const atomicToDo = () => {
  // Private fields
  let atomicToDoParentId = ""; // Temporarily increments by itself for now
  let atomicToDoId = "";
  let atomicToDoTask = "";
  let atomicToDoDueDate = "";
  let atomicToDoStatus = "";

  const createNewAtomicToDo = (
    newAtomicToDoParentId,
    newAtomicToDoTask,
    newAtomicToDoDueDate,
    newAtomicToDoStatus = "incomplete",
  ) => {
    atomicToDoParentId = newAtomicToDoParentId;
    atomicToDoId = crypto.randomUUID();
    atomicToDoTask = newAtomicToDoTask.trim();
    atomicToDoDueDate = newAtomicToDoDueDate;
    atomicToDoStatus = newAtomicToDoStatus;
  };

  const changeAtomicToDoId = (newAtomicToDoId) => {
    atomicToDoId = newAtomicToDoId;
  };

  const changeAtomicToDoTask = (newAtomicToDoTask) => {
    if (newAtomicToDoTask !== null || newAtomicToDoTask !== "") {
      atomicToDoTask = newAtomicToDoTask;
    }
  };

  const changeAtomicToDoDueDate = (newAtomicToDoDueDate) => {
    if (newAtomicToDoDueDate !== null || newAtomicToDoDueDate !== "") {
      atomicToDoDueDate = newAtomicToDoDueDate;
    }
  };

  const changeAtomicToDoStatus = () => {
    atomicToDoStatus === "incomplete"
      ? (atomicToDoStatus = "completed")
      : (atomicToDoStatus = "incomplete");
  };

  const deleteAtomicToDo = () => {
    atomicToDoId = null;
    atomicToDoTask = null;
    atomicToDoDueDate = null;
    atomicToDoStatus = null;
  };

  const getAtomicToDoInfo = () => {
    return {
      atomicToDoParentId,
      atomicToDoId,
      atomicToDoTask,
      atomicToDoDueDate,
      atomicToDoStatus,
    };
  };
  return {
    createNewAtomicToDo,
    changeAtomicToDoId,
    changeAtomicToDoTask,
    changeAtomicToDoDueDate,
    changeAtomicToDoStatus,
    deleteAtomicToDo,
    getAtomicToDoInfo,
  };
};

// This function serves as a manager function that creates, fills, and manipulates an array of atomic-to-do objects
const createNewAtomicToDoManager = () => {
  // Private array to hold atomic-to-do objects
  const atomicToDoManagerArray = [];
  let atomicToDoManagerArraySnapshot = [];

  // Helper Function - Checks if the atomic to-do is already exists in the array
  const alreadyInManagerArray = (atomicToDoId) =>
    atomicToDoManagerArray.some(
      (atomicToDo) =>
        atomicToDo.getAtomicToDoInfo().atomicToDoId === atomicToDoId,
    );

  // We don't need to be concerned about duplicates. People should be able to duplicate tasks
  // The id will change automatically and they can write the same task title and description as needed
  const addAtomicToDoToManagerArray = (
    newAtomicToDoParentId,
    newAtomicToDoTask,
    newAtomicToDoDueDate,
    newAtomicToDoStatus,
  ) => {
    const newAtomicToDo = atomicToDo();
    newAtomicToDo.createNewAtomicToDo(
      newAtomicToDoParentId,
      newAtomicToDoTask,
      newAtomicToDoDueDate,
      newAtomicToDoStatus,
    );
    atomicToDoManagerArray.push(newAtomicToDo);
    createAtomicToDoManagerArraySnapshot();
  };

  // We do need to be concerned about duplicates here
  // We don't want to copy the data already in storage into storage all over again
  // There is no need to create the snapshot since we are copying data from local storage
  const addAtomicToDoFromLocalStorageToManagerArray = (
    newAtomicToDoParentId,
    newAtomicToDoId,
    newAtomicToDoTask,
    newAtomicToDoDueDate,
    newAtomicToDoStatus,
  ) => {
    if (alreadyInManagerArray(newAtomicToDoId)) {
      console.log(`Invalid Addition - ${newAtomicToDoId} already exists!`);
      return;
    }
    const newAtomicToDo = atomicToDo();
    newAtomicToDo.createNewAtomicToDo(
      newAtomicToDoParentId,
      newAtomicToDoTask,
      newAtomicToDoDueDate,
      newAtomicToDoStatus,
    );
    newAtomicToDo.changeAtomicToDoId(newAtomicToDoId);
    atomicToDoManagerArray.push(newAtomicToDo);
  };

  const changeAtomicToDoTaskInManagerArray = (
    atomicToDoId,
    newAtomicToDoTask,
  ) => {
    // Refuse atomicToDoTask change if the project does not exist in project manager
    if (!alreadyInManagerArray(atomicToDoId)) {
      console.log(
        `Invalid Atomic To-Do task change - This is not an existing Atomic To-Do!`,
      );
      return;
    }

    for (let i = 0; i < atomicToDoManagerArray.length; i++) {
      const atomicToDo = atomicToDoManagerArray[i];
      if (atomicToDo.getAtomicToDoInfo().atomicToDoId === atomicToDoId) {
        atomicToDo.changeAtomicToDoTask(newAtomicToDoTask);
        createAtomicToDoManagerArraySnapshot();
        return;
      }
    }
  };

  const changeAtomicToDoDueDateInManagerArray = (
    atomicToDoId,
    newAtomicToDoDueDate,
  ) => {
    // Refuse atomicToDoTask change if the project does not exist in project manager
    if (!alreadyInManagerArray(atomicToDoId)) {
      console.log(
        `Invalid due date change - This is not an existing Atomic To-Do!`,
      );
      return;
    }

    for (let i = 0; i < atomicToDoManagerArray.length; i++) {
      const atomicToDo = atomicToDoManagerArray[i];
      if (atomicToDo.getAtomicToDoInfo().atomicToDoId === atomicToDoId) {
        atomicToDo.changeAtomicToDoDueDate(newAtomicToDoDueDate);
        createAtomicToDoManagerArraySnapshot();
        return;
      }
    }
  };

  const changeAtomicToDoStatusInManagerArray = (atomicToDoId) => {
    // Refuse atomicToDoTask change if the project does not exist in project manager
    if (!alreadyInManagerArray(atomicToDoId)) {
      console.log(
        `Invalid atomicToDoStatus change - This is not an existing Atomic To-Do!`,
      );
      return;
    }

    for (let i = 0; i < atomicToDoManagerArray.length; i++) {
      const atomicToDo = atomicToDoManagerArray[i];
      if (atomicToDo.getAtomicToDoInfo().atomicToDoId === atomicToDoId) {
        atomicToDo.changeAtomicToDoStatus();
        createAtomicToDoManagerArraySnapshot();
        return;
      }
    }
  };

  const clearAtomicToDoManagerArray = () => {
    atomicToDoManagerArray.length = 0;
  };

  const createAtomicToDoManagerArraySnapshot = () => {
    atomicToDoManagerArraySnapshot.length = 0;
    atomicToDoManagerArraySnapshot = atomicToDoManagerArray.map((atomicToDo) =>
      structuredClone(atomicToDo.getAtomicToDoInfo()),
    );
    localStorage.setItem(
      "atomicToDos",
      JSON.stringify(atomicToDoManagerArraySnapshot),
    );
  };

  const deleteAtomicToDoFromManagerArray = (atomicToDoId) => {
    // Refuse deletion if the project does not exist in the project manager
    if (!alreadyInManagerArray(atomicToDoId)) {
      console.log(`Invalid deletion - This is not an existing Atomic To-Do!`);
      return;
    }

    for (let i = 0; i < atomicToDoManagerArray.length; i++) {
      const atomicToDo = atomicToDoManagerArray[i];
      if (atomicToDo.getAtomicToDoInfo().atomicToDoId === atomicToDoId) {
        atomicToDo.deleteAtomicToDo();
        atomicToDoManagerArray.splice(i, 1);
        createAtomicToDoManagerArraySnapshot();
        return;
      }
    }
  };

  const displayAtomicToDosInManagerArray = () => {
    console.table(
      atomicToDoManagerArray.map((atomicToDo) =>
        atomicToDo.getAtomicToDoInfo(),
      ),
    );
  };

  const displayAtomicToDosInManagerArraySnapshot = () => {
    createAtomicToDoManagerArraySnapshot();
    console.table(atomicToDoManagerArraySnapshot);
  };

  return {
    addAtomicToDoToManagerArray,
    addAtomicToDoFromLocalStorageToManagerArray,
    changeAtomicToDoTaskInManagerArray,
    changeAtomicToDoDueDateInManagerArray,
    changeAtomicToDoStatusInManagerArray,
    clearAtomicToDoManagerArray,
    createAtomicToDoManagerArraySnapshot,
    deleteAtomicToDoFromManagerArray,
    displayAtomicToDosInManagerArray,
    displayAtomicToDosInManagerArraySnapshot,
  };
};

// Create one Atomic-To-Do manager for the entire app
// Any import of this will use the same instance instead of separate instances
const atomicToDoManager = createNewAtomicToDoManager();

// I think I store the atomic Manager in storage and retrieve from storage
// Then build like I did the displays
// If atomicManager isn't present then store, if it is then populate from storage
export { atomicToDoManager };
