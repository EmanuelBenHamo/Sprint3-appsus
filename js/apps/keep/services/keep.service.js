'use strict';

import {fakeNotes} from './notes-fake-data.js';

function getNotes(){
    return Promise.resolve(fakeNotes);
}

export const keepService = {
    getNotes
} 