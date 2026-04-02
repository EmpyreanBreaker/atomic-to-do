import "../../css/reset.css";
import "../../css/styles.css";
import { toDoService } from "../service/to-do-service";

// Run on page load
(() => {
  // =================================
  // READ & LOAD STORAGE
  // =================================
  toDoService.initializeAppData();
  toDoService.loadAppData();
  // =================================
  // PROJECT EXAMPLES & TESTS
  // =================================
  toDoService.createProject("Home");
  toDoService.createProject("Work");
  toDoService.createProject("Relationship");
  toDoService.changeProjectName("Work", "Career");
  toDoService.createProject("Education");

  toDoService.testDisplay();

  // =================================
  // PARENT EXAMPLES & TESTS
  // =================================
})();
