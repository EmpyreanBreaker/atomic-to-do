const main = document.querySelector(".main");

const displayProjectInMain = (projectName) => {
  main.innerHTML = "";
  main.textContent = projectName;
};

export { displayProjectInMain };
