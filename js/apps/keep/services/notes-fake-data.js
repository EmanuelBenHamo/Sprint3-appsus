import utilService from '../../../services/utils-service.js';
import utilsService from '../../../services/utils-service.js';

// ATTENTION: make sure that note type is valid, look at NOTE_TYPES object in keep service

export const fakeNotes = [
    {
        id: utilService.makeId(utilsService.getRandomInt(5, 10)),
        type: 'noteText',
        isPinned: true,
        info: {
            txt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        style:null
    },
    {
        id: utilService.makeId(utilsService.getRandomInt(5, 10)),
        type: 'noteText',
        isPinned: false,
        info: {
            txt: 'My Text is amazing'
        },
        style:null
    },
    {
        id: utilService.makeId(utilsService.getRandomInt(5, 10)),
        type: 'noteText',
        isPinned: false,
        info: {
            txt: "There's a lady who\'s sure All that glitters is gold And she's buying a stairway to heaven When she gets there she knows If the stores are all closed With a word she can get what she came for Oh oh oh oh and she's buying a stairway to heaven"
        },
        style:null
    },
    {
        id: utilService.makeId(utilsService.getRandomInt(5, 10)),
        type: 'noteImg',
        isPinned: false,
        info: {
            url: 'https://api.adorable.io/avatars/285/abott@adorable.png',
            title: 'My pretty face'
        },
        style:null
    },
    {
        id: utilService.makeId(utilsService.getRandomInt(5, 10)),
        type: 'noteTodos',
        isPinned: true,
        title:'Todo List',
        info: {
            todos: [
                { id: utilService.makeId(utilsService.getRandomInt(5, 10)), txt: 'Cook', doneAt: null, edit: false},
                { id: utilService.makeId(utilsService.getRandomInt(5, 10)), txt: 'Clean house', doneAt: null , edit: false},
            ]
        },
        style:null
    },      
    {
        id: utilService.makeId(utilsService.getRandomInt(5, 10)),
        type: 'noteTodos',
        isPinned: false,
        title:'Shoping List',
        info: {
            todos: [
                { id: utilService.makeId(utilsService.getRandomInt(5, 10)), txt: 'Tomatos', doneAt: null ,edit: false},
                { id: utilService.makeId(utilsService.getRandomInt(5, 10)), txt: 'Milk', doneAt: null , edit: false},
                { id: utilService.makeId(utilsService.getRandomInt(5, 10)), txt: 'Bread', doneAt: null , edit: false},
                { id: utilService.makeId(utilsService.getRandomInt(5, 10)), txt: 'Cheese', doneAt: null , edit: false},
                { id: utilService.makeId(utilsService.getRandomInt(5, 10)), txt: 'Apples', doneAt: null , edit: false},
                { id: utilService.makeId(utilsService.getRandomInt(5, 10)), txt: 'Beer', doneAt: null , edit: false},
            ]
        },
        style:null
    },      
    {
        id: utilService.makeId(utilsService.getRandomInt(5, 10)),
        type: 'noteVideo',
        isPinned: false,
        info: {
            url:'https://www.youtube.com/embed/0E8lD2BHw78' 
        },
        style:null
    },      
    
]


