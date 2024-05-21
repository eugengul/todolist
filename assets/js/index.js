'use strict';

// KONSTANTEN / VARIABLEN
const elements = {};

// FUNKTIONEN
const domMapping = () => {
    elements.addButton = document.querySelector('.add-button');
    elements.nameInput = document.querySelector('.add-task input[name="name"]');
    elements.todoUl = document.querySelector('.todo-list');
}

const addTaskEl = (task) => {
    const taskTemplate = document.querySelector('#task-template');
    const taskTemplateClone = taskTemplate.content.cloneNode(true)
    const taskEl = taskTemplateClone.querySelector('.task');

    taskEl.setAttribute('data-task-id', task.id);
    if (task.finished) taskEl.classList.add('completed');
    const taskNameEl = taskEl.querySelector('.task-name');
    taskNameEl.textContent = task.name;

    // Add event listeners
    const deleteButton = taskEl.querySelector('.delete-button');
    deleteButton.addEventListener('click', removeTaskHandler);
    const checkboxButton = taskEl.querySelector('.checkbox-button');
    checkboxButton.addEventListener('click', toggleTaskHandler);

    elements.todoUl.append(taskEl);
};

const reloadTaskList = () => {
    for (const task of tasks.values()) {
        addTaskEl(task);
    }
}

// EVENT HANDLERS
const addTaskHandler = (evt) => {
    const name = elements.nameInput.value;
    if (name) {
        let task = createTask(name)
        addTaskEl(task);
    } else {
        alert('Der Aufgabenname darf nicht leer sein.');
    }
}

const removeTaskHandler = (evt) => {
    const taskEl = evt.currentTarget.closest('.task');
    const task_id = taskEl.getAttribute('data-task-id');

    deleteTask(task_id);
    taskEl.remove();
}

const toggleTaskHandler = (evt) => {
    const taskEl = evt.currentTarget.closest('.task');
    taskEl.classList.toggle('completed')

    const task_id = taskEl.getAttribute('data-task-id');
    toggleTask(task_id);
}

const appendEventlisteners = () => {
    elements.addButton.addEventListener('click', addTaskHandler);
}

const init = () => {
    domMapping();
    appendEventlisteners();
    reloadTaskList();
}

// INIT
init();