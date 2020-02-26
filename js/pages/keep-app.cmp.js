import {keepService} from '../apps/keep/services/keep.service.js';
import noteList from '../apps/keep/cmps/note-list.cmp.js';
import noteInput from '../apps/keep/cmps/note-input.cmp.js';



export default {
    template:`
    <section class='keep-app-container'>
        <h1>Keep App!</h1>
        <note-input></note-input>
        <note-list v-if="notes" :notes="notes"></note-list>
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
        noteList,
        noteInput
    }
}