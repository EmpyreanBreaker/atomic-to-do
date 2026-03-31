// This function creates and manipulates project objects
const project = () => {
  // Private fields
  let id = "";
  let name = "";

  const create = (newName) => {
    id = crypto.randomUUID();
    name = newName;
  };

  const getData = () => {
    return { id, name };
  };

  const getId = () => {
    return id;
  };

  const getName = () => {
    return name;
  };

  const hydrate = (parsedData) => {
    id = parsedData.id;
    name = parsedData.name;
  };

  const remove = () => {
    id = null;
    name = null;
  };
  
  const setName = (newName) => {
    name = newName;
  };

  // Use closure to interact with local variables
  return {
    create,
    getData,
    getId,
    getName,
    hydrate,
    remove,
    setName,
  };
};

export { project };
