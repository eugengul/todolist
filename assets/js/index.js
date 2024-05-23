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
    elements.addButton = document.querySelector('.add-button');
    elements.prioritySelect = document.querySelector('.add-task .priority-select');
    elements.deleteCompletedButton = document.querySelector('#delete-completed');
    elements.nameInput = document.querySelector('.add-task input[name="name"]');
    elements.dueDateInput = document.querySelector('.add-task input[name="due-date"]');
    elements.todoUl = document.querySelector('.todo-list');
}

const addTaskEl = (task) => {
    const taskTemplate = document.querySelector('#task-template');
    const taskTemplateClone = taskTemplate.content.cloneNode(true)
    const taskEl = taskTemplateClone.querySelector('.task');

    taskEl.setAttribute('data-task-id', task.id);
    if (task.completed) taskEl.classList.add('completed');

    // Add class for priority
    const priorityClass = priorityClassesMap.get(task.priority);
    taskEl.classList.add(priorityClass);

    const taskNameEl = taskEl.querySelector('.task-name');
    taskNameEl.textContent = task.name;

    if (task.dueDate) {
        const currentDate = dateToMilliseconds(new Date());
        let dueDate = dateToMilliseconds(new Date(task.dueDate));
        // due date has different colors for future, past and today
        const dueDateEl = taskEl.querySelector('.due-date');
        if (currentDate > dueDate) {
            dueDateEl.classList.add('failed');
        } else if (currentDate == dueDate) {
            dueDateEl.classList.add('today')
        }
        dueDateEl.textContent = new Date(task.dueDate).toDateString();
    }

    // set values for input elements
    const nameInput = taskEl.querySelector('.task-edit input[name=name]');
    nameInput.value = task.name;
    const prioritySelect = taskEl.querySelector('.task-edit select[name=priority]');
    prioritySelect.value = task.priority;
    const dateInput = taskEl.querySelector('.task-edit input[name=due-date]');
    if (task.dueDate) dateInput.value = task.dueDate;

    // Add event listeners
    const deleteButton = taskEl.querySelector('.delete-button');
    deleteButton.addEventListener('click', removeTaskHandler);
    const checkboxButton = taskEl.querySelector('.checkbox-button');
    checkboxButton.addEventListener('click', toggleTaskHandler);
    const editButton = taskEl.querySelector('.edit-button');
    editButton.addEventListener('click', editTaskHandler);
    const saveButton = taskEl.querySelector('.save-button');
    saveButton.addEventListener('click', saveTaskHandler);
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

// EVENT HANDLERS
const addTaskHandler = (evt) => {
    const priority = Number(elements.prioritySelect.value);
    const name = elements.nameInput.value;
    const dueDate = elements.dueDateInput.value;
    if (name) {
        createTask(name, priority, dueDate);
        reloadTaskList();
    } else {
        alert('Der Aufgabenname darf nicht leer sein.');
    }
}

const editTaskHandler = (evt) => {
    const taskEl = evt.currentTarget.closest('.task');
    taskEl.classList.add('edit');
}

const saveTaskHandler = (evt) => {
    const taskEl = evt.currentTarget.closest('.task');
    const task_id = taskEl.getAttribute('data-task-id');
    const nameEl = taskEl.querySelector('.task-edit input[name=name]');
    const priorityEl = taskEl.querySelector('.task-edit select[name=priority]');
    const dueDateEl = taskEl.querySelector('.task-edit input[name=due-date]');

    saveTask(task_id, nameEl.value, Number(priorityEl.value), dueDateEl.value);
    reloadTaskList();

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
    reloadTaskList();
}

const deleteCompletedHandler = () => {
    deleteCompletedTasks();
    reloadTaskList();
}

const appendEventlisteners = () => {
    elements.addButton.addEventListener('click', addTaskHandler);
    elements.deleteCompletedButton.addEventListener('click', deleteCompletedHandler);
}

const init = () => {
    domMapping();
    appendEventlisteners();
    reloadTaskList();
}

// INIT
init();