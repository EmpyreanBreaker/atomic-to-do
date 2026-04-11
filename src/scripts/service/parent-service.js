import { toDoRepository } from "../repository/to-do-repository";
import { parentManager } from "../model/parent-manager";

const createParentService = () => {
  const changeParentDescription = (id, newDescription) => {
    const changeResult = parentManager.changeParentDescription(id, newDescription);

    if (!changeResult.success) {
      return { success: false, reason: changeResult.reason };
    }

    toDoRepository.save("parents", createParentListSnapshot());
    return { success: true, description: changeResult.description };
  };

  const changeParentDueDate = (id, newDueDate) => {
    const changeResult = parentManager.changeParentDueDate(id, newDueDate);

    if (!changeResult.success) {
      return { success: false, reason: changeResult.reason };
    }

    toDoRepository.save("parents", createParentListSnapshot());
    return { success: true, dueDate: changeResult.dueDate };
  };

  const changeParentProjectId = (id, newProjectId) => {
    const changeResult = parentManager.changeParentProjectId(id, newProjectId);

    if (!changeResult.success) {
      return { success: false, reason: changeResult.reason };
    }

    toDoRepository.save("parents", createParentListSnapshot());
    return { success: true, projectId: changeResult.projectId };
  };

  const changeParentStatus = (id) => {
    const changeResult = parentManager.changeParentStatus(id);

    if (!changeResult.success) {
      return { success: false, reason: changeResult.reason };
    }

    toDoRepository.save("parents", createParentListSnapshot());
    return { success: true, status: changeResult.status };
  };

  const changeParentTitle = (id, newTitle) => {
    const changeResult = parentManager.changeParentTitle(id, newTitle);

    if (!changeResult.success) {
      return { success: false, reason: changeResult.reason };
    }

    toDoRepository.save("parents", createParentListSnapshot());
    return { success: true, title: changeResult.title };
  };

  const createParent = (newProjectId, newTitle, newDescription, newDueDate, newStatus) => {
    const createResult = parentManager.addParent(
      newProjectId,
      newTitle,
      newDescription,
      newDueDate,
      newStatus,
    );

    if (!createResult.success) {
      return { success: false, reason: createResult.reason };
    }

    toDoRepository.save("parents", createParentListSnapshot());
    return { success: true, parentData: createResult.parentData };
  };

  const createParentListSnapshot = () => {
    return parentManager.createSnapshot();
  };

  const getParent = (id) => {
    const retrievalResult = parentManager.getParent(id);

    if (!retrievalResult.success) {
      return { success: false, reason: retrievalResult.reason };
    }

    return { success: true, parentData: retrievalResult.parentData };
  };

  const getParentIdsByProjectId = (projectId) => {
    const retrievalResult = parentManager.getParentIdsByProjectId(projectId);

    if (!retrievalResult.success) {
      return { success: false, reason: retrievalResult.reason };
    }

    return { success: true, targetParentIdsList: retrievalResult.targetParentIdsList };
  };

  const initializeParentAppData = () => {
    if (toDoRepository.exists("parents")) {
      return { success: true, initialized: false };
    }

    const initialParentData = createParentListSnapshot();
    toDoRepository.save("parents", initialParentData);

    return {
      success: true,
      initialized: true,
      count: initialParentData.length,
    };
  };

  const loadParentAppData = () => {
    if (!toDoRepository.exists("parents")) {
      return { success: true, loaded: false, seeded: false, count: 0, failed: 0 };
    }

    const retrievedParents = toDoRepository.load("parents");
    const hydrationFailureList = [];
    let failed = 0;
    let seeded = false;

    parentManager.reset();

    if (retrievedParents.length === 0) {
      parentServiceSeed();
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

    retrievedParents.forEach((parent) => {
      const hydrationResult = parentManager.addHydratedParent(parent);

      if (!hydrationResult.success) {
        failed += 1;
        hydrationFailureList.push(hydrationResult.reason);
      }
    });

    return {
      success: true,
      loaded: true,
      seeded,
      count: retrievedParents.length,
      failed,
      hydrationFailureList,
    };
  };

  const reassignParentsToProject = (currProjectId, newProjectId) => {
    const reassignResult = parentManager.reassignParentsToProject(currProjectId, newProjectId);

    if (!reassignResult.success) {
      return { success: false, reason: reassignResult.reason };
    }

    return { success: true, changed: reassignResult.changed };
  };

  const removeParent = (id) => {
    const removalResult = parentManager.removeParent(id);

    if (!removalResult.success) {
      return { success: false, reason: removalResult.reason };
    }

    return {
      success: true,
      removedParentId: removalResult.removedParentId,
    };
  };

  const removeParentsOfProject = (projectId) => {
    const removalResult = parentManager.removeParentsOfProject(projectId);

    if (!removalResult.success) {
      return { success: false, reason: removalResult.reason };
    }

    return { success: true, removed: removalResult.removed };
  };

  const parentServiceSeed = () => {
    // Home
    createParent(
      "bf913988-69e8-4a6b-9625-544141de2a83",
      "Clean kitchen",
      "Wipe counters, sweep floor, and take out trash",
      "2026-04-06",
      "Not Started",
    );

    createParent(
      "bf913988-69e8-4a6b-9625-544141de2a83",
      "Laundry",
      "Wash, dry, and fold clothes",
      "2026-04-07",
      "In Progress",
    );

    // Career
    createParent(
      "858577d7-8efb-4302-9149-1b0708d7163c",
      "Update resume",
      "Revise experience section and add recent project work",
      "2026-04-10",
      "Not Started",
    );

    createParent(
      "858577d7-8efb-4302-9149-1b0708d7163c",
      "Study Maximo workflows",
      "Review launch points, actions, and workflow basics",
      "2026-04-12",
      "In Progress",
    );

    // Relationship
    createParent(
      "150b3839-519b-4c5a-a654-c604e2bc1f23",
      "Plan date night",
      "Pick restaurant and confirm time",
      "2026-04-08",
      "Not Started",
    );

    createParent(
      "150b3839-519b-4c5a-a654-c604e2bc1f23",
      "Call family",
      "Catch up and check in for the week",
      "2026-04-05",
      "Complete",
    );

    // Education
    createParent(
      "1b1ea0af-acee-4c93-8de0-4b9c43d4d5a1",
      "Read SQL notes",
      "Review joins, EXISTS, and subqueries",
      "2026-04-09",
      "In Progress",
    );

    createParent(
      "1b1ea0af-acee-4c93-8de0-4b9c43d4d5a1",
      "Practice JavaScript closures",
      "Do 3 closure and factory function exercises",
      "2026-04-11",
      "Not Started",
    );
  };

  return {
    changeParentDescription,
    changeParentDueDate,
    changeParentProjectId,
    changeParentStatus,
    changeParentTitle,
    createParent,
    createParentListSnapshot,
    getParent,
    getParentIdsByProjectId,
    initializeParentAppData,
    loadParentAppData,
    reassignParentsToProject,
    removeParentsOfProject,
    removeParent,
  };
};

const parentService = createParentService();
export { parentService };
