'use strict';
import {fakeNotes} from './notes-fake-data.js';
import { utilService } from '../../../services/utils-service.js';

const NOTES_KEY = 'notes';
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
    notesDB.push(note);
    utilService.store(NOTES_KEY, notesDB);
    return Promise.resolve(note);
}

function deleteNote(noteId) {
    let noteIdx = notesDB.findIndex(note => note.id === noteId);
    let deletedNote = notesDB.splice(noteIdx, 1)[0];
    utilService.store(NOTES_KEY, notesDB);
    return Promise.resolve(deletedNote);
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
    deleteNote
} 