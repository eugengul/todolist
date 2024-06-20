'use strict';

import dom from './dom.js';
import handlers from './evt_handlers.js';
import helpesr from './helpers.js'

const appendEventlisteners = () => {
    // Auth
    dom.elements.loginButton.addEventListener('click', handlers.loginHandler);
    dom.elements.signUpButton.addEventListener('click', handlers.signUpHandler);
    dom.elements.logoutButton.addEventListener('click', handlers.logoutHandler);

    // Sync
    dom.elements.syncButton.addEventListener('click', handlers.syncHandler);

    // Tasks
    dom.elements.addButton.addEventListener('click', handlers.addTaskHandler);
    dom.elements.deleteCompletedButton.addEventListener('click', handlers.deleteCompletedHandler);
}

const init = () => {
    dom.domMapping();
    appendEventlisteners();
    dom.reloadTaskList();
    dom.updateAuthBlock();
}

// INIT
init();