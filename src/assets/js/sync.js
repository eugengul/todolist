'use strict';

import auth from './auth.js';
import tasks from './tasks.js';

const syncTasks = (callback) => {
    const tasksToSync = [...tasks.tasksMap.values()];
    tasksToSync.map(task => delete task.id);

    const tasks_json = JSON.stringify(
        {tasks : tasksToSync});

    return fetch("./sync", {
        method: "post",
        body: tasks_json,
        headers: {
            "Content-type": "application/json",
            'Authorization': `Bearer ${auth.accessToken}`,
        }
    }).then((response) => response.json())
        .then(response => {
            tasks.tasksMap.clear();
            response.tasks.forEach(task => {
                task.id = task._id;
                tasks.tasksMap.set(task.id, task);
            });
        })
}

const sync = {
    syncTasks,
}

export default sync;