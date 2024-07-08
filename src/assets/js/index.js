'use strict';

import dom from './dom.js';
import handlers from './evt_handlers.js';

const appendEventlisteners = () => {
    // Tasks
    dom.elements.addButton.addEventListener('click', handlers.addTaskHandler);
    dom.elements.deleteCompletedButton.addEventListener('click', handlers.deleteCompletedHandler);
}

const init = () => {
    dom.domMapping();
    appendEventlisteners();
    dom.reloadTaskList();
}

// INIT
init();