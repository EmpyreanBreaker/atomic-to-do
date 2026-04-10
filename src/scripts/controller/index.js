import "../../css/reset.css";
import "../../css/styles.css";
import { combinedService } from "../service/combined-service";
import { parentService } from "../service/parent-service";
import { projectService } from "../service/project-service";

// Run on page load
(() => {
  // =================================
  // READ & LOAD STORAGE
  // =================================
  combinedService.initializeAppData();
  combinedService.loadAppData();
  // =================================
  // COMBINED EXAMPLES & TESTS
  // =================================
  combinedService.buildAllHierarchy();
  // =================================
  // DELETION
  // =================================

  console.table(projectService.getProjects());
  console.table(parentService.getParents());
})();
