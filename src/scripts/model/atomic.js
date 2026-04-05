const atomic = () => {
  // Private fields
  let id = "";
  let parentId = "";
  let task = "";
  let dueDate = "";
  let status = "";

  const create = (newParentId, newTask, newDueDate, newStatus = "incomplete") => {
    id = crypto.randomUUID();
    parentId = newParentId;
    task = newTask;
    dueDate = newDueDate;
    status = newStatus;
  };

  const getData = () => {
    return {
      id,
      parentId,
      task,
      dueDate,
      status,
    };
  };

  const getDueDate = () => {
    return dueDate;
  };

  const getId = () => {
    return id;
  };

  const getParentId = () => {
    return parentId;
  };

  const getStatus = () => {
    return status;
  };

  const getTask = () => {
    return task;
  };

  const hydrate = (parsedData) => {
    id = parsedData.id;
    parentId = parsedData.parentId;
    task = parsedData.task;
    dueDate = parsedData.dueDate;
    status = parsedData.status;
  };

  const remove = () => {
    id = null;
    parentId = null;
    task = null;
    dueDate = null;
    status = null;
  };

  const setDueDate = (newDueDate) => {
    dueDate = newDueDate;
  };

  const setParentId = (newParentId) => {
    parentId = newParentId;
  };

  const setStatus = (newStatus) => {
    status = newStatus;
  };

  const setTask = (newTask) => {
    task = newTask;
  };

  return {
    create,
    getData,
    getDueDate,
    getId,
    getParentId,
    getStatus,
    getTask,
    hydrate,
    remove,
    setDueDate,
    setParentId,
    setStatus,
    setTask,
  };
};

export { atomic };
