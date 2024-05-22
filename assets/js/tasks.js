'use strict';

// load tasks from localStorage
let tasks_json = localStorage.getItem('tasks');
const tasks = new Map(JSON.parse(tasks_json));

class Task {
    constructor(name, dueDate) {
        this.id = self.crypto.randomUUID();
        this.name = name;
        this.dueDate = dueDate;
        this.completed = false;
    }
}

const createTask = (name, dueDate) => {
    let task = new Task(name, dueDate);
    tasks.set(task.id, task);
    storeTasks();
    return task;
}

const deleteTask = (task_id) => {
    tasks.delete(task_id);
    storeTasks();
}

const toggleTask = (task_id) => {
    let task = tasks.get(task_id);
    task.completed = !task.completed;
    storeTasks();
}

const storeTasks = () => {
    let tasks_json = JSON.stringify([...tasks]);
    localStorage.setItem('tasks', tasks_json);
}

const deleteCompletedTasks = () => {
    for (const task of tasks.values()) {
        if (task.completed) tasks.delete(task.id);
    }
    storeTasks();
    reloadTaskList();
}

const sortTasksByCompletion = () => {
    return new Map([...tasks.entries()].sort(
        (a, b) => a[1].completed > b[1].completed));
}