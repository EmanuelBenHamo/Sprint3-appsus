'use strict';
import notePreview from './note-preview.cmp.js';


export default {
    template:`
    <section class="note-list-container">
        <section class="notes-container ">
            <note-preview v-for="note in notes" :note="note" :key="note.id" @remove="$emit('remove',$event)" @pinNote="$emit('pinNote',$event)" @changeColor="$emit('changeColor',$event)">
            </note-preview>
            
        </section>
    </section>
    `,
    props:['notes'],
    components:{
        notePreview,

    }
}
