import {keepService} from '../apps/keep/services/keep.service.js';
import noteText from '../apps/keep/cmps/note-txt.cmp.js';


export default {
    template:`
    <section class='keep-app-container'>
        <h1>Keep App!</h1>
        <section class="notes-container" v-if="notes">
            <component v-for="note in notes" :is="note.type" :key="note.id"></component>
        </section>
    </section>
    `,
    data(){
        return {
            notes: null
        }
    },
    created(){
        keepService.getNotes()
        .then(notes => this.notes = notes);
    },
    components: {
        'noteText': noteText,
        // 'noteImg': noteImg,
        // 'noteTodos': noteTodos,
        // 'noteVideo': noteVideo,
        // 'noteAudio': noteAudio,
        // 'noteMap': noteMap
    }
}