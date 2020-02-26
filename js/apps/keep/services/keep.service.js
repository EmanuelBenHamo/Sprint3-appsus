'use strict';

const keepFakeData = [
    {
        id: 1001,
        type: 'noteText',
        info: {
            txt: 'My Text is amazing'
        }
    },
    {
        id: 1002,
        type: 'noteImg',
        info: {
            url: 'https://api.adorable.io/avatars/285/abott@adorable.png',
            title: 'My pretty face'
        }
    },
    {
        id: 1003,
        type: 'noteTodos',
        info: {
            todos: [
                { txt: 'Clean house', doneAt: null },
                { txt: 'Clean house', doneAt: 187111111 },
            ]
        }
    },      
]

function getNotes(){
    return Promise.resolve(keepFakeData);
}

export const keepService = {
    getNotes,
} 