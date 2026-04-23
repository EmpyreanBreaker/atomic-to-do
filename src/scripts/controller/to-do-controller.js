import { combinedService } from "../service/combined-service";
import { asideController } from "./aside-controller";
import { mainController } from "./main-controller";

const createToDoController = () => {
  const initDisplay = () => {
    asideController.initSidebar();
    mainController.initMain();
  };

  const initStorage = () => {
    combinedService.initializeAppData();
    combinedService.loadAppData();
  };

  return { initDisplay, initStorage };
};

const toDoController = createToDoController();

export { toDoController };
