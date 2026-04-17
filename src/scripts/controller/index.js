import "../../css/reset.css";
import "../../css/styles.css";
import "../../css/index.css";
import { combinedService } from "../service/combined-service";
import { initializeAppControllers } from "./to-do-controller";

(() => {
  combinedService.initializeAppData();
  combinedService.loadAppData();
  combinedService.displayAllHierarchy();

  const getBuildHierarchy = () => {
    return combinedService.buildAllHierarchy();
  };

  const getParentCounts = () => {
    return combinedService.getParentCounts();
  };

  initializeAppControllers({
    getBuildHierarchy: getBuildHierarchy,
    getParentCounts: getParentCounts,
  });
})();
