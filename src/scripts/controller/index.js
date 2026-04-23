import "../../css/reset.css";
import "../../css/fonts.css";
import "../../css/header.css";
import "../../css/sidebar.css";
import "../../css/index.css";
import { combinedService } from "../service/combined-service";
import { initializeAppControllers } from "./to-do-controller";

(() => {
  combinedService.initializeAppData();
  combinedService.loadAppData();

  initializeAppControllers();
  // const getBuildHierarchy = () => {
  //   return combinedService.buildAllHierarchy();
  // };

  // const getParentCounts = () => {
  //   return combinedService.getParentCounts();
  // };

  // initializeAppControllers({
  //   getBuildHierarchy: getBuildHierarchy,
  //   getParentCounts: getParentCounts,
  // });
})();
