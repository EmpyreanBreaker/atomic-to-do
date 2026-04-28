import { parent } from "./parent.js";

const createParentManager = () => {
  const parentList = [];

  const addParent = (
    newProjectId,
    newTitle = "",
    newDescription = "",
    newDueDate = "",
    newStatus = "incomplete",
  ) => {
    const cleanProjectId = typeof newProjectId === "string" ? newProjectId.trim() : "";
    const cleanTitle = typeof newTitle === "string" ? newTitle.trim() : "";
    const cleanDescription = typeof newDescription === "string" ? newDescription.trim() : "";
    const normalizedDueDate = normalizeDueDate(newDueDate);
    let cleanStatus = typeof newStatus === "string" ? newStatus.trim() : "";

    if (cleanProjectId === "") {
      return {
        success: false,
        reason: `Invalid Project Id - Project id must be a nonblank string!`,
      };
    }

    if (cleanTitle === "") {
      return {
        success: false,
        reason: `Invalid Title - Title must be a nonblank string!`,
      };
    }

    if (!normalizedDueDate.success) {
      return {
        success: false,
        reason: normalizedDueDate.reason,
      };
    }

    if (cleanStatus !== "complete" && cleanStatus !== "incomplete") {
      cleanStatus = "incomplete";
    }

    const newParent = parent();
    newParent.create(cleanProjectId, cleanTitle, cleanDescription, normalizedDueDate.date, cleanStatus);
    parentList.push(newParent);
    return { success: true, parentData: newParent.getData() };
  };

  const addHydratedParent = (parsedData) => {
    if (!parsedData || typeof parsedData !== "object") {
      return {
        success: false,
        reason: `Data Error - Stored parent data must be a valid object!`,
      };
    }

    const cleanId = typeof parsedData.id === "string" ? parsedData.id.trim() : "";
    const cleanProjectId = typeof parsedData.projectId === "string" ? parsedData.projectId.trim() : "";
    const cleanTitle = typeof parsedData.title === "string" ? parsedData.title.trim() : "";
    const cleanDescription = typeof parsedData.description === "string" ? parsedData.description.trim() : "";
    const normalizedDueDate = normalizeDueDate(parsedData.dueDate);
    let cleanStatus = typeof parsedData.status === "string" ? parsedData.status.trim() : "";

    if (cleanId === "") {
      return {
        success: false,
        reason: `Data Error - Stored parent id must be a nonblank string!`,
      };
    }

    if (cleanProjectId === "") {
      return {
        success: false,
        reason: `Data Error - Stored project id must be a nonblank string!`,
      };
    }

    if (cleanTitle === "") {
      return {
        success: false,
        reason: `Data Error - Stored title must be a nonblank string!`,
      };
    }

    if (!normalizedDueDate.success) {
      return {
        success: false,
        reason: normalizedDueDate.reason,
      };
    }

    if (cleanStatus !== "complete" && cleanStatus !== "incomplete") {
      cleanStatus = "incomplete";
    }

    if (findParentById(cleanId)) {
      return {
        success: false,
        reason: `Data Error - Parent id [${cleanId}] already exists in parent list!`,
      };
    }

    const restoredParent = parent();
    restoredParent.hydrate({
      id: cleanId,
      projectId: cleanProjectId,
      title: cleanTitle,
      description: cleanDescription,
      dueDate: normalizedDueDate.date,
      status: cleanStatus,
    });

    parentList.push(restoredParent);
    return { success: true, parentData: restoredParent.getData() };
  };

  // Users can leave blank descriptions
  const changeParentDescription = (id, newDescription) => {
    const cleanId = typeof id === "string" ? id.trim() : "";
    const cleanDescription = typeof newDescription === "string" ? newDescription.trim() : "";

    if (cleanId === "") {
      return {
        success: false,
        reason: `Invalid Parent Id - Parent Id must be a nonblank string!`,
      };
    }

    const targetParent = findParentById(cleanId);
    if (!targetParent) {
      return {
        success: false,
        reason: `Invalid Parent Id - Parent id [${cleanId}] does not exist in parent list!`,
      };
    }

    targetParent.setDescription(cleanDescription);
    return { success: true, description: targetParent.getDescription() };
  };

  // Users can leave blank due dates
  const changeParentDueDate = (id, newDueDate) => {
    const cleanId = typeof id === "string" ? id.trim() : "";
    const normalizedDueDate = normalizeDueDate(newDueDate);

    if (cleanId === "") {
      return {
        success: false,
        reason: `Invalid Parent Id - Parent id must be a nonblank string!`,
      };
    }

    if (!normalizedDueDate.success) {
      return {
        success: false,
        reason: normalizedDueDate.reason,
      };
    }

    const targetParent = findParentById(cleanId);
    if (!targetParent) {
      return {
        success: false,
        reason: `Invalid Parent Id - Parent id [${cleanId}] does not exist in parent list!`,
      };
    }

    targetParent.setDueDate(normalizedDueDate.date);
    return { success: true, dueDate: targetParent.getDueDate() };
  };

  const changeParentProjectId = (id, newProjectId) => {
    const cleanId = typeof id === "string" ? id.trim() : "";
    const cleanProjectId = typeof newProjectId === "string" ? newProjectId.trim() : "";

    if (cleanId === "") {
      return {
        success: false,
        reason: `Invalid Parent Id - Parent id must be a nonblank string!`,
      };
    }

    if (cleanProjectId === "") {
      return {
        success: false,
        reason: `Invalid Project Id - Project id must be a nonblank string!`,
      };
    }

    const targetParent = findParentById(cleanId);
    if (!targetParent) {
      return {
        success: false,
        reason: `Invalid Parent Id - Parent id [${cleanId}] does not exist in parent list!`,
      };
    }

    targetParent.setProjectId(cleanProjectId);
    return { success: true, projectId: targetParent.getProjectId() };
  };

  const changeParentStatus = (id, newStatus) => {
    const cleanId = typeof id === "string" ? id.trim() : "";
    const cleanStatus = typeof newStatus === "string" ? newStatus.trim().toLowerCase() : "";

    if (cleanId === "") {
      return {
        success: false,
        reason: `Invalid Parent Id - Parent id must be a nonblank string!`,
      };
    }

    if (cleanStatus !== "complete" && cleanStatus !== "incomplete") {
      return {
        success: false,
        reason: `Invalid Status - Status must be complete or incomplete!`,
      };
    }

    const targetParent = findParentById(cleanId);

    if (!targetParent) {
      return {
        success: false,
        reason: `Invalid Parent Id - Parent id [${cleanId}] does not exist in parent list!`,
      };
    }

    targetParent.setStatus(cleanStatus);

    return {
      success: true,
      status: targetParent.getStatus(),
    };
  };

  const changeParentTitle = (id, newTitle) => {
    const cleanId = typeof id === "string" ? id.trim() : "";
    const cleanTitle = typeof newTitle === "string" ? newTitle.trim() : "";

    if (cleanId === "") {
      return {
        success: false,
        reason: `Invalid Parent Id - Parent id must be a nonblank string!`,
      };
    }

    if (cleanTitle === "") {
      return {
        success: false,
        reason: `Invalid Title - Title must be a nonblank string!`,
      };
    }

    const targetParent = findParentById(cleanId);
    if (!targetParent) {
      return {
        success: false,
        reason: `Invalid Parent Id - Parent id [${cleanId}] does not exist in parent list!`,
      };
    }

    targetParent.setTitle(cleanTitle);
    return { success: true, title: targetParent.getTitle() };
  };

  const createSnapshot = () => {
    return parentList.map((parent) => parent.getData());
  };

  const getParent = (id) => {
    const cleanId = typeof id === "string" ? id.trim() : "";

    if (cleanId === "") {
      return {
        success: false,
        reason: `Invalid Parent Id - Parent Id must be a nonblank string!`,
      };
    }

    const targetParent = findParentById(cleanId);

    if (!targetParent) {
      return {
        success: false,
        reason: `Invalid Parent Id - Parent id [${cleanId}] does not exist in parent list!`,
      };
    }

    return { success: true, parentData: targetParent.getData() };
  };

  const getParentIdsByProjectId = (projectId) => {
    const cleanProjectId = typeof projectId === "string" ? projectId.trim() : "";

    if (cleanProjectId === "") {
      return {
        success: false,
        reason: `Invalid Project Id - Project Id must be a nonblank string!`,
      };
    }

    const targetParentIdsList = [];

    parentList.forEach((parent) => {
      if (parent.getProjectId() === cleanProjectId) {
        targetParentIdsList.push(parent.getId());
      }
    });

    return { success: true, targetParentIdsList: targetParentIdsList };
  };

  const findParentById = (cleanId) => {
    return parentList.find((parent) => parent.getId() === cleanId);
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

    if (numericDay > 31 && !thirtyDayMonths.includes(month) && numericMonth !== 2) {
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

  const reassignParentsToProject = (fromProjectId, toProjectId) => {
    const cleanFromProjectId = typeof fromProjectId === "string" ? fromProjectId.trim() : "";
    const cleanToProjectId = typeof toProjectId === "string" ? toProjectId.trim() : "";
    let changed = 0;

    if (cleanFromProjectId === "") {
      return {
        success: false,
        reason: `Invalid Current Project Id - From Project id must be a nonblank string!`,
      };
    }

    if (cleanToProjectId === "") {
      return {
        success: false,
        reason: `Invalid New Project Id - To Project id must be a nonblank string!`,
      };
    }

    if (cleanFromProjectId === cleanToProjectId) {
      return {
        success: false,
        reason: `No Change - From Project Id and To Project Id are identical!`,
      };
    }

    for (let i = 0; i < parentList.length; i++) {
      const parent = parentList[i];
      const parentProjectId = parent.getProjectId();

      if (parentProjectId === cleanFromProjectId) {
        parent.setProjectId(cleanToProjectId);
        changed += 1;
      }
    }

    return { success: true, changed: changed };
  };

  const removeParent = (id) => {
    const cleanId = typeof id === "string" ? id.trim() : "";

    if (cleanId === "") {
      return {
        success: false,
        reason: `Invalid Parent Id - Parent id must be a nonblank string!`,
      };
    }

    for (let i = 0; i < parentList.length; i++) {
      const targetParent = parentList[i];
      const targetParentId = targetParent.getId();

      if (targetParentId === cleanId) {
        parentList.splice(i, 1);
        return {
          success: true,
          removedParentId: targetParentId,
        };
      }
    }

    return {
      success: false,
      reason: `Invalid Parent Id - Parent id [${cleanId}] does not exist in parent list!`,
    };
  };

  const removeParentsOfProject = (projectId) => {
    const cleanProjectId = typeof projectId === "string" ? projectId.trim() : "";
    let removed = 0;

    if (cleanProjectId === "") {
      return {
        success: false,
        reason: `Invalid Project Id - Project id must be a nonblank string!`,
      };
    }

    for (let i = parentList.length - 1; i >= 0; i--) {
      const targetParent = parentList[i];

      if (targetParent.getProjectId() === cleanProjectId) {
        parentList.splice(i, 1);
        removed += 1;
      }
    }

    return { success: true, removed: removed };
  };

  const reset = () => {
    parentList.length = 0;
  };

  return {
    addParent,
    addHydratedParent,
    changeParentDescription,
    changeParentDueDate,
    changeParentStatus,
    changeParentProjectId,
    changeParentTitle,
    createSnapshot,
    getParent,
    getParentIdsByProjectId,
    reassignParentsToProject,
    reset,
    removeParent,
    removeParentsOfProject,
  };
};
const parentManager = createParentManager();
export { parentManager };
