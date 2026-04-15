import "../../css/reset.css";
import "../../css/styles.css";
import "../../css/index.css";
import { combinedService } from "../service/combined-service";
import { asideFunctions, navigation } from "./aside";
import { displayProjectInMain } from "./main";

(() => {
  // =================================
  // COMBINED READ & LOAD STORAGE
  // =================================
  combinedService.initializeAppData();
  combinedService.loadAppData();
  combinedService.displayAllHierarchy();
  asideFunctions();
  navigation(displayProjectInMain);
})();
