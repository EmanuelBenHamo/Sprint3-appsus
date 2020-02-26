import {keepService} from '../apps/keep/services/keep.service.js';
import noteList from '../apps/keep/cmps/note-list.cmp.js';


export default {
    template:`
    <section class='keep-app-container'>
        <h1>Keep App!</h1>
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
    data(){
        return {
            notes: null
        }
    },
    computed:{
        pinnedNotes(){
           return this.notes.filter(note => note.isPinned)
        },
        unpinnedNotes(){
           return this.notes.filter(note => !note.isPinned)
        }
    },
    created(){
        keepService.getNotes()
        .then(notes => this.notes = notes);
    },
    components: {
        noteList,   
    },
    methods:{
        onRemove(noteId){
            keepService.removeNote(noteId)
        }
    }
}