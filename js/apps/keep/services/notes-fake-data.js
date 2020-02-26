// ATTENTION: make sure that note type is valid, look at NOTE_TYPES object in keep service

export const fakeNotes = [
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