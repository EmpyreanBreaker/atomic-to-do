import { toDoRepository } from "../repository/to-do-repository";
import { parentManager } from "../model/parent-manager";

const createParentService = () => {
  const changeParentDescription = (id, newDescription) => {
    const changed = parentManager.changeParentDescription(id, newDescription);
    if (changed.success) {
      toDoRepository.save("parents", parentManager.createSnapshot());
      return { success: true, description: changed.description };
    }
    return { success: false, reason: changed.reason };
  };

  const changeParentDueDate = (id, newDueDate) => {
    const changed = parentManager.changeParentDueDate(id, newDueDate);
    if (changed.success) {
      toDoRepository.save("parents", parentManager.createSnapshot());
      return { success: true, dueDate: changed.dueDate };
    }
    return { success: false, reason: changed.reason };
  };

  const changeParentProjectId = (id, newProjectId) => {
    const changed = parentManager.changeParentProjectId(id, newProjectId);
    if (changed.success) {
      toDoRepository.save("parents", parentManager.createSnapshot());
      return { success: true, projectId: changed.projectId };
    }
    return { success: false, reason: changed.reason };
  };

  const changeParentStatus = (id) => {
    const changed = parentManager.changeParentStatus(id);
    if (changed.success) {
      toDoRepository.save("parents", parentManager.createSnapshot());
      return { success: true, status: changed.status };
    }
    return { success: false, reason: changed.reason };
  };

  const changeParentTitle = (id, newTitle) => {
    const changed = parentManager.changeParentTitle(id, newTitle);
    if (changed.success) {
      toDoRepository.save("parents", parentManager.createSnapshot());
      return { success: true, title: changed.title };
    }
    return { success: false, reason: changed.reason };
  };

  const createParent = (newProjectId, newTitle, newDescription, newDueDate, newStatus) => {
    const created = parentManager.addParent(newProjectId, newTitle, newDescription, newDueDate, newStatus);
    if (created.success) {
      toDoRepository.save("parents", parentManager.createSnapshot());
      return { success: true, parentData: created.parentData };
    }
    return { success: false, reason: created.reason };
  };

  const getParents = () => {
    return parentManager.createSnapshot();
  };

  const initializeParentAppData = () => {
    if (!toDoRepository.exists("parents")) {
      const initialParentData = parentManager.createSnapshot();
      toDoRepository.save("parents", initialParentData);
    }
  };

  const loadParentAppData = () => {
    if (toDoRepository.exists("parents")) {
      const retrievedParents = toDoRepository.load("parents");
      parentManager.reset();
      // Testing only: if storage exists but is empty, seed default parent data once.
      // After seeding, later reloads should hydrate from storage instead of creating again.
      if (retrievedParents.length === 0) {
        parentServiceSeed();
      } else {
        retrievedParents.forEach((parent) => {
          parentManager.addHydratedParent(parent);
        });
      }
    }
  };

  const reassignParentsToProject = (currProjectId, newProjectId) => {
    const reassigned = parentManager.reassignParentsToProject(currProjectId, newProjectId);
    if (reassigned.success) {
      toDoRepository.save("parents", parentManager.createSnapshot());
      return { success: true, changed: reassigned.changed };
    }
    return { success: false, reason: reassigned.reason };
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
    getParents,
    initializeParentAppData,
    loadParentAppData,
    reassignParentsToProject,
  };
};
const parentService = createParentService();
export { parentService };
