'use strict';
import { fakeNotes } from './notes-fake-data.js';
import utilService from '../../../services/utils-service.js';

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

export const keepService = {
    getNotes,
    addNote,
    updateNote,
    NOTE_TYPES,
    removeNote,
    toogleNotePinedState,
    changeColor,
    setNoteTodoState,
    addNewTodo
}

function getNotes() {
    let notes = utilService.load(NOTES_KEY);

    if (!notes) {
        notes = fakeNotes;
        utilService.store(NOTES_KEY, notes);
    }
    notesDB = notes;
    return Promise.resolve(notesDB);
}

function addNote(note) {
    let formatedNote = _formatNoteByType(note);
    formatedNote.id = utilService.makeId(utilService.getRandomInt(5, 10));
    notesDB.unshift(formatedNote);
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

function toogleNotePinedState(noteId) {
    let noteIdx = notesDB.findIndex(note => note.id === noteId);
    let updatedNote = notesDB[noteIdx];
    updatedNote.isPinned = !updatedNote.isPinned;
    return updateNote(updatedNote);
}
function changeColor({ noteId, color }) {
    let noteIdx = notesDB.findIndex(note => note.id === noteId);
    let updatedNote = notesDB[noteIdx];
    updatedNote.style = color;
    return updateNote(updatedNote);
}
function setNoteTodoState({ noteId, todoIdx }) {
    let noteIdx = notesDB.findIndex(note => note.id === noteId);
    let updatedNote = notesDB[noteIdx];
    updatedNote.info.todos[todoIdx].doneAt = (!updatedNote.info.todos[todoIdx].doneAt) ? Date.now() : null;
    return updateNote(updatedNote);
}
function addNewTodo(note){
    let noteId = note.id;
    let noteIdx = notesDB.findIndex(note => note.id === noteId);
    console.log('Add TODO',noteIdx)
    
    note.info.todos.push(_createTodo());
    let updatedNote = notesDB[noteIdx]
    return updateNote(updatedNote)
}
function _createTodo(){
    return { id:utilService.getRandomInt(1,10000) , txt: '', doneAt: null }
}

function _formatNoteByType(note) {
    switch (note.type) {
        case NOTE_TYPES.text:
            return _getFormattedTextNote(note);
        case NOTE_TYPES.image:
            return _getFormattedImageNote(note);
        case NOTE_TYPES.video:
            return _getFormattedVideoNote(note);
        case NOTE_TYPES.audio:
            return _getFormattedAudioNote(note);
        case NOTE_TYPES.todoList:
            return _getFormattedTodoListNote(note);
        case NOTE_TYPES.map:
            return _getFormattedMapNote(note);
    }
}

function _getFormattedTextNote(note) {
    return {
        type: note.type,
        isPinned: false,
        info: {
            txt: note.txt
        },
        style: null,
    };
}

function _getFormattedImageNote(note) {
    return {
        type: note.type,
        isPinned: false,
        info: {
            url: note.txt,
            title: ''
        },
        style: null,
    };
}

function _getFormattedVideoNote(note) {
    return {
        type: note.type,
        isPinned: false,
        info: {
            url: 'https://www.youtube.com/embed/' + _getVideoId(note.txt)
        },
        style: null,
    };
}

function _getFormattedAudioNote(note) {
    return 'Enter audio URL...';
}

function _getFormattedTodoListNote(note) {
    let splitedtodos = note.txt.split(',');
    return {
        type: note.type,
        isPinned: false,
        title: note.title,
        info: {
            todos: splitedtodos.map(todo => {
                return {
                    id: utilService.getRandomInt(1, 10000),
                    txt: todo,
                    doneAt: null
                }
            })
        },
        style: null,
    };
}

function _getFormattedMapNote(note) {
    return 'Enter location...';
}

function _getVideoId(param) {
    var video_id = param.split('v=')[1];
    var ampersandPosition = video_id.indexOf('&');
    if (ampersandPosition != -1) {
        video_id = video_id.substring(0, ampersandPosition);
    }
    return video_id
}