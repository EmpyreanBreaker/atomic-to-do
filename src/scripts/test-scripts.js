import { projectManager } from "./project";

(() => {

    // =================================
    // DEFAULT PROJECT SETUP
    // HOME SERVES AS DEFAULT PROJECT
    // =================================
    const init = () => {

        if (!localStorage.getItem("toDoProjects")) {
            console.log("Empty Storage! Populating Storage");
            populateStorageWithDefaultProject();
        }

        console.log("Storage Not Empty! Loading From Storage")
        hydateProjectManagerArray();
    };

    const populateStorageWithDefaultProject = () => {
        const initProjectManagerArray = [{ projectId: crypto.randomUUID(), projectName: "Home" }];
        localStorage.setItem("toDoProjects", JSON.stringify(initProjectManagerArray))
    }

    const hydateProjectManagerArray = () => {
        const toDoProjects = JSON.parse(localStorage.getItem("toDoProjects") || "[]");
        toDoProjects.forEach(project => projectManager.addProjectFromLocalStorageToManagerArray(project.projectId, project.projectName));
    }

    init();

    // =================================
    // DEFAULT PROJECT TESTS
    // =================================
    projectManager.addProjectToManagerArray("Home");
    projectManager.addProjectToManagerArray("Education");
    projectManager.addProjectToManagerArray("Career")
    projectManager.addProjectToManagerArray("Relationship");

    console.log("Displaying Project In Project Manager Array")
    console.log("Works for first time empty storage and non-empty storage")
    projectManager.displayProjectsInManagerArray();
    projectManager.changeProjectNameInManagerArray("Education", "BLEB");
    console.log("Displaying Project In Project Manager Snapshot Array after save to Local Storage")
    projectManager.displayProjectsInManagerArrayDeepCopy();
    
    // Atomic To-Do Manager
    atomicToDoManager.addAtomicToDoToManagerArray("School", "Read chapter 3 and take notes", "2026-03-06", "incomplete");
    atomicToDoManager.addAtomicToDoToManagerArray("School", "Submit assignment draft", "2026-03-08", "incomplete");
    atomicToDoManager.addAtomicToDoToManagerArray("Home", "Meal prep for the week", "2026-03-05", "incomplete");
    atomicToDoManager.addAtomicToDoToManagerArray("Home", "Fix the loose cabinet handle", "2026-03-09", "incomplete");
    atomicToDoManager.addAtomicToDoToManagerArray("Work", "Review Maximo SR workflow notes and summarize", "2026-03-05", "incomplete");
    atomicToDoManager.addAtomicToDoToManagerArray("Relationshiip", "Plan a date idea and send a message", "2026-03-07", "incomplete");
    atomicToDoManager.displayAtomicToDosInManagerArray();

    // Tests
    atomicToDoManager.changeAtomicDescriptionInManagerArray(0, "Read chapter 4 and don't take notes");
    atomicToDoManager.changeAtomicDueDateInManagerArray(1, "2026-12-09");
    atomicToDoManager.changeAtomicStatusInManagerArray(2);
    atomicToDoManager.deleteAtomicToDoFromManagerArray(3);
    atomicToDoManager.displayAtomicToDosInManagerArray()

    // Parent To Do Manager
    parentToDoManager.addParentToDoToManagerArray("Work", "Weekly status update", "Draft and send the weekly status email to the team.", "2026-03-08", "completed");
    parentToDoManager.addParentToDoToManagerArray("Work", "Refactor to-do modules", "Clean up manager naming and fix validation guards.", "2026-03-10", "incomplete");
    parentToDoManager.addParentToDoToManagerArray("Relationship", "Plan a date night", "Pick an idea, confirm availability, and book if needed.", "2026-03-09", "incomplete");
    parentToDoManager.addParentToDoToManagerArray("Relationship", "Have the hard talk", "Bring up expectations and listen without defending.", "2026-03-11", "completed");
    parentToDoManager.addParentToDoToManagerArray("Home", "Grocery run", "Buy staples for the week + ingredients for 2 easy meals.", "2026-03-07", "completed");
    parentToDoManager.addParentToDoToManagerArray("Home", "Clean kitchen reset", "Counters, dishes, take out trash, wipe stove, sweep floor.", "2026-03-06", "incomplete");
    parentToDoManager.addParentToDoToManagerArray("Education", "Read chapter 4", "Read chapter 4 and write 5 bullet-point takeaways.", "2026-03-08", "incomplete");
    parentToDoManager.addParentToDoToManagerArray("Education", "Study session", "45 minutes: review notes + do 10 practice questions.", "2026-03-07", "incomplete");
    parentToDoManager.displayParentToDosInManagerArray();

    // Tests
    parentToDoManager.changeParentDescriptionInManagerArray(0, "Read chapter 4 and don't take notes");
    parentToDoManager.changeParentDueDateInManagerArray(1, "2026-12-09");
    parentToDoManager.changeParentProjectNameInManagerArray(2, "Undefined");
    parentToDoManager.changeParentStatusInManagerArray(3);
    parentToDoManager.changeParentTitleInManagerArray(4, "Undefined task")
    parentToDoManager.deleteParentToDoFromManagerArray(5);
    parentToDoManager.displayParentToDosInManagerArray();

    // Project Manager
    // Should be rejected - Default Project
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