'use strict';
import { fakeNotes } from './notes-fake-data.js';
import { utilService } from '../../../services/utils-service.js';

const NOTES_KEY = 'notes';

const NOTE_TYPES = {
    text: 'noteText',
    image: 'noteImg',
    video: 'noteVideo',
    audio: 'noteAudio',
    todoList: 'noteTodos',
    map: 'noteMap'
}

var notesDB = [];

function getNotes() {
    let notes = utilService.load(NOTES_KEY);
    
    if(!notes) {
        notes = fakeNotes;
        utilService.store(NOTES_KEY, notes);
    }
    notesDB = notes;  
    return Promise.resolve(notesDB);
}

function addNote(note) {
    let formatedNote =_formatNoteByType(note)
    notesDB.push(formatedNote);
    utilService.store(NOTES_KEY, notesDB);
    return Promise.resolve(formatedNote);
}

function removeNote(noteId) {
    let noteIdx = notesDB.findIndex(note => note.id === noteId);
    let removedNote = notesDB.splice(noteIdx, 1)[0];
    utilService.store(NOTES_KEY, notesDB);
    return Promise.resolve(removedNote);
}

function updateNote(updatedNote) {
    let noteIdx = notesDB.findIndex(note => note.id === updatedNote.id);
    notesDB.splice(noteIdx, 1, updatedNote);
    utilService.store(NOTES_KEY, notesDB);
    return Promise.resolve(updatedNote);
}

export const keepService = {
    getNotes,
    addNote,
    updateNote,
    NOTE_TYPES,
    removeNote
} 

function _formatNoteByType(note) {
    switch (note.type) {
        case NOTE_TYPES.text:
            return {
                id: utilService.randomInt(1,10000),
                type: note.type,
                isPinned: false,
                info: {
                    txt: note.txt
                }
            };
        case NOTE_TYPES.image:
            return {
                id: utilService.randomInt(1,10000),
                type: note.type,
                isPinned: false,
                info: {
                    url: note.txt,
                    title: ''
                }
            };
        case NOTE_TYPES.video:
            
            return {
                id: utilService.randomInt(1,10000),
                type: note.type,
                isPinned: false,
                info: {
                    url:'https://www.youtube.com/embed/' + getVideoId(note.txt)
                }
            };
        case NOTE_TYPES.audio:
            return 'Enter audio URL...';
        case NOTE_TYPES.todoList:
            let splitedtodos = note.txt.split(',')
            return{
                id: utilService.randomInt(1,10000),
                type: note.type,
                isPinned: true,
                info: {
                    todos: splitedtodos.map(todo => {
                        return {
                            txt: todo,
                            doneAt: null 
                        }
                    }) 
                }
            };
        case NOTE_TYPES.map:
            return 'Enter location...';
    }
}

function getVideoId(param){
    var video_id = param.split('v=')[1];
var ampersandPosition = video_id.indexOf('&');
if(ampersandPosition != -1) {
  video_id = video_id.substring(0, ampersandPosition);
}
return video_id
}