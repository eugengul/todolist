'use strict';

const dateToMilliseconds = (date) => {
    date.setHours(0,0,0,0);
    return date.getTime();
}