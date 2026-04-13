// TRY TO BUILD THIS WITHOUT THE MODEL MANAGERS. REMEMBER SERVICE TALKS TO MODELS AND REPO
// REPO DOES NOT INTERACT WITHM MODELS

const createToDoRepository = () => {
  const exists = (key) => {
    return localStorage.getItem(key) !== null;
  };

  const save = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const load = (key) => {
    return JSON.parse(localStorage.getItem(key));
  };

  return {
    exists,
    load,
    save,
  };
};

const toDoRepository = createToDoRepository();
export { toDoRepository };
