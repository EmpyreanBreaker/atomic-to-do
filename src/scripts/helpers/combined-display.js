import { atomicToDoManager } from "./atomic-to-do.js";
import { parentToDoManager } from "./parent-to-do.js";
import { projectManager } from "./project.js";

const createCombinedToDoManager = () => {
  // Private Fields
  let atomicArray = [];
  let parentArray = [];
  let projectArray = [];

  const displayParentAndAtomicTodos = () => {
    refreshDeepCopies();
    // Build Lookup Map: parentId -> array of atomic to-dos
    const atomicToDoByParentIdMap = new Map();

    for (const atomic of atomicArray) {
      const parentId = atomic.atomicParentId;
      if (!atomicToDoByParentIdMap.has(parentId)) {
        atomicToDoByParentIdMap.set(parentId, []);
      }
      atomicToDoByParentIdMap.get(parentId).push(atomic);
    }

    // Display: For each parent, fetch atomic from lookup
    for (const parent of parentArray) {
      const parentId = parent.testParentId;
      console.log(`Parent ID: ${parentId}`);
      console.table([parent]);

      const atomicChildrenForThisParent =
        atomicToDoByParentIdMap.get(parentId) || [];
      console.table(atomicChildrenForThisParent);
    }
  };

  const displayProjectWithAllToDos = () => {
    refreshDeepCopies();
    // Build Lookup Map: projectName -> Map (parentId -> array of atomic to-dos)
    const allToDosByProjectNameMap = new Map();
    // 1) Make sure every project exists as a key
    for (const project of projectArray) {
      allToDosByProjectNameMap.set(project.projectName, new Map());
    }
    // 2) Seed parents (so parents with 0 children still show up)
    for (const parent of parentArray) {
      const projectName = parent.parentCategory;
      const parentId = parent.testParentId;

      if (!allToDosByProjectNameMap.has(projectName)) {
        allToDosByProjectNameMap.set(projectName, new Map());
      }

      const innerMap = allToDosByProjectNameMap.get(projectName);
      if (!innerMap.has(parentId)) {
        innerMap.set(parentId, []);
      }
    }
    // 3) Add Atomic children
    for (const atomic of atomicArray) {
      const projectName = atomic.atomicParentCategory;
      const parentId = atomic.atomicParentId;

      if (!allToDosByProjectNameMap.has(projectName)) {
        allToDosByProjectNameMap.set(projectName, new Map());
      }

      const innerMap = allToDosByProjectNameMap.get(projectName);
      if (!innerMap.has(parentId)) {
        innerMap.set(parentId, []);
      }
      innerMap.get(parentId).push(atomic);
    }

    // Display
    for (const project of projectArray) {
      // Project
      const projectName = project.projectName;
      console.log(`Project Tab: ${projectName}`);
      console.table([project]);

      const innerMap = allToDosByProjectNameMap.get(projectName) || new Map();
      const parentForThisProject = parentArray.filter(
        (p) => p.parentCategory === projectName,
      );

      for (const parent of parentForThisProject) {
        const parentId = parent.testParentId;
        console.log(`Parent ID: ${parentId}`);
        console.table([parent]);
        console.table(innerMap.get() || []);
      }
    }
  };

  const refreshDeepCopies = () => {
    atomicArray = atomicToDoManager.createAtomicManagerArrayDeepCopy();
    parentArray = parentToDoManager.createParentManagerArrayDeepCopy();
    projectArray = projectManager.createProjectManagerArrayDeepCopy();
  };

  return { displayParentAndAtomicTodos, displayProjectWithAllToDos };
};

const combinedToDoManager = createCombinedToDoManager();

export { combinedToDoManager };
