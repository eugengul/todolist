'use strict';

// KONSTANTEN / VARIABLEN
const elements = {};
let tasks = [];

// FUNKTIONEN
const domMapping = () => {
    elements.addButton = document.querySelector('.add-button');
    elements.nameInput = document.querySelector('.add-task input[name="name"]');
    elements.todoUl = document.querySelector('.todo-list');
}

const addTaskEl = (name) => {
    const taskTemplate = document.querySelector('#task-template');
    const taskEl = taskTemplate.content.cloneNode(true);
    const taskNameEl = taskEl.querySelector('.task-name');
    taskNameEl.textContent = name;
    // Add delete task event listener
    const deleteButton = taskEl.querySelector('.delete-button');
    deleteButton.addEventListener('click', removeTask);
    // Add toggle task event listener
    const checkboxButton = taskEl.querySelector('.checkbox-button');
    checkboxButton.addEventListener('click', toggleTask);

    elements.todoUl.append(taskEl);
};

const addTask = (evt) => {
    const name = elements.nameInput.value;
    if (name) {
        addTaskEl(name);
    } else {
        alert('Der Aufgabenname darf nicht leer sein.');
    }
    
}

const removeTask = (evt) => {
    const taskEl = evt.currentTarget.closest('.task');
    taskEl.remove();
}

const toggleTask = (evt) => {
    const taskEl = evt.currentTarget.closest('.task');
    taskEl.classList.toggle('completed')
}

const appendEventlisteners = () => {
    elements.addButton.addEventListener('click', addTask);
}

const init = () => {
    domMapping();
    appendEventlisteners();
}

// INIT
init();