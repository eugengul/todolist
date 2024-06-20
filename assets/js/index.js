'use strict';

// KONSTANTEN / VARIABLEN
const elements = {};
const priorityClassesMap = new Map([
    [0, "priority-low"],
    [1, "priority-medium"],
    [2, "priority-high"]
]);

// FUNKTIONEN
const domMapping = () => {
    // Auth
    elements.authBlock = document.querySelector('#auth');
    elements.loginForm = document.querySelector('#login-form');
    elements.loginError = document.querySelector('#login-error');
    elements.loginButton = document.querySelector('#login-button');
    elements.signUpButton = document.querySelector('#signup-button');
    elements.logoutButton = document.querySelector('#logout-button');
    elements.userInfo = document.querySelector('#user-info');

    // Sync
    elements.syncButton = document.querySelector('#sync-button');

    // Tasks
    elements.addButton = document.querySelector('#add-task-form .add-button');
    elements.taskTemplate = document.querySelector('#task-template');
    elements.prioritySelect = document.querySelector('#add-task-form .priority-select');
    elements.deleteCompletedButton = document.querySelector('#delete-completed');
    elements.nameInput = document.querySelector('#add-task-form input[name="name"]');
    elements.dueDateInput = document.querySelector('#add-task-form input[name="due-date"]');
    elements.todoUl = document.querySelector('.todo-list');
}

const initializeEditForm = (taskEl, task) => {
    // set values for input elements
    const nameInput = taskEl.querySelector('.task-edit input[name=name]');
    nameInput.value = task.name;
    const prioritySelect = taskEl.querySelector('.task-edit select[name=priority]');
    prioritySelect.value = task.priority;
    const dateInput = taskEl.querySelector('.task-edit input[name=due-date]');
    if (task.dueDate) dateInput.value = task.dueDate;

    // Add event listener on save button
    const saveButton = taskEl.querySelector('submit.save-button');
    saveButton.addEventListener('click', saveTaskHandler);
}

const addEventListenersToTask = (taskEl) => {
    const deleteButton = taskEl.querySelector('.delete-button');
    deleteButton.addEventListener('click', removeTaskHandler);
    const checkboxButton = taskEl.querySelector('.checkbox-button');
    checkboxButton.addEventListener('click', toggleTaskHandler);
    const editButton = taskEl.querySelector('.edit-button');
    editButton.addEventListener('click', editTaskHandler);
}

const addTaskEl = (task) => {
    const taskTemplateClone = elements.taskTemplate.content.cloneNode(true)
    const taskEl = taskTemplateClone.querySelector('.task');

    taskEl.setAttribute('data-task-id', task.id);
    if (task.completed) taskEl.classList.add('completed');

    // Add class for task priority
    const priorityClass = priorityClassesMap.get(task.priority);
    taskEl.classList.add(priorityClass);

    const taskNameEl = taskEl.querySelector('.task-name');
    taskNameEl.textContent = task.name;

    // due date has different colors for future, past and today
    if (task.dueDate) {
        const currentDate = dateToMilliseconds(new Date());
        let dueDate = dateToMilliseconds(new Date(task.dueDate));
        const dueDateEl = taskEl.querySelector('.due-date');
        if (currentDate > dueDate) {
            dueDateEl.classList.add('failed');
        } else if (currentDate == dueDate) {
            dueDateEl.classList.add('today')
        }
        dueDateEl.textContent = new Date(task.dueDate).toDateString();
    }

    initializeEditForm(taskEl, task);

    addEventListenersToTask(taskEl);

    elements.todoUl.append(taskEl);
};

const cleanTaskList = () => {
    elements.todoUl.innerHTML = '';
}

const reloadTaskList = () => {
    cleanTaskList();
    const SortedTasks = sortTasksByCompletion();
    for (const task of SortedTasks.values()) {
        addTaskEl(task);
    }
}

const updateAuthBlock = (err) => {
    if (auth.accessToken) {
        // If user logged in hide form and show user info
        elements.authBlock.classList.add('logged-in');
        const userNameEl = elements.userInfo.querySelector('#user-name');
        elements.loginForm.reset();
        userNameEl.textContent = localStorage.getItem('username');
    } else {
        // otherwise show form
        elements.authBlock.classList.remove('logged-in');
        elements.loginButton.disabled = false;
        elements.signUpButton.disabled = false;
        elements.loginError.textContent = err;
    }
}

const appendEventlisteners = () => {
    // Auth
    elements.loginButton.addEventListener('click', loginHandler);
    elements.signUpButton.addEventListener('click', signUpHandler);
    elements.logoutButton.addEventListener('click', logoutHandler);

    // Sync
    elements.syncButton.addEventListener('click', syncHandler);

    // Tasks
    elements.addButton.addEventListener('click', addTaskHandler);
    elements.deleteCompletedButton.addEventListener('click', deleteCompletedHandler);
}

const init = () => {
    domMapping();
    appendEventlisteners();
    reloadTaskList();
    updateAuthBlock();
}

// INIT
init();