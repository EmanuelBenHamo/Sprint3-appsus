'use strict';
import noteText from './note-txt.cmp.js';
import noteImg from './note-img.cmp.js';
import noteTodos from './note-todos.cmp.js';
import noteVideo from './note-video.cmp.js';
import noteAudio from './note-audio.cms.js';
import noteMap from './note-map.cmp.js';


export default {
    template:`
    <section class="note-preview-container" :style="{'background-color': color}"> 
        <h1>Note Preview</h1>
        <component :is="note.type" :info="note.info"></component>
        <div class="tool-bar">
            <button class="remove-note" @click="$emit('remove',note.id)">X</button>    
            <button class="pin-note" @click="$emit('pinNote',note.id)">📌</button>
            <input type="color" v-model="color" @change="$emit('changeColor', {noteId:note.id, color:color})"/>   
        </div>
    </section>
    `,
    data(){
        return{
            color:'#ddd'
        }
    },
    props:['note'],
    components:{
        noteText,
        noteImg,
        noteTodos,
        noteVideo,
        noteAudio,
        noteMap
    },
    created(){
        this.color = this.note.style
    }
}