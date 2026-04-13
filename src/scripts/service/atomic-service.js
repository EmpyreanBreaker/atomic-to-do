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
    let seeded = false;

    atomicManager.reset();

    // Testing only: if storage exists but is empty, seed default atomic data once.
    // After seeding, later reloads should hydrate from storage instead of creating again.
    if (retrievedAtomics.length === 0) {
      atomicServiceSeed();
      seeded = true;

      return {
        success: true,
        loaded: true,
        seeded,
        count: 0,
        failed: 0,
        hydrationFailureList,
      };
    }

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

  const atomicServiceSeed = () => {
    // Clean kitchen
    createAtomic("bf3b0047-8586-47ed-9f6d-41ea935e733a", "Wipe counters", "2026-04-06", "incomplete");

    createAtomic("bf3b0047-8586-47ed-9f6d-41ea935e733a", "Take out trash", "2026-04-06", "incomplete");

    // Laundry
    createAtomic("aa645296-2bcf-4d99-87a2-7d85292058c2", "Wash clothes", "2026-04-07", "incomplete");

    createAtomic("aa645296-2bcf-4d99-87a2-7d85292058c2", "Fold clothes", "2026-04-07", "incomplete");

    // Update resume
    createAtomic(
      "fd666ee3-5057-42d3-acb4-bf9d93709743",
      "Rewrite experience section",
      "2026-04-10",
      "incomplete",
    );

    createAtomic(
      "fd666ee3-5057-42d3-acb4-bf9d93709743",
      "Add recent project work",
      "2026-04-10",
      "incomplete",
    );

    // Study Maximo workflows
    createAtomic("f2b3df87-d7f1-4fb2-8269-c00a733c2a78", "Review launch points", "2026-04-12", "incomplete");

    createAtomic(
      "f2b3df87-d7f1-4fb2-8269-c00a733c2a78",
      "Review actions and conditions",
      "2026-04-12",
      "incomplete",
    );

    // Plan date night
    createAtomic("9589594a-4d25-4bf9-a9f5-5b0658ca47f7", "Choose restaurant", "2026-04-08", "incomplete");

    createAtomic("9589594a-4d25-4bf9-a9f5-5b0658ca47f7", "Confirm time", "2026-04-08", "incomplete");

    // Call family
    createAtomic("a8f3eac8-2b3c-4ab1-a7c7-c971c43909c8", "Call parents", "2026-04-05", "complete");

    createAtomic(
      "a8f3eac8-2b3c-4ab1-a7c7-c971c43909c8",
      "Reply to family messages",
      "2026-04-05",
      "complete",
    );

    // Read SQL notes
    createAtomic(
      "3be53a7a-60d3-4129-8c90-bbc3f5ae39f0",
      "Review EXISTS examples",
      "2026-04-09",
      "incomplete",
    );

    createAtomic("3be53a7a-60d3-4129-8c90-bbc3f5ae39f0", "Practice join queries", "2026-04-09", "incomplete");

    // Practice JavaScript closures
    createAtomic(
      "cbb55524-e5c8-498d-b51f-59799209e194",
      "Write one closure exercise",
      "2026-04-11",
      "incomplete",
    );

    createAtomic(
      "cbb55524-e5c8-498d-b51f-59799209e194",
      "Write one factory function exercise",
      "2026-04-11",
      "incomplete",
    );
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
