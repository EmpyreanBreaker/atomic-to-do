const projectContainerElement = document.querySelector(".main__project-container");

const renderToDosByProjectName = (projectName, allHierarchy) => {
  projectContainerElement.textContent = "";
  console.log(projectName);

  if (projectName === "All") {
    renderAllProjects(allHierarchy);
    return { success: true };
  }

  projectContainerElement.textContent = `Selected Project: ${projectName}`;
  return { success: true };
};

const renderAllProjects = (allHierarchy) => {
  projectContainerElement.textContent = "";

  for (const [, outerValue] of allHierarchy) {
    const project = outerValue.project;

    const projectCard = document.createElement("div");
    projectCard.classList.add("main__project-card");

    const projectHeader = document.createElement("div");
    projectHeader.classList.add("main__project-header");

    const projectName = document.createElement("p");
    projectName.classList.add("main__project-name");
    projectName.textContent = `PROJECT: ${project.name}`;

    projectHeader.append(projectName);

    const projectParents = document.createElement("div");
    projectParents.classList.add("main__project-parents");

    for (const [, innerValue] of outerValue.parents) {
      const parent = innerValue.parent;

      const parentCard = document.createElement("div");
      parentCard.classList.add("main__parent-card");
      parentCard.dataset.parentId = parent.id;

      const parentHeader = document.createElement("div");
      parentHeader.classList.add("main__parent-header");

      const parentBody = document.createElement("div");
      parentBody.classList.add("main__parent-body");

      const parentTitleGroup = document.createElement("div");
      parentTitleGroup.classList.add("main__field-group");

      const parentTitleLabelInputContainer = document.createElement("div");
      parentTitleLabelInputContainer.classList.add("main__field-input-container");

      const parentTitleLabel = document.createElement("label");
      parentTitleLabel.classList.add("main__field-label");
      parentTitleLabel.textContent = "Title:";
      parentTitleLabel.setAttribute("for", `parent-title-${parent.id}`);

      const parentTitleInput = document.createElement("input");
      parentTitleInput.classList.add("main__parent-title", "main__editable-field");
      parentTitleInput.type = "text";
      parentTitleInput.id = `parent-title-${parent.id}`;
      parentTitleInput.value = parent.title;
      parentTitleInput.dataset.entityType = "parent";
      parentTitleInput.dataset.entityId = parent.id;
      parentTitleInput.dataset.field = "title";

      parentTitleLabelInputContainer.append(parentTitleLabel, parentTitleInput);
      parentTitleGroup.append(parentTitleLabelInputContainer);

      const parentStatusGroup = document.createElement("div");
      parentStatusGroup.classList.add("main__field-group");

      const parentStatusLabelInputContainer = document.createElement("div");
      parentStatusLabelInputContainer.classList.add("main__field-input-container");

      const parentStatusLabel = document.createElement("label");
      parentStatusLabel.classList.add("main__field-label");
      parentStatusLabel.textContent = "Status:";
      parentStatusLabel.setAttribute("for", `parent-status-${parent.id}`);

      const parentStatusInput = document.createElement("input");
      parentStatusInput.classList.add("main__parent-status", "main__editable-field");
      parentStatusInput.type = "checkbox";
      parentStatusInput.id = `parent-status-${parent.id}`;
      parentStatusInput.checked = parent.status === "complete";
      parentStatusInput.dataset.entityType = "parent";
      parentStatusInput.dataset.entityId = parent.id;
      parentStatusInput.dataset.field = "status";

      parentStatusLabelInputContainer.append(parentStatusLabel, parentStatusInput);
      parentStatusGroup.append(parentStatusLabelInputContainer);

      const parentDescriptionGroup = document.createElement("div");
      parentDescriptionGroup.classList.add("main__field-group");

      const parentDescriptionLabelInputContainer = document.createElement("div");
      parentDescriptionLabelInputContainer.classList.add("main__field-label-container");

      const parentDescriptionLabel = document.createElement("label");
      parentDescriptionLabel.classList.add("main__field-label");
      parentDescriptionLabel.textContent = "Description:";
      parentDescriptionLabel.setAttribute("for", `parent-description-${parent.id}`);

      const parentDescriptionInput = document.createElement("textarea");
      parentDescriptionInput.classList.add("main__parent-description", "main__editable-field");
      parentDescriptionInput.id = `parent-description-${parent.id}`;
      parentDescriptionInput.value = parent.description;
      parentDescriptionInput.dataset.entityType = "parent";
      parentDescriptionInput.dataset.entityId = parent.id;
      parentDescriptionInput.dataset.field = "description";

      parentDescriptionLabelInputContainer.append(parentDescriptionLabel, parentDescriptionInput);
      parentDescriptionGroup.append(parentDescriptionLabelInputContainer);

      const parentDueDateGroup = document.createElement("div");
      parentDueDateGroup.classList.add("main__field-group");

      const parentDueDateLabelInputContainer = document.createElement("div");
      parentDueDateLabelInputContainer.classList.add("main__field-label-container");

      const parentDueDateLabel = document.createElement("label");
      parentDueDateLabel.classList.add("main__field-label");
      parentDueDateLabel.textContent = "Due Date:";
      parentDueDateLabel.setAttribute("for", `parent-due-date-${parent.id}`);

      const parentDueDateInput = document.createElement("input");
      parentDueDateInput.classList.add("main__parent-due-date", "main__editable-field");
      parentDueDateInput.type = "date";
      parentDueDateInput.id = `parent-due-date-${parent.id}`;
      parentDueDateInput.value = parent.dueDate;
      parentDueDateInput.dataset.entityType = "parent";
      parentDueDateInput.dataset.entityId = parent.id;
      parentDueDateInput.dataset.field = "dueDate";

      parentDueDateLabelInputContainer.append(parentDueDateLabel, parentDueDateInput);
      parentDueDateGroup.append(parentDueDateLabelInputContainer);

      parentHeader.append(parentTitleGroup, parentStatusGroup);
      parentBody.append(parentDescriptionGroup, parentDueDateGroup);
      parentCard.append(parentHeader, parentBody);
      projectParents.append(parentCard);

      for (const atomic of innerValue.atomics) {
        const atomicCard = document.createElement("div");
        atomicCard.classList.add("main__atomic-card");
        atomicCard.dataset.atomicId = atomic.id;

        const atomicHeader = document.createElement("div");
        atomicHeader.classList.add("main__atomic-header");

        const atomicStatusGroup = document.createElement("div");
        atomicStatusGroup.classList.add("main__field-group");

        const atomicStatusLabelInputContainer = document.createElement("div");
        atomicStatusLabelInputContainer.classList.add("main__field-label-container");

        const atomicStatusLabel = document.createElement("label");
        atomicStatusLabel.classList.add("main__field-label");
        atomicStatusLabel.textContent = "Status:";
        atomicStatusLabel.setAttribute("for", `atomic-status-${atomic.id}`);

        const atomicStatusInput = document.createElement("input");
        atomicStatusInput.classList.add("main__atomic-status", "main__editable-field");
        atomicStatusInput.type = "checkbox";
        atomicStatusInput.id = `atomic-status-${atomic.id}`;
        atomicStatusInput.checked = atomic.status === "complete";
        atomicStatusInput.dataset.entityType = "atomic";
        atomicStatusInput.dataset.entityId = atomic.id;
        atomicStatusInput.dataset.field = "status";

        atomicStatusLabelInputContainer.append(atomicStatusLabel, atomicStatusInput);
        atomicStatusGroup.append(atomicStatusLabelInputContainer);

        const atomicTaskGroup = document.createElement("div");
        atomicTaskGroup.classList.add("main__field-group");

        const atomicTaskLabelInputContainer = document.createElement("div");
        atomicTaskLabelInputContainer.classList.add("main__field-label-container");

        const atomicTaskLabel = document.createElement("label");
        atomicTaskLabel.classList.add("main__field-label");
        atomicTaskLabel.textContent = "Task:";
        atomicTaskLabel.setAttribute("for", `atomic-task-${atomic.id}`);

        const atomicTaskInput = document.createElement("input");
        atomicTaskInput.classList.add("main__atomic-task", "main__editable-field");
        atomicTaskInput.type = "text";
        atomicTaskInput.id = `atomic-task-${atomic.id}`;
        atomicTaskInput.value = atomic.task;
        atomicTaskInput.dataset.entityType = "atomic";
        atomicTaskInput.dataset.entityId = atomic.id;
        atomicTaskInput.dataset.field = "task";

        atomicTaskLabelInputContainer.append(atomicTaskLabel, atomicTaskInput);
        atomicTaskGroup.append(atomicTaskLabelInputContainer);

        const atomicDueDateGroup = document.createElement("div");
        atomicDueDateGroup.classList.add("main__field-group");

        const atomicDueDateLabelInputContainer = document.createElement("div");
        atomicDueDateLabelInputContainer.classList.add("main__field-label-container");

        const atomicDueDateLabel = document.createElement("label");
        atomicDueDateLabel.classList.add("main__field-label");
        atomicDueDateLabel.textContent = "Due Date:";
        atomicDueDateLabel.setAttribute("for", `atomic-due-date-${atomic.id}`);

        const atomicDueDateInput = document.createElement("input");
        atomicDueDateInput.classList.add("main__atomic-due-date", "main__editable-field");
        atomicDueDateInput.type = "date";
        atomicDueDateInput.id = `atomic-due-date-${atomic.id}`;
        atomicDueDateInput.value = atomic.dueDate;
        atomicDueDateInput.dataset.entityType = "atomic";
        atomicDueDateInput.dataset.entityId = atomic.id;
        atomicDueDateInput.dataset.field = "dueDate";

        atomicDueDateLabelInputContainer.append(atomicDueDateLabel, atomicDueDateInput);
        atomicDueDateGroup.append(atomicDueDateLabelInputContainer);

        atomicHeader.append(atomicStatusGroup, atomicTaskGroup, atomicDueDateGroup);
        atomicCard.append(atomicHeader);
        parentCard.append(atomicCard);
      }

      const buttonContainer = document.createElement("div");
      buttonContainer.classList.add("main__button-container");

      const addAtomic = document.createElement("button");
      addAtomic.classList.add("main__button", "main__button-addAtomic");
      addAtomic.textContent = "Add Atomic Task";

      const deleteParent = document.createElement("button");
      deleteParent.classList.add("main__button", "main__button-deleteParent");
      deleteParent.textContent = "Delete Parent";

      buttonContainer.append(addAtomic, deleteParent);
      parentCard.append(buttonContainer);
    }

    projectCard.append(projectHeader, projectParents);
    projectContainerElement.append(projectCard);
  }
};

export { renderToDosByProjectName, renderAllProjects };
