import {keepService} from '../apps/keep/services/keep.service.js';

export default {
    template:`
    <section class='keep-app-container'>
        <h1>Keep App!</h1>
        <section class="notes-container" v-if="notes">
            <component v-for="note in notes" :is="note.type"></component>
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
        'note-text': noteText,
        'note-img': noteImg,
        'note-todos': noteTodos,
        'note-video': noteVideo,
        'note-audio': noteAudio,
        'note-map': noteMap
    }
}