'use strict';

const keepFakeData = [
    {
        type: 'noteText',
        info: {
            txt: 'My Text is amazing'
        }
    },
    {
        type: 'noteImg',
        info: {
            url: 'https://api.adorable.io/avatars/285/abott@adorable.png',
            title: 'My pretty face'
        }
    },
    {
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