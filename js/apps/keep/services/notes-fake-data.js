export const fakeNotes = [
    {
        id: 1001,
        type: 'noteText',
        isPinned: false,
        info: {
            txt: 'My Text is amazing'
        }
    },
    {
        id: 1002,
        type: 'noteImg',
        isPinned: false,
        info: {
            url: 'https://api.adorable.io/avatars/285/abott@adorable.png',
            title: 'My pretty face'
        }
    },
    {
        id: 1003,
        type: 'noteTodos',
        isPinned: true,
        info: {
            todos: [
                { txt: 'Clean house', doneAt: null },
                { txt: 'Clean house', doneAt: 187111111 },
            ]
        },
    },      
    {
        id: 1004,
        type: 'noteVideo',
        isPinned: false,
        info: {
            url:'https://www.youtube.com/embed/tT37ndnRx2g'
        }
    },      
]


