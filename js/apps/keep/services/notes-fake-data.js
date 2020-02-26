// ATTENTION: make sure that note type is valid, look at NOTE_TYPES object in keep service

export const fakeNotes = [
    {
        id: 1001,
        type: 'noteText',
        isPinned: false,
        info: {
            txt: 'My Text is amazing'
        },
        style:null
    },
    {
        id: 1002,
        type: 'noteImg',
        isPinned: false,
        info: {
            url: 'https://api.adorable.io/avatars/285/abott@adorable.png',
            title: 'My pretty face'
        },
        style:null
    },
    {
        id: 1003,
        type: 'noteTodos',
        isPinned: true,
        info: {
            todos: [
                { id:45 , txt: 'Cook', doneAt: null },
                { id: 772, txt: 'Clean house', doneAt: 187111111 },
            ]
        },
        style:null
    },      
    {
        id: 1004,
        type: 'noteVideo',
        isPinned: false,
        info: {
            url:'https://www.youtube.com/embed/0E8lD2BHw78' 
        },
        style:null
    },      
]


