import { toDoRepository } from "../repository/to-do-repository";
import { atomicManager } from "../model/atomic-manager";

const createAtomicService = () => {
  const initializeAtomicAppData = () => {
    if (!toDoRepository.exists("atomics")) {
      console.log("Populating Default Atomic data Into Storage");
      const initialAtomicData = atomicManager.createSnapshot();
      toDoRepository.save("atomics", initialAtomicData);
    }
  };

  const loadAtomicAppData = () => {
    if (toDoRepository.exists("atomics")) {
      const retrievedAtomics = toDoRepository.load("atomics");
      atomicManager.reset();
      // Testing only: if storage exists but is empty, seed default parent data once.
      // After seeding, later reloads should hydrate from storage instead of creating again.
      if (retrievedAtomics.length === 0) {
        atomicServiceSeed();
      } else {
        retrievedAtomics.forEach((atomic) => {
          atomicManager.addHydratedAtomic(atomic);
        });
      }
    }
  };

  const createAtomic = (newParentId, newTask, newDueDate, newStatus) => {
    const created = atomicManager.addAtomic(newParentId, newTask, newDueDate, newStatus);
    if (created.success) {
      toDoRepository.save("atomics", atomicManager.createSnapshot());
      return { success: true, atomicData: created.atomicData };
    } else {
      console.log(`${created.reason}`);
      return { success: false, reason: created.reason };
    }
  };

  const changeAtomicDueDate = (id, newDueDate) => {
    const changed = atomicManager.changeAtomicDueDate(id, newDueDate);
    if (changed.success) {
      toDoRepository.save("atomics", atomicManager.createSnapshot());
      return { success: true, dueDate: changed.dueDate };
    } else {
      console.log(`${changed.reason}`);
      return { success: false, reason: changed.reason };
    }
  };

  const changeAtomicParentId = (id, newParentId) => {
    const changed = atomicManager.changeAtomicParentId(id, newParentId);
    if (changed.success) {
      toDoRepository.save("atomics", atomicManager.createSnapshot());
      return { success: true, parentId: changed.parentId };
    } else {
      console.log(`${changed.reason}`);
      return { success: false, reason: changed.reason };
    }
  };

  const changeAtomicStatus = (id) => {
    const changed = atomicManager.changeAtomicStatus(id);
    if (changed.success) {
      toDoRepository.save("atomics", atomicManager.createSnapshot());
      return { success: true, status: changed.status };
    } else {
      console.log(`${changed.reason}`);
      return { success: false, reason: changed.reason };
    }
  };

  const changeAtomicTask = (id, newTask) => {
    const changed = atomicManager.changeAtomicTask(id, newTask);
    if (changed.success) {
      toDoRepository.save("atomics", atomicManager.createSnapshot());
      return { success: true, title: changed.title };
    } else {
      console.log(`${changed.reason}`);
      return { success: false, reason: changed.reason };
    }
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

  const testAtomicDisplay = () => {
    console.table(atomicManager.createSnapshot());
  };

  return {
    changeAtomicDueDate,
    changeAtomicParentId,
    changeAtomicStatus,
    changeAtomicTask,
    createAtomic,
    initializeAtomicAppData,
    loadAtomicAppData,
    testAtomicDisplay,
  };
};

const atomicService = createAtomicService();
export { atomicService };
