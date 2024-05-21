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
    const taskNameEl = taskEl.querySelector('.task-name');
    taskNameEl.textContent = task.name;

    // Add event listeners
    const deleteButton = taskEl.querySelector('.delete-button');
    deleteButton.addEventListener('click', removeTask);
    const checkboxButton = taskEl.querySelector('.checkbox-button');
    checkboxButton.addEventListener('click', toggleTask);

    elements.todoUl.append(taskEl);
};

const addTask = (evt) => {
    const name = elements.nameInput.value;
    if (name) {
        const task = new Task(name);
        tasks.set(task.id, task);
        addTaskEl(task);
    } else {
        alert('Der Aufgabenname darf nicht leer sein.');
    }
}

const removeTask = (evt) => {
    const taskEl = evt.currentTarget.closest('.task');
    const task_id = Number(taskEl.getAttribute('data-task-id'));
    
    tasks.delete(task_id);
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