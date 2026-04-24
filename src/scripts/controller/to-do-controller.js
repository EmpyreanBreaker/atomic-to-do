import { combinedService } from "../service/combined-service";
import { asideController } from "./aside-controller";
import { mainController } from "./main-controller";
import { bindProjectSelection } from "./aside-presenter";
import { renderByProjectName } from "./main-presenter";

const createToDoController = () => {
  const initDisplay = () => {
    asideController.initSidebar();
    mainController.initMain();
  };

  const initStorage = () => {
    combinedService.initializeAppData();
    combinedService.loadAppData();
  };

  bindProjectSelection((projectName) => {
    mainController.buildByProjectName(projectName);
    // asideController.refreshSidebar();
  });

  return { initDisplay, initStorage };
};

const toDoController = createToDoController();

export { toDoController };
