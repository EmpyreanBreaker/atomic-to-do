import { toDoRepository } from "../repository/to-do-repository";
import { project } from "../model/project";
import { parentManager } from "../model/parent-manager";
import { projectManager } from "../model/project-manager";
import { el } from "date-fns/locale";

const createParentService = () => {
  const initializeParentAppData = () => {
    if (!toDoRepository.exists("parents")) {
      console.log("Populating Default Parent data Into Storage");
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

  const changeParentDescription = (id, newDescription) => {
    const changed = parentManager.changeParentDescription(id, newDescription);
    if (changed.success) {
      toDoRepository.save("parents", parentManager.createSnapshot());
      return { success: true, description: changed.description };
    } else {
      console.log(`${changed.reason}`);
      return { success: false, reason: changed.reason };
    }
  };

  const changeParentDueDate = (id, newDueDate) => {
    const changed = parentManager.changeParentDueDate(id, newDueDate);
    if (changed.success) {
      toDoRepository.save("parents", parentManager.createSnapshot());
      return { success: true, dueDate: changed.dueDate };
    } else {
      console.log(`${changed.reason}`);
      return { success: false, reason: changed.reason };
    }
  };

  const changeParentProjectId = (id, newProjectId) => {
    const changed = parentManager.changeParentProjectId(id, newProjectId);
    if (changed.success) {
      toDoRepository.save("parents", parentManager.createSnapshot());
      return { success: true, projectId: changed.projectId };
    } else {
      console.log(`${changed.reason}`);
      return { success: false, reason: changed.reason };
    }
  };

  const changeParentStatus = (id) => {
    const changed = parentManager.changeParentStatus(id);
    if (changed.success) {
      toDoRepository.save("parents", parentManager.createSnapshot());
      return { success: true, status: changed.status };
    } else {
      console.log(`${changed.reason}`);
      return { success: false, reason: changed.reason };
    }
  };

  const changeParentTitle = (id, newTitle) => {
    const changed = parentManager.changeParentTitle(id, newTitle);
    if (changed.success) {
      toDoRepository.save("parents", parentManager.createSnapshot());
      return { success: true, title: changed.title };
    } else {
      console.log(`${changed.reason}`);
      return { success: false, reason: changed.reason };
    }
  };

  const createParent = (newProjectId, newTitle, newDescription, newStatus, newDueDate) => {
    const created = parentManager.addParent(newProjectId, newTitle, newDescription, newStatus, newDueDate);
    if (created.success) {
      toDoRepository.save("parents", parentManager.createSnapshot());
    } else {
      console.log(`${created.reason}`);
    }
  };

  const testParentDisplay = () => {
    console.table(parentManager.createSnapshot());
  };

  const parentServiceSeed = () => {
    // Home
    createParent(
      "bf913988-69e8-4a6b-9625-544141de2a83",
      "Clean kitchen",
      "Wipe counters, sweep floor, and take out trash",
      "Not Started",
      "2026-04-06",
    );

    createParent(
      "bf913988-69e8-4a6b-9625-544141de2a83",
      "Laundry",
      "Wash, dry, and fold clothes",
      "In Progress",
      "2026-04-07",
    );

    // Career
    createParent(
      "858577d7-8efb-4302-9149-1b0708d7163c",
      "Update resume",
      "Revise experience section and add recent project work",
      "Not Started",
      "2026-04-10",
    );

    createParent(
      "858577d7-8efb-4302-9149-1b0708d7163c",
      "Study Maximo workflows",
      "Review launch points, actions, and workflow basics",
      "In Progress",
      "2026-04-12",
    );

    // Relationship
    createParent(
      "150b3839-519b-4c5a-a654-c604e2bc1f23",
      "Plan date night",
      "Pick restaurant and confirm time",
      "Not Started",
      "2026-04-08",
    );

    createParent(
      "150b3839-519b-4c5a-a654-c604e2bc1f23",
      "Call family",
      "Catch up and check in for the week",
      "Complete",
      "2026-04-05",
    );

    // Education
    createParent(
      "1b1ea0af-acee-4c93-8de0-4b9c43d4d5a1",
      "Read SQL notes",
      "Review joins, EXISTS, and subqueries",
      "In Progress",
      "2026-04-09",
    );

    createParent(
      "1b1ea0af-acee-4c93-8de0-4b9c43d4d5a1",
      "Practice JavaScript closures",
      "Do 3 closure and factory function exercises",
      "Not Started",
      "2026-04-11",
    );
  };

  return {
    changeParentDescription,
    changeParentDueDate,
    changeParentProjectId,
    changeParentStatus,
    changeParentTitle,
    createParent,
    initializeParentAppData,
    loadParentAppData,
    testParentDisplay,
  };
};
const parentService = createParentService();
export { parentService };
