import { toDoRepository } from "../repository/to-do-repository";
import { atomicManager } from "../model/atomic-manager";

const createAtomicService = () => {
  const createAtomic = (newParentId, newTask, newDueDate, newStatus) => {
    const createResult = atomicManager.addAtomic(newParentId, newTask, newDueDate, newStatus);

    if (!createResult.success) {
      return { success: false, reason: createResult.reason };
    }

    toDoRepository.save("atomics", createAtomicListSnapshot());
    return { success: true, atomicData: createResult.atomicData };
  };

  const changeAtomicDueDate = (id, newDueDate) => {
    const changeResult = atomicManager.changeAtomicDueDate(id, newDueDate);

    if (!changeResult.success) {
      return { success: false, reason: changeResult.reason };
    }

    toDoRepository.save("atomics", createAtomicListSnapshot());
    return { success: true, dueDate: changeResult.dueDate };
  };

  const changeAtomicParentId = (id, newParentId) => {
    const changeResult = atomicManager.changeAtomicParentId(id, newParentId);

    if (!changeResult.success) {
      return { success: false, reason: changeResult.reason };
    }

    toDoRepository.save("atomics", createAtomicListSnapshot());
    return { success: true, parentId: changeResult.parentId };
  };

  const changeAtomicStatus = (id) => {
    const changeResult = atomicManager.changeAtomicStatus(id);

    if (!changeResult.success) {
      return { success: false, reason: changeResult.reason };
    }

    toDoRepository.save("atomics", createAtomicListSnapshot());
    return { success: true, status: changeResult.status };
  };

  const changeAtomicTask = (id, newTask) => {
    const changeResult = atomicManager.changeAtomicTask(id, newTask);

    if (!changeResult.success) {
      return { success: false, reason: changeResult.reason };
    }

    toDoRepository.save("atomics", createAtomicListSnapshot());
    return { success: true, task: changeResult.task };
  };

  const createAtomicListSnapshot = () => {
    return atomicManager.createSnapshot();
  };

  const initializeAtomicAppData = () => {
    if (toDoRepository.exists("atomics")) {
      return { success: true, initialized: false };
    }

    console.log("Populating Default Atomic data Into Storage");
    const initialAtomicData = createAtomicListSnapshot();
    toDoRepository.save("atomics", initialAtomicData);

    return {
      success: true,
      initialized: true,
      count: initialAtomicData.length,
    };
  };

  const loadAtomicAppData = () => {
    if (!toDoRepository.exists("atomics")) {
      return { success: true, loaded: false, seeded: false, count: 0, failed: 0 };
    }

    const retrievedAtomics = toDoRepository.load("atomics");
    const hydrationFailureList = [];
    let failed = 0;
    const seeded = false;

    atomicManager.reset();

    retrievedAtomics.forEach((atomic) => {
      const hydrationResult = atomicManager.addHydratedAtomic(atomic);

      if (!hydrationResult.success) {
        failed += 1;
        hydrationFailureList.push(hydrationResult.reason);
      }
    });

    return {
      success: true,
      loaded: true,
      seeded,
      count: retrievedAtomics.length,
      failed,
      hydrationFailureList,
    };
  };

  const removeAtomic = (id) => {
    const removalResult = atomicManager.removeAtomic(id);

    if (!removalResult.success) {
      return { success: false, reason: removalResult.reason };
    }

    toDoRepository.save("atomics", createAtomicListSnapshot());

    return {
      success: true,
      removedAtomicId: removalResult.removedAtomicId,
    };
  };

  const removeAtomicsOfParent = (parentId) => {
    const removalResult = atomicManager.removeAtomicsOfParent(parentId);

    if (!removalResult.success) {
      return { success: false, reason: removalResult.reason };
    }

    toDoRepository.save("atomics", createAtomicListSnapshot());

    return { success: true, removed: removalResult.removed };
  };

  return {
    changeAtomicDueDate,
    changeAtomicParentId,
    changeAtomicStatus,
    changeAtomicTask,
    createAtomic,
    createAtomicListSnapshot,
    initializeAtomicAppData,
    loadAtomicAppData,
    removeAtomic,
    removeAtomicsOfParent,
  };
};

const atomicService = createAtomicService();
export { atomicService };
