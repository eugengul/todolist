'use strict';

// load tasks from localStorage
let tasks_json = localStorage.getItem('tasks');
const tasks = new Map(JSON.parse(tasks_json));

class Task {
    constructor(name) {
        this.id = self.crypto.randomUUID();
        this.name = name;
        this.finished = false;
    }
}

const createTask = (name) => {
    let task = new Task(name);
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
    task.finished = !task.finished;
    storeTasks();
}

const storeTasks = () => {
    let tasks_json = JSON.stringify([...tasks]);
    localStorage.setItem('tasks', tasks_json);
}