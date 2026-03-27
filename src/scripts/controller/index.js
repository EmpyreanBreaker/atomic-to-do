import "../../css/reset.css";
import "../../css/styles.css";
import { toDoService } from "../service/to-do-service";


// Run on page load
(() => {
    // =================================
    // READ & LOAD STORAGE
    // =================================
    toDoService.initializeAppData();
    // =================================
    // PROJECT EXAMPLES & TESTS
    // =================================
    // toDoProjectManager.addProjectToManagerArray("All");
    // toDoProjectManager.addProjectToManagerArray("Education");
    // toDoProjectManager.addProjectToManagerArray("Career")
    // toDoProjectManager.addProjectToManagerArray("Relationship");
    // toDoProjectManager.addProjectToManagerArray("Hobbies");

    // console.log("Displaying Project In Project Manager Array")
    // console.log("Works for first time empty storage and non-empty storage")
    // toDoProjectManager.displayProjectsInManagerArray();

    // console.log("Displaying Project In Project Manager Snapshot Array after save to Local Storage")
    // toDoProjectManager.displayProjectsInManagerArraySnapshot();
})()
