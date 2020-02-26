'use strict';
import noteText from './note-txt.cmp.js';
import noteImg from './note-img.cmp.js';
import noteTodos from './note-todos.cmp.js';
import noteVideo from './note-video.cmp.js';
import noteAudio from './note-audio.cms.js';
import noteMap from './note-map.cmp.js';


export default {
    template:`
    <section class="note-preview-container">
        <h1>Note Preview</h1>
        <component :is="note.type" :info="note.info"></component>
    

    </section>
    `,
    props:['note'],
    components:{
        noteText,
        noteImg,
        noteTodos,
        noteVideo,
        noteAudio,
        noteMap
    }
}