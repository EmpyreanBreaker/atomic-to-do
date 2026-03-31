// This function creates and manipulates parent objects
const parent = () => {
  // Private fields
  let id = "";
  let projectId = "";
  let title = "";
  let description = "";
  let dueDate = "";
  let status = "";

  const create = (
    newProjectId,
    newTitle,
    newDescription,
    newStatus = "incomplete",
    newDueDate,
  ) => {
    id = crypto.randomUUID();
    projectId = newProjectId;
    title = newTitle;
    description = newDescription;
    dueDate = newDueDate;
    status = newStatus;
  };

  const getData = () => {
    return {
      id,
      projectId,
      title,
      description,
      dueDate,
      status,
    };
  };

  const getDescription = () => {
    return description;
  };

  const getDueDate = () => {
    return dueDate;
  };

  const getId = () => {
    return id;
  };

  const getProjectId = () => {
    return projectId;
  };

  const getStatus = () => {
    return status;
  };

  const getTitle = () => {
    return title;
  };

  const hydrate = (parsedData) => {
    id = parsedData.id;
    projectId = parsedData.projectId;
    title = parsedData.title;
    description = parsedData.description;
    dueDate = parsedData.dueDate;
    status = parsedData.status;
  };

  const remove = () => {
    id = null;
    projectId = null;
    title = null;
    description = null;
    dueDate = null;
    status = null;
  };

  const setDescription = (newDescription) => {
    description = newDescription;
  };

  const setDueDate = (newDueDate) => {
    dueDate = newDueDate;
  };

  const setProjectId = (newProjectId) => {
    projectId = newProjectId;
  };

  const setStatus = (newStatus) => {
    status = newStatus;
  };

  const setTitle = (newTitle) => {
    title = newTitle;
  };

  return {
    create,
    getData,
    getDescription,
    getDueDate,
    getId,
    getProjectId,
    getStatus,
    getTitle,
    hydrate,
    remove,
    setDescription,
    setDueDate,
    setProjectId,
    setStatus,
    setTitle,
  };
};

export { parent };
