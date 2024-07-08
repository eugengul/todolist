'use strict';

import dom from './dom.js';
import tasks from './tasks.js';

// Tasks
const addTaskHandler = (evt) => {
    const priority = Number(dom.elements.prioritySelect.value);
    const name = dom.elements.nameInput.value;
    const dueDate = dom.elements.dueDateInput.value;
    if (name) {
        tasks.createTask(name, priority, dueDate);
        dom.reloadTaskList();
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

    tasks.saveTask(task_id, nameEl.value, Number(priorityEl.value), dueDateEl.value);
    dom.reloadTaskList();

}

const removeTaskHandler = (evt) => {
    const taskEl = evt.currentTarget.closest('.task');
    const task_id = taskEl.getAttribute('data-task-id');

    tasks.deleteTask(task_id);
    taskEl.remove();
}

const toggleTaskHandler = (evt) => {
    const taskEl = evt.currentTarget.closest('.task');
    taskEl.classList.toggle('completed')

    const task_id = taskEl.getAttribute('data-task-id');
    tasks.toggleTask(task_id);
    dom.reloadTaskList();
}

const deleteCompletedHandler = () => {
    tasks.deleteCompletedTasks();
    dom.reloadTaskList();
}

const handlers = {
    // Tasks
    addTaskHandler,
    editTaskHandler,
    saveTaskHandler,
    removeTaskHandler,
    toggleTaskHandler,
    deleteCompletedHandler,
}

export default handlers;