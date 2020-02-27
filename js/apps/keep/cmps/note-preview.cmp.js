'use strict';
import noteText from './note-txt.cmp.js';
import noteImg from './note-img.cmp.js';
import noteTodos from './note-todos.cmp.js';
import noteVideo from './note-video.cmp.js';
import noteAudio from './note-audio.cms.js';
import noteMap from './note-map.cmp.js';
import eventBus from '../../../services/event-bus-service.js'



export default {
    template:`
    <section class="note-preview-container" :style="{'background-color': color}"> 
        <component :is="note.type" :note="note" @setTodoDone="$emit('setTodoDone', $event)"></component>
        <div class="tool-bar">
            <button class="remove-note" @click="$emit('remove',note.id)">X</button>    
            <button class="pin-note" @click="$emit('pinNote',note.id)">📌</button>
            <button class="edit-note" @click="onNoteEdit">✎</button>
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
        noteMap,
    },
    created(){
        this.color = this.note.style
    },
    methods:{
        onNoteEdit(){
            eventBus.$emit('noteEdit', this.note)
        }
    }
}