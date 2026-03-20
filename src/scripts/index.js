import "../css/reset.css";
import "../css/styles.css";
import { combinedToDoManager } from "./combined-display.js";
import { atomicToDoManager } from "./atomic-to-do.js";
import { parentToDoManager } from "./parent-to-do.js"
import { projectManager } from "./project.js";

// Run on page load

(() => {
    /**Start combining
     * But don't nest child objects into parent objects
     * Instead see if you can create console.table that displays atomic-to-dos under approrpriate parent-to-dos
     * Then see if you can do it in three layers atomic then parent then project
     * Don't nest the structure. Just display the structure as nested.
     * Rememebr - Separate tables with atomic data
     */

    // =====================
    // PROJECTS (IDs 0..7)
    // =====================
    projectManager.addProjectToManagerArray("Home");
    projectManager.addProjectToManagerArray("Education");
    projectManager.addProjectToManagerArray("Career")
    projectManager.addProjectToManagerArray("Relationship");

    // =====================
    // PARENTS (IDs 0..7)
    // =====================
    parentToDoManager.addParentToDoToManagerArray(
        "Home",
        "Kitchen reset",
        "Quick reset: dishes, counters, trash, sweep.",
        "2026-03-06",
        "incomplete"
    ); // parentId = 0

    parentToDoManager.addParentToDoToManagerArray(
        "Home",
        "Laundry + sheets",
        "Wash clothes and change bed sheets.",
        "2026-03-07",
        "incomplete"
    ); // parentId = 1

    parentToDoManager.addParentToDoToManagerArray(
        "Career",
        "Weekly status update",
        "Draft and send the weekly status email to the team.",
        "2026-03-08",
        "incomplete"
    ); // parentId = 2

    parentToDoManager.addParentToDoToManagerArray(
        "Career",
        "Refactor to-do managers",
        "Switch child linking from category to parentId and clean up naming.",
        "2026-03-10",
        "incomplete"
    ); // parentId = 3

    parentToDoManager.addParentToDoToManagerArray(
        "Relationship",
        "Plan date night",
        "Pick an idea, confirm availability, book if needed.",
        "2026-03-09",
        "incomplete"
    ); // parentId = 4

    parentToDoManager.addParentToDoToManagerArray(
        "Relationship",
        "Weekly check-in",
        "Short conversation about needs, plans, and how things feel.",
        "2026-03-11",
        "incomplete"
    ); // parentId = 5

    parentToDoManager.addParentToDoToManagerArray(
        "Education",
        "Read chapter 4",
        "Read the chapter and capture key points.",
        "2026-03-08",
        "incomplete"
    ); // parentId = 6

    parentToDoManager.addParentToDoToManagerArray(
        "Education",
        "Practice problems set",
        "Do a focused set of practice questions and review mistakes.",
        "2026-03-09",
        "incomplete"
    ); // parentId = 7


    // =====================
    // CHILDREN (2 per parent)
    // First arg = parentId (for your refactor)
    // =====================

    // Parent 0 (Home - Kitchen reset)
    atomicToDoManager.addAtomicToDoToManagerArray("0", "Home", "Wash dishes and clear sink", "2026-03-06", "incomplete");
    atomicToDoManager.addAtomicToDoToManagerArray("0", "Home", "Wipe counters + sweep floor", "2026-03-06", "incomplete");

    // Parent 1 (Home - Laundry + sheets)
    atomicToDoManager.addAtomicToDoToManagerArray("1", "Home", "Change sheets and pillowcases", "2026-03-07", "incomplete");
    atomicToDoManager.addAtomicToDoToManagerArray("1", "Home", "Wash and dry laundry load", "2026-03-07", "incomplete");

    // Parent 2 (Career - Weekly status update)
    atomicToDoManager.addAtomicToDoToManagerArray("2", "Career", "Write 5 bullet update summary", "2026-03-08", "incomplete");
    atomicToDoManager.addAtomicToDoToManagerArray("2", "Career", "Send status email to team", "2026-03-08", "incomplete");

    // Parent 3 (Career - Refactor to-do managers)
    atomicToDoManager.addAtomicToDoToManagerArray("3", "Career", "Add atomicParentId field + set it on create", "2026-03-10", "incomplete");
    atomicToDoManager.addAtomicToDoToManagerArray("3", "Career", "Update display join: group children by parentId", "2026-03-10", "incomplete");

    // Parent 4 (Relationship - Plan date night)
    atomicToDoManager.addAtomicToDoToManagerArray("4", "Relationship", "Pick 2 date ideas and text options", "2026-03-09", "incomplete");
    atomicToDoManager.addAtomicToDoToManagerArray("4", "Relationship", "Reserve / confirm plan details", "2026-03-09", "incomplete");

    // Parent 5 (Relationship - Weekly check-in)
    atomicToDoManager.addAtomicToDoToManagerArray("5", "Relationship", "Write 3 topics to cover (short)", "2026-03-11", "incomplete");
    atomicToDoManager.addAtomicToDoToManagerArray("5", "Relationship", "Schedule 20 minutes and do check-in", "2026-03-11", "incomplete");

    // Parent 6 (Education - Read chapter 4)
    atomicToDoManager.addAtomicToDoToManagerArray("6", "Education", "Read pages 1–10 and highlight questions", "2026-03-08", "incomplete");
    atomicToDoManager.addAtomicToDoToManagerArray("6", "Education", "Write 5 key takeaways", "2026-03-08", "incomplete");

    // Parent 7 (Education - Practice problems set)
    atomicToDoManager.addAtomicToDoToManagerArray("7", "Education", "Do 10 practice questions timed", "2026-03-09", "incomplete");
    atomicToDoManager.addAtomicToDoToManagerArray("7", "Education", "Review mistakes and note patterns", "2026-03-09", "incomplete");

    // DISPLAY
    projectManager.displayProjectsInManagerArray();
    parentToDoManager.displayParentToDosInManagerArray();
    atomicToDoManager.displayAtomicToDosInManagerArray();
    combinedToDoManager.displayProjectWithAllToDos();
})()
