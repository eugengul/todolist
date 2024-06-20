'use strict';

import dom from './dom.js';

// load tasks from localStorage
const tasks_json = localStorage.getItem('tasks');
const tasksMap = new Map(JSON.parse(tasks_json));

class Task {
    constructor(name, priority, dueDate) {
        this.id = self.crypto.randomUUID();
        this.name = name;
        this.priority = priority;
        this.dueDate = dueDate;
        this.completed = false;
        this.created = Date.now();
        this.lastUpdated = Date.now();
        this.deleted = false;
    }
}

const createTask = (name, priority, dueDate) => {
    const task = new Task(name, priority, dueDate);
    tasksMap.set(task.id, task);
    storeTasks();
    return task;
}

const deleteTask = (task_id) => {
    const task = tasksMap.get(task_id);
    task.deleted = true;
    storeTasks();
}

const saveTask = (task_id, name, priority, dueDate) => {
    const task = tasksMap.get(task_id);
    task.name = name;
    task.priority = priority;
    task.dueDate = dueDate;
    task.lastUpdated = Date.now();
    storeTasks();
}

const toggleTask = (task_id) => {
    const task = tasksMap.get(task_id);
    task.completed = !task.completed;
    task.lastUpdated = Date.now();
    storeTasks();
}

const storeTasks = () => {
    const tasks_json = JSON.stringify([...tasksMap]);
    localStorage.setItem('tasks', tasks_json);
}

const deleteCompletedTasks = () => {
    for (const task of tasksMap.values()) {
        if (task.completed) {
            task.deleted = true;
        }
    }
    storeTasks();
    dom.reloadTaskList();
}

const deleteAllTasks = () => {
    tasksMap.clear();
    storeTasks();
    dom.reloadTaskList();
}

// Compare tasks by creation date -> completion status -> priority
const compareTasks= (task1, task2) => {
    // Compare tasks by completion status
    let compareResult = task1.completed - task2.completed;
    // Compare priority only if completion statuses are the same
    if (compareResult == 0)
        compareResult = task2.priority - task1.priority;
    // Compare by creation time if status and priority are the same
    if (compareResult == 0)
        compareResult = task2.created - task1.created;
    return compareResult;
}

const excludeDeletedTasks = () => {
    return new Map([...tasksMap.entries()].filter(
        task => !task[1].deleted))
}

const sortTasksByCompletion = () => {
    const filteredTasks = excludeDeletedTasks();
    return new Map([...filteredTasks.entries()].sort(
        (entry1, entry2) => {
            const task1 = entry1[1];
            const task2 = entry2[1];
            return compareTasks(task1, task2);
        }))
}

const tasks = {
    tasksMap,
    Task,
    createTask,
    deleteTask,
    saveTask,
    toggleTask,
    storeTasks,
    deleteCompletedTasks,
    deleteAllTasks,
    sortTasksByCompletion
}

export default tasks;