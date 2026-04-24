import "../../css/reset.css";
import "../../css/fonts.css";
import "../../css/header.css";
import "../../css/sidebar.css";
import "../../css/index.css";
import { toDoController } from "./to-do-controller";

(() => {
  // =================================
  // INIT STORAGE
  // =================================
  toDoController.initStorage();

  // =================================
  // INIT UI
  // =================================
  toDoController.initDisplay();

})();
