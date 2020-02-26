import { keepService } from '../apps/keep/services/keep.service.js';
import noteFilter from '../apps/keep/cmps/note-filter.cmp.js';
import noteInput from '../apps/keep/cmps/note-input.cmp.js';
import noteList from '../apps/keep/cmps/note-list.cmp.js';

export default {
    template: `
    <section class='keep-app-container'>
        <h1>Keep App!</h1>
        <note-filter @filtered="setFilter"></note-filter>
        <note-input @addedNote="onAddedNote"></note-input>
        <section class="pinnedNotes">
            <h2>Pinned</h2>
            <note-list v-if="notes && pinnedNotes" :notes="pinnedNotes" @remove="onRemove"></note-list>
        </section>
        <section class="unpinnedNotes">
            <h2>Unpinned</h2>
            <note-list v-if="notes && unpinnedNotes" :notes="unpinnedNotes" @remove="onRemove"></note-list>
        </section>
    </section>
    `,
    data() {
        return {
            notes: null,
            filterBy: null
        }
    },
    computed: {
        pinnedNotes() {
            let filteredNotes = this.notes.filter(note => note.isPinned);
            filteredNotes = this.filterNotesByFilter(filteredNotes);
            return filteredNotes;
        },
        unpinnedNotes() {
            let filteredNotes = this.notes.filter(note => !note.isPinned);
            filteredNotes = this.filterNotesByFilter(filteredNotes);
            return filteredNotes;
        }
    },
    created() {
        keepService.getNotes()
            .then(notes => this.notes = notes);
    },
    methods: {
        onRemove(noteId) {
            keepService.removeNote(noteId)
                .then(deletedNote => console.log('note deleted', JSON.stringify(deletedNote)));
        },

        onAddedNote(note) {
            keepService.addNote(note)
                .then(addedNote => console.log('note added', JSON.stringify(addedNote)));
        },
        setFilter(filterBy) {
            this.filterBy = filterBy;
        },
        filterNotesByFilter(notesArray) {
            let filteredNotes = notesArray;

            if (this.filterBy && this.filterBy.noteText) {
                filteredNotes = notesArray.filter(note => this.matchBetween(note, this.filterBy.noteText));
            }

            return filteredNotes;
        },
        matchBetween(note, text) {
            // TODO: add handling in all note types after data structure is decided
            switch (note.type) {
                case keepService.NOTE_TYPES.text:
                    return note.info.txt.toLowerCase().includes(text.toLowerCase());
                case keepService.NOTE_TYPES.image:
                    return note.info.title.toLowerCase().includes(text.toLowerCase());
                case keepService.NOTE_TYPES.todoList:
                // return note.info.txt.toLowerCase().includes(text.toLowerCase());
                case keepService.NOTE_TYPES.audio:
                // return note.info.txt.toLowerCase().includes(text.toLowerCase());
                case keepService.NOTE_TYPES.video:
                // return note.info.txt.toLowerCase().includes(text.toLowerCase());
                case keepService.NOTE_TYPES.map:
                // return note.info.txt.toLowerCase().includes(text.toLowerCase());
                default:
                    return false;
            }
        }
    },
    components: {
        noteInput,
        noteFilter,
        noteList
    },
}