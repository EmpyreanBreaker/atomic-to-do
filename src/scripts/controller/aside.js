import { combinedService } from "../service/combined-service";

const projectList = document.querySelector(".sidebar__project-list");

const asideFunctions = () => {
  displayProjects();
};

const displayProjects = () => {
  projectList.textContent = "";

  const projects = combinedService.buildAllHierarchy().allHierarchy;

  for (const [, projectEntry] of projects) {
    const project = projectEntry.project;

    const listItem = document.createElement("li");
    listItem.classList.add("sidebar__project-item");

    const button = document.createElement("button");
    button.classList.add("sidebar__button");
    button.dataset.id = project.id;
    button.dataset.name = project.name;
    button.textContent = project.name;

    listItem.appendChild(button);
    projectList.appendChild(listItem);
  }
};

const navigation = (displayProjectInMain) => {
  projectList.addEventListener("click", (e) => {
    const sidebarButton = e.target.closest(".sidebar__button");

    if (!sidebarButton) {
      return;
    }

    displayProjectInMain(sidebarButton.textContent);
  });
};

export { asideFunctions, navigation };
