import "../css/reset.css";
import "../css/styles.css";
import { combinedToDoManager } from "./combined-display.js";
import { atomicToDoManager } from "./atomic-to-do.js";
import { parentToDoManager } from "./parent-to-do.js";
import { projectManager } from "./project.js";

// Run on page load
(() => {
  // =================================
  // PROJECT EXAMPLES & TESTS
  // =================================
  toDoService.createProject("Home");
  toDoService.createProject("Work");
  toDoService.createProject("Relationship");
  toDoService.changeProjectName("Career", "Education");
  toDoService.changeProjectName("Career", "Hobbies");

  toDoService.testDisplay();

  // =================================
  // PARENT TO-DO EXAMPLES & TESTS
  // =================================
  parentToDoManager.addParentToDoFromLocalStorageToManagerArray(
    "6d58e921-7b42-423b-a355-88d32d402894",
    "27b66ef3-5cd6-41a5-aa91-46bc430f5856",
    "Kitchen reset",
    "Quick reset: dishes, counters, trash, sweep.",
    "2026-03-06",
    "incomplete",
  ); // parentId = 0

  parentToDoManager.addParentToDoFromLocalStorageToManagerArray(
    "6d58e921-7b42-423b-a355-88d32d402894",
    "675d7895-beeb-45f9-9c2d-f2f5a2dd4ac5",
    "Laundry + sheets",
    "Wash clothes and change bed sheets.",
    "2026-03-07",
    "incomplete",
  ); // parentId = 1

  parentToDoManager.addParentToDoFromLocalStorageToManagerArray(
    "c4ddd3ba-0a55-4fd6-a66e-8c7fca543f79",
    "13162ba9-ab10-4122-86a0-991cda89ccab",
    "Weekly status update",
    "Draft and send the weekly status email to the team.",
    "2026-03-08",
    "incomplete",
  ); // parentId = 2

  parentToDoManager.addParentToDoFromLocalStorageToManagerArray(
    "c4ddd3ba-0a55-4fd6-a66e-8c7fca543f79",
    "c6f7c6fa-e406-472a-b564-21f489b9a748",
    "Refactor to-do managers",
    "Switch child linking from category to parentId and clean up naming.",
    "2026-03-10",
    "incomplete",
  ); // parentId = 3

  parentToDoManager.addParentToDoFromLocalStorageToManagerArray(
    "702010e2-120c-47b5-a8a2-5a3e6d29bef0",
    "70f66914-8765-46d7-92e0-758cbddc9a1c",
    "Plan date night",
    "Pick an idea, confirm availability, book if needed.",
    "2026-03-09",
    "incomplete",
  ); // parentId = 4

  parentToDoManager.addParentToDoFromLocalStorageToManagerArray(
    "702010e2-120c-47b5-a8a2-5a3e6d29bef0",
    "905e3c1b-f1d2-46cd-801e-787815798988",
    "Weekly check-in",
    "Short conversation about needs, plans, and how things feel.",
    "2026-03-11",
    "incomplete",
  ); // parentId = 5

  parentToDoManager.addParentToDoFromLocalStorageToManagerArray(
    "30a8d11e-2126-45cd-b362-bded2261d4d0",
    "d17043cc-f02b-4ba8-828e-b67b48b095e9",
    "Read chapter 4",
    "Read the chapter and capture key points.",
    "2026-03-08",
    "incomplete",
  ); // parentId = 6

  parentToDoManager.addParentToDoFromLocalStorageToManagerArray(
    "30a8d11e-2126-45cd-b362-bded2261d4d0",
    "00c10c16-4245-4862-a813-9b87a17de9be",
    "Practice problems set",
    "Do a focused set of practice questions and review mistakes.",
    "2026-03-09",
    "incomplete",
  ); // parentId = 7

  // parentToDoManager.addParentToDoToManagerArray(
  //     "30a8d11e-2126-45cd-b362-bded2261d4d0",
  //     "Fix bugs in three javascript files",
  //     "Fixing bugs is a necessary way to become a better coder",
  //     "2026-03-09",
  //     "incomplete"
  // ); // parentId = 8

  console.log("Displaying Parent To-Dos In Parent Manager Array");
  console.log("Works for first time empty storage and non-empty storage");
  parentToDoManager.displayParentToDosInManagerArray();

  console.log("Displaying Parent To-Dos In Parent Manager Snapshot Array after save to Local Storage");
  parentToDoManager.displayParentToDosInManagerArraySnapshot();

  // =================================
  // ATOMIC TO-DO EXAMPLES & TESTS
  // =================================
  // Parent 0 (Home - Kitchen reset)
  // atomicToDoManager.addAtomicToDoToManagerArray("27b66ef3-5cd6-41a5-aa91-46bc430f5856", "Wash dishes and clear sink", "2026-03-06", "incomplete");
  // atomicToDoManager.addAtomicToDoToManagerArray("27b66ef3-5cd6-41a5-aa91-46bc430f5856", "Wipe counters + sweep floor", "2026-03-06", "incomplete");

  // // Parent 1 (Home - Laundry + sheets)
  // atomicToDoManager.addAtomicToDoToManagerArray("675d7895-beeb-45f9-9c2d-f2f5a2dd4ac5", "Change sheets and pillowcases", "2026-03-07", "incomplete");
  // atomicToDoManager.addAtomicToDoToManagerArray("675d7895-beeb-45f9-9c2d-f2f5a2dd4ac5", "Wash and dry laundry load", "2026-03-07", "incomplete");

  // // Parent 2 (Career - Weekly status update)
  // atomicToDoManager.addAtomicToDoToManagerArray("13162ba9-ab10-4122-86a0-991cda89ccab", "Write 5 bullet update summary", "2026-03-08", "incomplete");
  // atomicToDoManager.addAtomicToDoToManagerArray("13162ba9-ab10-4122-86a0-991cda89ccab", "Send status email to team", "2026-03-08", "incomplete");

  // // Parent 3 (Career - Refactor to-do managers)
  // atomicToDoManager.addAtomicToDoToManagerArray("c6f7c6fa-e406-472a-b564-21f489b9a748", "Add atomicParentId field + set it on create", "2026-03-10", "incomplete");
  // atomicToDoManager.addAtomicToDoToManagerArray("c6f7c6fa-e406-472a-b564-21f489b9a748", "Update display join: group children by parentId", "2026-03-10", "incomplete");

  // // Parent 4 (Relationship - Plan date night)
  // atomicToDoManager.addAtomicToDoToManagerArray("70f66914-8765-46d7-92e0-758cbddc9a1c", "Pick 2 date ideas and text options", "2026-03-09", "incomplete");
  // atomicToDoManager.addAtomicToDoToManagerArray("70f66914-8765-46d7-92e0-758cbddc9a1c", "Reserve / confirm plan details", "2026-03-09", "incomplete");

  // // Parent 5 (Relationship - Weekly check-in)
  // atomicToDoManager.addAtomicToDoToManagerArray("905e3c1b-f1d2-46cd-801e-787815798988", "Write 3 topics to cover (short)", "2026-03-11", "incomplete");
  // atomicToDoManager.addAtomicToDoToManagerArray("905e3c1b-f1d2-46cd-801e-787815798988", "Schedule 20 minutes and do check-in", "2026-03-11", "incomplete");

  // // Parent 6 (Education - Read chapter 4)
  // atomicToDoManager.addAtomicToDoToManagerArray("d17043cc-f02b-4ba8-828e-b67b48b095e9", "Read pages 1-10 and highlight questions", "2026-03-08", "incomplete");
  // atomicToDoManager.addAtomicToDoToManagerArray("d17043cc-f02b-4ba8-828e-b67b48b095e9", "Write 5 key takeaways", "2026-03-08", "incomplete");

  // // Parent 7 (Education - Practice problems set)
  // atomicToDoManager.addAtomicToDoToManagerArray("00c10c16-4245-4862-a813-9b87a17de9be", "Do 10 practice questions timed", "2026-03-09", "incomplete");
  // atomicToDoManager.addAtomicToDoToManagerArray("00c10c16-4245-4862-a813-9b87a17de9be", "Review mistakes and note patterns", "2026-03-09", "incomplete");

  console.log("Displaying Atomic To-Dos In Atomic Manager Array");
  console.log("Works for first time empty storage and non-empty storage");
  atomicToDoManager.displayAtomicToDosInManagerArray();

  console.log("Displaying Atomic To-Dos In Atomic Manager Snapshot Array after save to Local Storage");
  atomicToDoManager.displayAtomicToDosInManagerArraySnapshot();

  // =================================
  // ATOMIC TO-DO EXAMPLES & TESTS
  // =================================
  // Parent 0 (Home - Kitchen reset)
  atomicToDoManager.addAtomicToDoFromLocalStorageToManagerArray(
    "27b66ef3-5cd6-41a5-aa91-46bc430f5856",
    "Wash dishes and clear sink",
    "2026-03-06",
    "incomplete",
  );
  atomicToDoManager.addAtomicToDoFromLocalStorageToManagerArray(
    "27b66ef3-5cd6-41a5-aa91-46bc430f5856",
    "Wipe counters + sweep floor",
    "2026-03-06",
    "incomplete",
  );

  // Parent 1 (Home - Laundry + sheets)
  atomicToDoManager.addAtomicToDoFromLocalStorageToManagerArray(
    "675d7895-beeb-45f9-9c2d-f2f5a2dd4ac5",
    "Change sheets and pillowcases",
    "2026-03-07",
    "incomplete",
  );
  atomicToDoManager.addAtomicToDoFromLocalStorageToManagerArray(
    "675d7895-beeb-45f9-9c2d-f2f5a2dd4ac5",
    "Wash and dry laundry load",
    "2026-03-07",
    "incomplete",
  );

  // Parent 2 (Career - Weekly status update)
  atomicToDoManager.addAtomicToDoFromLocalStorageToManagerArray(
    "13162ba9-ab10-4122-86a0-991cda89ccab",
    "Write 5 bullet update summary",
    "2026-03-08",
    "incomplete",
  );
  atomicToDoManager.addAtomicToDoFromLocalStorageToManagerArray(
    "13162ba9-ab10-4122-86a0-991cda89ccab",
    "Send status email to team",
    "2026-03-08",
    "incomplete",
  );

  // Parent 3 (Career - Refactor to-do managers)
  atomicToDoManager.addAtomicToDoFromLocalStorageToManagerArray(
    "c6f7c6fa-e406-472a-b564-21f489b9a748",
    "Add atomicParentId field + set it on create",
    "2026-03-10",
    "incomplete",
  );
  atomicToDoManager.addAtomicToDoFromLocalStorageToManagerArray(
    "c6f7c6fa-e406-472a-b564-21f489b9a748",
    "Update display join: group children by parentId",
    "2026-03-10",
    "incomplete",
  );

  // Parent 4 (Relationship - Plan date night)
  atomicToDoManager.addAtomicToDoFromLocalStorageToManagerArray(
    "70f66914-8765-46d7-92e0-758cbddc9a1c",
    "Pick 2 date ideas and text options",
    "2026-03-09",
    "incomplete",
  );
  atomicToDoManager.addAtomicToDoFromLocalStorageToManagerArray(
    "70f66914-8765-46d7-92e0-758cbddc9a1c",
    "Reserve / confirm plan details",
    "2026-03-09",
    "incomplete",
  );

  // Parent 5 (Relationship - Weekly check-in)
  atomicToDoManager.addAtomicToDoFromLocalStorageToManagerArray(
    "905e3c1b-f1d2-46cd-801e-787815798988",
    "Write 3 topics to cover (short)",
    "2026-03-11",
    "incomplete",
  );
  atomicToDoManager.addAtomicToDoFromLocalStorageToManagerArray(
    "905e3c1b-f1d2-46cd-801e-787815798988",
    "Schedule 20 minutes and do check-in",
    "2026-03-11",
    "incomplete",
  );

  // Parent 6 (Education - Read chapter 4)
  atomicToDoManager.addAtomicToDoFromLocalStorageToManagerArray(
    "d17043cc-f02b-4ba8-828e-b67b48b095e9",
    "Read pages 1-10 and highlight questions",
    "2026-03-08",
    "incomplete",
  );
  atomicToDoManager.addAtomicToDoFromLocalStorageToManagerArray(
    "d17043cc-f02b-4ba8-828e-b67b48b095e9",
    "Write 5 key takeaways",
    "2026-03-08",
    "incomplete",
  );

  // Parent 7 (Education - Practice problems set)
  atomicToDoManager.addAtomicToDoFromLocalStorageToManagerArray(
    "00c10c16-4245-4862-a813-9b87a17de9be",
    "Do 10 practice questions timed",
    "2026-03-09",
    "incomplete",
  );
  atomicToDoManager.addAtomicToDoFromLocalStorageToManagerArray(
    "00c10c16-4245-4862-a813-9b87a17de9be",
    "Review mistakes and note patterns",
    "2026-03-09",
    "incomplete",
  );

  console.log("Displaying Atomic To-Dos In Atomic Manager Array");
  console.log("Works for first time empty storage and non-empty storage");
  atomicToDoManager.displayAtomicToDosInManagerArray();

  console.log("Displaying Atomic To-Dos In Atomic Manager Snapshot Array after save to Local Storage");
  atomicToDoManager.displayAtomicToDosInManagerArraySnapshot();
})();
