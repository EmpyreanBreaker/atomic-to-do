const projectContainerElement = document.querySelector(".main__project-container");

const clearProjectContainer = () => {
  projectContainerElement.textContent = "";
};

const createFieldGroup = ({
  labelText,
  inputId,
  inputTag = "input",
  inputType = "text",
  inputValue = "",
  isChecked = false,
  inputClasses = [],
  dataset = {},
}) => {
  const fieldGroup = document.createElement("div");
  fieldGroup.classList.add("main__field-group");

  const fieldControl = document.createElement("div");
  fieldControl.classList.add("main__field-control");

  const fieldLabel = document.createElement("label");
  fieldLabel.classList.add("main__field-label");
  fieldLabel.textContent = labelText;
  fieldLabel.setAttribute("for", inputId);

  const fieldInput = document.createElement(inputTag);
  fieldInput.classList.add(...inputClasses, "main__editable-field");
  fieldInput.id = inputId;

  if (inputTag === "input") {
    fieldInput.type = inputType;
  }

  if (inputType === "checkbox") {
    fieldInput.checked = isChecked;
  } else {
    fieldInput.value = inputValue;
  }

  Object.entries(dataset).forEach(([key, value]) => {
    fieldInput.dataset[key] = value;
  });

  fieldControl.append(fieldLabel, fieldInput);
  fieldGroup.append(fieldControl);

  return fieldGroup;
};

const createParentCardButtons = () => {
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("main__button-container");

  const addAtomicButton = document.createElement("button");
  addAtomicButton.classList.add("main__button", "main__button--add-atomic");
  addAtomicButton.textContent = "Add Atomic Task";

  const deleteParentButton = document.createElement("button");
  deleteParentButton.classList.add("main__button", "main__button--delete-parent");
  deleteParentButton.textContent = "Delete Parent";

  buttonContainer.append(addAtomicButton, deleteParentButton);

  return buttonContainer;
};

const createAtomicCard = (atomic) => {
  const atomicCard = document.createElement("div");
  atomicCard.classList.add("main__atomic-card");
  atomicCard.dataset.atomicId = atomic.id;

  const atomicHeader = document.createElement("div");
  atomicHeader.classList.add("main__atomic-header");

  const atomicStatusGroup = createFieldGroup({
    labelText: "Status:",
    inputId: `atomic-status-${atomic.id}`,
    inputType: "checkbox",
    isChecked: atomic.status === "complete",
    inputClasses: ["main__atomic-status"],
    dataset: {
      entityType: "atomic",
      entityId: atomic.id,
      field: "status",
    },
  });

  const atomicTaskGroup = createFieldGroup({
    labelText: "Task:",
    inputId: `atomic-task-${atomic.id}`,
    inputType: "text",
    inputValue: atomic.task,
    inputClasses: ["main__atomic-task"],
    dataset: {
      entityType: "atomic",
      entityId: atomic.id,
      field: "task",
    },
  });

  const atomicDueDateGroup = createFieldGroup({
    labelText: "Due Date:",
    inputId: `atomic-due-date-${atomic.id}`,
    inputType: "date",
    inputValue: atomic.dueDate,
    inputClasses: ["main__atomic-due-date"],
    dataset: {
      entityType: "atomic",
      entityId: atomic.id,
      field: "dueDate",
    },
  });

  atomicHeader.append(atomicStatusGroup, atomicTaskGroup, atomicDueDateGroup);
  atomicCard.append(atomicHeader);

  return atomicCard;
};

const createParentCard = (parentEntry) => {
  const parent = parentEntry.parent;

  const parentCard = document.createElement("div");
  parentCard.classList.add("main__parent-card");
  parentCard.dataset.parentId = parent.id;

  const parentHeader = document.createElement("div");
  parentHeader.classList.add("main__parent-header");

  const parentBody = document.createElement("div");
  parentBody.classList.add("main__parent-body");

  const parentTitleGroup = createFieldGroup({
    labelText: "Title:",
    inputId: `parent-title-${parent.id}`,
    inputType: "text",
    inputValue: parent.title,
    inputClasses: ["main__parent-title"],
    dataset: {
      entityType: "parent",
      entityId: parent.id,
      field: "title",
    },
  });

  const parentStatusGroup = createFieldGroup({
    labelText: "Status:",
    inputId: `parent-status-${parent.id}`,
    inputType: "checkbox",
    isChecked: parent.status === "complete",
    inputClasses: ["main__parent-status"],
    dataset: {
      entityType: "parent",
      entityId: parent.id,
      field: "status",
    },
  });

  const parentDescriptionGroup = createFieldGroup({
    labelText: "Description:",
    inputId: `parent-description-${parent.id}`,
    inputTag: "textarea",
    inputValue: parent.description,
    inputClasses: ["main__parent-description"],
    dataset: {
      entityType: "parent",
      entityId: parent.id,
      field: "description",
    },
  });

  const parentDueDateGroup = createFieldGroup({
    labelText: "Due Date:",
    inputId: `parent-due-date-${parent.id}`,
    inputType: "date",
    inputValue: parent.dueDate,
    inputClasses: ["main__parent-due-date"],
    dataset: {
      entityType: "parent",
      entityId: parent.id,
      field: "dueDate",
    },
  });

  parentHeader.append(parentTitleGroup, parentStatusGroup);
  parentBody.append(parentDescriptionGroup, parentDueDateGroup);
  parentCard.append(parentHeader, parentBody);

  for (const atomic of parentEntry.atomics) {
    parentCard.append(createAtomicCard(atomic));
  }

  parentCard.append(createParentCardButtons());

  return parentCard;
};

const createProjectCard = (projectEntry) => {
  const projectCard = document.createElement("div");
  projectCard.classList.add("main__project-card");

  const projectHeader = document.createElement("div");
  projectHeader.classList.add("main__project-header");

  const projectName = document.createElement("p");
  projectName.classList.add("main__project-name");
  projectName.textContent = `PROJECT: ${projectEntry.project.name}`;

  const projectParents = document.createElement("div");
  projectParents.classList.add("main__project-parents");

  projectHeader.append(projectName);

  for (const [, parentEntry] of projectEntry.parents) {
    projectParents.append(createParentCard(parentEntry));
  }

  projectCard.append(projectHeader, projectParents);

  return projectCard;
};

const renderEditProjectForm = (currentProjectName, onRenameProjectSubmitted) => {
  const editProjectDialog = document.createElement("dialog");
  editProjectDialog.classList.add("dialog", "dialog--edit-project");

  const editProjectForm = document.createElement("form");
  editProjectForm.classList.add("dialog__form");

  const editProjectTitle = document.createElement("h2");
  editProjectTitle.classList.add("dialog__title");
  editProjectTitle.textContent = "Rename Project";

  const editProjectInputGroup = document.createElement("div");
  editProjectInputGroup.classList.add("dialog__field-group");

  const editProjectLabel = document.createElement("label");
  editProjectLabel.classList.add("dialog__field-label");
  editProjectLabel.textContent = "New Project Name:";
  editProjectLabel.setAttribute("for", "edit-project-name-input");

  const editProjectInput = document.createElement("input");
  editProjectInput.classList.add("dialog__field-input");
  editProjectInput.type = "text";
  editProjectInput.id = "edit-project-name-input";
  editProjectInput.placeholder = currentProjectName;
  editProjectInput.required = true;

  editProjectInputGroup.append(editProjectLabel, editProjectInput);

  const editProjectButtonGroup = document.createElement("div");
  editProjectButtonGroup.classList.add("dialog__button-group");

  const submitButton = document.createElement("button");
  submitButton.classList.add("dialog__button");
  submitButton.type = "submit";
  submitButton.textContent = "Rename Project";

  const cancelButton = document.createElement("button");
  cancelButton.classList.add("dialog__button");
  cancelButton.type = "button";
  cancelButton.textContent = "Cancel";

  editProjectForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const newProjectName = editProjectInput.value.trim();

    if (newProjectName === "") {
      alert("Project name cannot be blank.");
      return;
    }

    const renameResult = onRenameProjectSubmitted(currentProjectName, newProjectName);

    if (!renameResult.success) {
      alert(renameResult.reason);
      return;
    }

    editProjectDialog.close();
  });

  cancelButton.addEventListener("click", () => {
    editProjectDialog.close();
  });

  editProjectButtonGroup.append(submitButton, cancelButton);
  editProjectForm.append(editProjectTitle, editProjectInputGroup, editProjectButtonGroup);
  editProjectDialog.appendChild(editProjectForm);
  document.body.appendChild(editProjectDialog);

  editProjectDialog.addEventListener("close", () => {
    editProjectDialog.remove();
  });

  editProjectDialog.showModal();
};

const renderProjectEntries = (projectEntries) => {
  clearProjectContainer();

  for (const projectEntry of projectEntries) {
    projectContainerElement.append(createProjectCard(projectEntry));
  }

  return { success: true };
};

const renderAllProjects = (allHierarchy) => {
  const projectEntries = [];

  for (const [, projectEntry] of allHierarchy) {
    projectEntries.push(projectEntry);
  }

  return renderProjectEntries(projectEntries);
};

const renderByProjectName = (selectedProject) => {
  return renderProjectEntries([selectedProject]);
};

const renderNewProjectForm = (onCreateButtonSelected) => {
  const existingDialog = document.querySelector(".dialog--new-project");

  if (existingDialog) {
    existingDialog.showModal();
    return;
  }

  const newProjectDialog = document.createElement("dialog");
  newProjectDialog.classList.add("dialog", "dialog--new-project");

  const newProjectForm = document.createElement("form");
  newProjectForm.classList.add("dialog__form");

  const newProjectTitle = document.createElement("h2");
  newProjectTitle.classList.add("dialog__title");
  newProjectTitle.textContent = "Create New Project";

  const newProjectInputGroup = document.createElement("div");
  newProjectInputGroup.classList.add("dialog__field-group");

  const newProjectLabel = document.createElement("label");
  newProjectLabel.classList.add("dialog__field-label");
  newProjectLabel.textContent = "Project Name:";
  newProjectLabel.setAttribute("for", "new-project-name-input");

  const newProjectInput = document.createElement("input");
  newProjectInput.classList.add("dialog__field-input");
  newProjectInput.type = "text";
  newProjectInput.id = "new-project-name-input";
  newProjectInput.required = true;

  const newProjectButtonGroup = document.createElement("div");
  newProjectButtonGroup.classList.add("dialog__button-group");

  const createButton = document.createElement("button");
  createButton.classList.add("dialog__button");
  createButton.type = "submit";
  createButton.textContent = "Add New Project";

  const cancelButton = document.createElement("button");
  cancelButton.classList.add("dialog__button");
  cancelButton.type = "button";
  cancelButton.textContent = "Cancel";

  newProjectForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const projectName = newProjectInput.value.trim();
    const creationResult = onCreateButtonSelected(projectName);

    if (!creationResult.success) {
      alert(creationResult.reason);
      return;
    }

    newProjectDialog.close();
  });

  cancelButton.addEventListener("click", () => {
    newProjectDialog.close();
  });

  newProjectInputGroup.append(newProjectLabel, newProjectInput);
  newProjectButtonGroup.append(createButton, cancelButton);
  newProjectForm.append(newProjectTitle, newProjectInputGroup, newProjectButtonGroup);
  newProjectDialog.append(newProjectForm);
  document.body.append(newProjectDialog);

  newProjectDialog.addEventListener("close", () => {
    newProjectDialog.remove();
  });

  newProjectDialog.showModal();
  newProjectInput.focus();
};

export { renderAllProjects, renderByProjectName, renderEditProjectForm, renderNewProjectForm };
