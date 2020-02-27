import utilService from '../../../services/utils-service.js';
import utilsService from '../../../services/utils-service.js';

// ATTENTION: make sure that note type is valid, look at NOTE_TYPES object in keep service

export const fakeNotes = [
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
        info: {
            todos: [
                { id: utilService.makeId(utilsService.getRandomInt(5, 10)), txt: 'Cook', doneAt: null },
                { id: utilService.makeId(utilsService.getRandomInt(5, 10)), txt: 'Clean house', doneAt: null },
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


