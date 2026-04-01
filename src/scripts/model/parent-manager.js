import { da } from "date-fns/locale";
import { parent } from "./parent.js";

const createParentManager = () => {
  const parentList = [];

  // All values can be empty except for ProjectId
  const addParent = (
    newProjectId,
    newTitle = "",
    newDescription = "",
    newStatus = "incomplete",
    newDueDate = "",
  ) => {
    if (newStatus !== "complete" && newStatus !== "incomplete") {
      newStatus = "incomplete";
    }

    if (typeof newProjectId !== "string" || newProjectId.trim() === "") {
      return {
        success: false,
        reason: `Invalid Project Id - Project Id cannot be blank`,
      };
    }

    const newParent = parent();
    newParent.create(
      newProjectId,
      newTitle,
      newDescription,
      newStatus,
      newDueDate,
    );
    parentList.push(newParent);
    return { success: true, parentData: newParent.getData() };
  };

  const addHydratedParent = (parsedData) => {
    if (!parsedData || typeof parsedData !== "object") {
      return {
        success: false,
        reason: `Data Error - Stored parent data is invalid!`,
      };
    }

    if (typeof parsedData.id !== "string" || parsedData.id.trim() === "") {
      return {
        success: false,
        reason: `Data Error - Parent id is invalid in stored data!`,
      };
    }

    if (
      typeof parsedData.projectId !== "string" ||
      parsedData.projectId.trim() === ""
    ) {
      return {
        success: false,
        reason: `Data Error - Project id is invalid in stored data!`,
      };
    }

    if (parentExists(parsedData.id)) {
      return {
        success: false,
        reason: `Data Error - This parent - id [${parsedData.id}] - already exists!`,
      };
    }

    const restoredParent = parent();
    restoredParent.hydrate(parsedData);
    parentList.push(restoredParent);
    return { success: true, parentData: restoredParent.getData() };
  };

  // Users can leave blank descriptions
  const changeParentDescription = (parentId, newDescription) => {
    if (typeof newDescription !== "string") {
      newDescription = "";
    }

    if (typeof parentId !== "string" || parentId.trim() === "") {
      return {
        success: false,
        reason: `Invalid Parent Id - Parent Id must be a string and not blank!`,
      };
    }

    const cleanParentId = parentId.trim();
    const targetParent = findParentById(cleanParentId);
    if (!targetParent) {
      return {
        success: false,
        reason: `Invalid Parent Id - This parent - id [${cleanParentId}] - does not exist in the parent list!`,
      };
    }

    targetParent.setDescription(newDescription.trim());
    return { success: true, description: targetParent.getDescription() };
  };

  // Users can leave blank due dates
  const changeDueDate = (parentId, newDueDate) => {};

  const findParentById = (parentId) => {
    return parentList.find((parent) => parent.getId() === parentId);
  };

  const normalizeDueDate = (dueDate) => {
    if (typeof dueDate !== "string") {
      return {
        success: false,
        reason: `Invalid Due Date - Due date must be blank or a string in YYYY-MM-DD format!`,
      };
    }

    const cleanDueDate = dueDate.trim();

    if (cleanDueDate === "") {
      return {
        success: true,
        date: "",
      };
    }

    if (cleanDueDate.length !== 10) {
      return {
        success: false,
        reason: `Invalid Due Date - Due date must use YYYY-MM-DD format!`,
      };
    }

    if (cleanDueDate[4] !== "-" || cleanDueDate[7] !== "-") {
      return {
        success: false,
        reason: `Invalid Due Date - Due date must use YYYY-MM-DD format!`,
      };
    }

    const dateArray = cleanDueDate.split("-");
    const year = dateArray[0];
    const numericYear = Number(year);
    const month = dateArray[1];
    const numericMonth = Number(month);
    const day = dateArray[2];
    const numericDay = Number(day);
    const thirtyDayMonths = ["04", "06", "09", "11"];
    let isLeapYear = false;

    if (isNaN(numericYear) || isNaN(numericMonth) || isNaN(numericDay)) {
      return {
        success: false,
        reason: `Invalid Due Date - Year, month, and day must contain only numbers in YYYY-MM-DD format!`,
      };
    }

    if (numericMonth <= 0 || numericMonth > 12) {
      return {
        success: false,
        reason: `Invalid Month - Month must be between 01 and 12!`,
      };
    }

    if (numericDay <= 0) {
      return {
        success: false,
        reason: `Invalid Day - Day must be greater than 00!`,
      };
    }

    if (numericDay > 30 && thirtyDayMonths.includes(month)) {
      return {
        success: false,
        reason: `Invalid Day - This month cannot have more than 30 days!`,
      };
    }

    if (
      numericDay > 31 &&
      !thirtyDayMonths.includes(month) &&
      numericMonth !== 2
    ) {
      return {
        success: false,
        reason: `Invalid Day - This month cannot have more than 31 days!`,
      };
    }

    if (numericYear % 4 === 0) {
      if (numericYear % 100 !== 0 || numericYear % 400 === 0) {
        isLeapYear = true;
      }
    }

    if (numericDay > 29 && numericMonth === 2 && isLeapYear === true) {
      return {
        success: false,
        reason: `Invalid Day - February in a leap year cannot have more than 29 days!`,
      };
    }

    if (numericDay > 28 && numericMonth === 2 && isLeapYear === false) {
      return {
        success: false,
        reason: `Invalid Day - February in a non-leap year cannot have more than 28 days!`,
      };
    }

    return {
      success: true,
      date: cleanDueDate,
    };
  };

  // Checks if a parent already exists in the manager array
  const parentExists = (id) => {
    return parentList.some((parent) => parent.getId() === id);
  };

  return {
    addParent,
    addHydratedParent,
    changeParentDescription,
    changeDueDate,
  };
};
const parentManager = createParentManager();
export { parentManager };
