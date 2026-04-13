import { atomic } from "./atomic.js";

const createAtomicManager = () => {
  const atomicList = [];

  const addAtomic = (newParentId, newTask = "", newDueDate = "", newStatus = "incomplete") => {
    const cleanParentId = typeof newParentId === "string" ? newParentId.trim() : "";
    const cleanTask = typeof newTask === "string" ? newTask.trim() : "";
    const normalizedDueDate = normalizeDueDate(newDueDate);
    let cleanStatus = typeof newStatus === "string" ? newStatus.trim() : "";

    if (cleanParentId === "") {
      return {
        success: false,
        reason: `Invalid Parent Id - Parent id must be a nonblank string!`,
      };
    }

    if (cleanTask === "") {
      return {
        success: false,
        reason: `Invalid Task - Task must be a nonblank string!`,
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

    const newAtomic = atomic();
    newAtomic.create(cleanParentId, cleanTask, normalizedDueDate.date, cleanStatus);
    atomicList.push(newAtomic);

    return { success: true, atomicData: newAtomic.getData() };
  };

  const addHydratedAtomic = (parsedData) => {
    if (!parsedData || typeof parsedData !== "object") {
      return {
        success: false,
        reason: `Data Error - Stored atomic data must be a valid object!`,
      };
    }

    const cleanId = typeof parsedData.id === "string" ? parsedData.id.trim() : "";
    const cleanParentId = typeof parsedData.parentId === "string" ? parsedData.parentId.trim() : "";
    const cleanTask = typeof parsedData.task === "string" ? parsedData.task.trim() : "";
    const normalizedDueDate = normalizeDueDate(parsedData.dueDate);
    let cleanStatus = typeof parsedData.status === "string" ? parsedData.status.trim() : "";

    if (cleanId === "") {
      return {
        success: false,
        reason: `Data Error - Stored atomic id must be a nonblank string!`,
      };
    }

    if (cleanParentId === "") {
      return {
        success: false,
        reason: `Data Error - Stored parent id must be a nonblank string!`,
      };
    }

    if (cleanTask === "") {
      return {
        success: false,
        reason: `Data Error - Stored task must be a nonblank string!`,
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

    if (atomicExists(cleanId)) {
      return {
        success: false,
        reason: `Data Error - Atomic id [${cleanId}] already exists in atomic list!`,
      };
    }

    const restoredAtomic = atomic();
    restoredAtomic.hydrate({
      id: cleanId,
      parentId: cleanParentId,
      task: cleanTask,
      dueDate: normalizedDueDate.date,
      status: cleanStatus,
    });

    atomicList.push(restoredAtomic);
    return { success: true, atomicData: restoredAtomic.getData() };
  };

  const atomicExists = (id) => {
    return atomicList.some((atomic) => atomic.getId() === id);
  };

  const changeAtomicDueDate = (id, newDueDate) => {
    const cleanId = typeof id === "string" ? id.trim() : "";
    const normalizedDueDate = normalizeDueDate(newDueDate);

    if (cleanId === "") {
      return {
        success: false,
        reason: `Invalid Atomic Id - Atomic id must be a nonblank string!`,
      };
    }

    if (!normalizedDueDate.success) {
      return {
        success: false,
        reason: normalizedDueDate.reason,
      };
    }

    const targetAtomic = findAtomicById(cleanId);

    if (!targetAtomic) {
      return {
        success: false,
        reason: `Invalid Atomic Id - Atomic id [${cleanId}] does not exist in atomic list!`,
      };
    }

    targetAtomic.setDueDate(normalizedDueDate.date);
    return { success: true, dueDate: targetAtomic.getDueDate() };
  };

  const changeAtomicParentId = (id, newParentId) => {
    const cleanId = typeof id === "string" ? id.trim() : "";
    const cleanParentId = typeof newParentId === "string" ? newParentId.trim() : "";

    if (cleanId === "") {
      return {
        success: false,
        reason: `Invalid Atomic Id - Atomic id must be a nonblank string!`,
      };
    }

    if (cleanParentId === "") {
      return {
        success: false,
        reason: `Invalid Parent Id - Parent id must be a nonblank string!`,
      };
    }

    const targetAtomic = findAtomicById(cleanId);

    if (!targetAtomic) {
      return {
        success: false,
        reason: `Invalid Atomic Id - Atomic id [${cleanId}] does not exist in atomic list!`,
      };
    }

    targetAtomic.setParentId(cleanParentId);
    return { success: true, parentId: targetAtomic.getParentId() };
  };

  const changeAtomicStatus = (id) => {
    const cleanId = typeof id === "string" ? id.trim() : "";

    if (cleanId === "") {
      return {
        success: false,
        reason: `Invalid Atomic Id - Atomic id must be a nonblank string!`,
      };
    }

    const targetAtomic = findAtomicById(cleanId);

    if (!targetAtomic) {
      return {
        success: false,
        reason: `Invalid Atomic Id - Atomic id [${cleanId}] does not exist in atomic list!`,
      };
    }

    if (targetAtomic.getStatus() === "incomplete") {
      targetAtomic.setStatus("complete");
    } else {
      targetAtomic.setStatus("incomplete");
    }

    return { success: true, status: targetAtomic.getStatus() };
  };

  const changeAtomicTask = (id, newTask) => {
    const cleanId = typeof id === "string" ? id.trim() : "";
    const cleanTask = typeof newTask === "string" ? newTask.trim() : "";

    if (cleanId === "") {
      return {
        success: false,
        reason: `Invalid Atomic Id - Atomic id must be a nonblank string!`,
      };
    }

    if (cleanTask === "") {
      return {
        success: false,
        reason: `Invalid Task - Task must be a nonblank string!`,
      };
    }

    const targetAtomic = findAtomicById(cleanId);

    if (!targetAtomic) {
      return {
        success: false,
        reason: `Invalid Atomic Id - Atomic id [${cleanId}] does not exist in atomic list!`,
      };
    }

    targetAtomic.setTask(cleanTask);
    return { success: true, task: targetAtomic.getTask() };
  };

  const createSnapshot = () => {
    return atomicList.map((atomic) => atomic.getData());
  };

  const findAtomicById = (id) => {
    return atomicList.find((atomic) => atomic.getId() === id);
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

  const removeAtomic = (id) => {
    const cleanId = typeof id === "string" ? id.trim() : "";

    if (cleanId === "") {
      return {
        success: false,
        reason: `Invalid Atomic Id - Atomic id must be a nonblank string!`,
      };
    }

    for (let i = 0; i < atomicList.length; i++) {
      const targetAtomic = atomicList[i];
      const targetAtomicId = targetAtomic.getId();

      if (targetAtomicId === cleanId) {
        atomicList.splice(i, 1);

        return {
          success: true,
          removedAtomicId: targetAtomicId,
        };
      }
    }

    return {
      success: false,
      reason: `Invalid Atomic Id - Atomic id [${cleanId}] does not exist in atomic list!`,
    };
  };

  const removeAtomicsOfParent = (parentId) => {
    const cleanParentId = typeof parentId === "string" ? parentId.trim() : "";
    let removed = 0;

    if (cleanParentId === "") {
      return {
        success: false,
        reason: `Invalid Parent Id - Parent id must be a nonblank string!`,
      };
    }

    for (let i = atomicList.length - 1; i >= 0; i--) {
      const targetAtomic = atomicList[i];

      if (targetAtomic.getParentId() === cleanParentId) {
        atomicList.splice(i, 1);
        removed += 1;
      }
    }

    return { success: true, removed };
  };

  const reset = () => {
    atomicList.length = 0;
  };

  return {
    addAtomic,
    addHydratedAtomic,
    changeAtomicDueDate,
    changeAtomicParentId,
    changeAtomicStatus,
    changeAtomicTask,
    createSnapshot,
    removeAtomic,
    removeAtomicsOfParent,
    reset,
  };
};

const atomicManager = createAtomicManager();
export { atomicManager };