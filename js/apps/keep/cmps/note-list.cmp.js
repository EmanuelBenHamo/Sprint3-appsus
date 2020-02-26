'use strict';
import notePreview from './note-preview.cmp.js';

export default {
    template:`
    <section class="note-list-container">
        <h1>Note List</h1>
        <section class="notes-container">
            <note-preview v-for="note in notes" :note="note" :key="note.id"></note-preview>
        </section>
    </section>
    `,
    props:['notes'],
    components:{
        notePreview,
    }
}
