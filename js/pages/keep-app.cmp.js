import { keepService } from '../apps/keep/services/keep.service.js';
import noteFilter from '../apps/keep/cmps/note-filter.cmp.js';
import noteInput from '../apps/keep/cmps/note-input.cmp.js';
import noteList from '../apps/keep/cmps/note-list.cmp.js';
import { eventBus } from '../services/event-bus-service.js';

export default {
    template: `
    <section class='keep-app-container'>
        <div class="note-bar flex">
            <note-filter @filtered="setFilter"></note-filter>
            <note-input @addedNote="onAddNote"></note-input>
        </div>
        <section class="pinnedNotes">
            <h2>Pinned</h2>
            <note-list v-if="notes && pinnedNotes" :notes="pinnedNotes" @remove="onRemoveNote" @pinNote="onNotePinStateChange" @changeColor="onChangeColor"></note-list>
        </section>
        <section class="unpinnedNotes">
            <h2>Unpinned</h2>
            <note-list v-if="notes && unpinnedNotes" :notes="unpinnedNotes" @remove="onRemoveNote" @pinNote="onNotePinStateChange" @changeColor="onChangeColor"></note-list>
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
        eventBus.$on('noteUpdate', note => keepService.updateNote(note));
        eventBus.$on('addNewTodo', note => keepService.addNewTodo(note));
        eventBus.$on('onNoteTodoStateChange',({ noteId, todoIdx })=> keepService.setNoteTodoState({ noteId, todoIdx }));

    },
    methods: {
        onRemoveNote(noteId) {
            keepService.removeNote(noteId)
                .then(() => { eventBus.$emit('showUserMsg', 'Note deleted successfully') });
        },
        onAddNote(note) {
            keepService.addNote(note)
                .then(() => { eventBus.$emit('showUserMsg', 'Note added successfully') });
        },
        onNotePinStateChange(noteId) {
            keepService.toogleNotePinedState(noteId);
        },
        onChangeColor({ noteId, color }) {
            keepService.changeColor({ noteId, color });
        }, 
        setFilter(filterBy) {
            this.filterBy = filterBy;
        },
        filterNotesByFilter(notesArray) {
            if (this.filterBy && this.filterBy.noteText) {
                return notesArray.filter(note => this.matchBetween(note, this.filterBy.noteText));
            } else {
                return notesArray;
            }
        },
        matchBetween(note, text) {
            // TODO: add handling in note types AUDIO, VIDEO, MAP after data structure is decided
            text = text.toLowerCase();
            switch (note.type) {
                case keepService.NOTE_TYPES.text:
                    return note.info.txt.toLowerCase().includes(text);
                case keepService.NOTE_TYPES.image:
                    return note.info.title.toLowerCase().includes(text);
                case keepService.NOTE_TYPES.todoList:
                    let fountMatchInTodo = false;
                    note.info.todos.forEach((todo) => {
                        if (todo.txt.toLowerCase().includes(text)) {
                            fountMatchInTodo = true;
                            return;
                        }
                    });
                    return fountMatchInTodo;
                case keepService.NOTE_TYPES.audio:
                // return note.info.txt.toLowerCase().includes(text);
                case keepService.NOTE_TYPES.video:
                // return note.info.txt.toLowerCase().includes(text);
                case keepService.NOTE_TYPES.map:
                // return note.info.txt.toLowerCase().includes(text);
                default:
                    return false;
            }
        },

    },
    components: {
        noteInput,
        noteFilter,
        noteList,
    }
}