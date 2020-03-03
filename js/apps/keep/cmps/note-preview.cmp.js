'use strict';
import noteText from './note-txt.cmp.js';
import noteImg from './note-img.cmp.js';
import noteTodos from './note-todos.cmp.js';
import noteVideo from './note-video.cmp.js';
import noteAudio from './note-audio.cms.js';
import noteMap from './note-map.cmp.js';
import { eventBus } from '../../../services/event-bus-service.js'



export default {
    template: `
    <section class="note-preview-container flex column align-center justify-center" :style="{'background-color': color}"> 
        <span v-if="pinned">📌</span>
        <component :is="note.type" :note="note" ></component>
        <div class="tool-bar">
            <button class="remove-note fa fa-trash" @click="$emit('remove', note.id)" title="Remove"></button>    
            <button class="pin-note fa fa-thumb-tack" @click="onNotePinned" title="Pin"></button>
            <button class="color-note fa fa-paint-brush" @click="onNoteChangeColorClick" title="Choose Color"></button>   
            <input type="color" ref="colorInput" v-model="color" @change="$emit('changeColor', {noteId:note.id, color:color})" hidden/>
            
        </div>
    </section>
    `,
    data() {
        return {
            color: '#ddd',
            // pinned: null
        }
    },
    props: ['note'],
    components: {
        noteText,
        noteImg,
        noteTodos,
        noteVideo,
        noteAudio,
        noteMap,
    },
    created() {
        this.color = this.note.style
        this.pinned = this.note.isPinned
    },
    methods: {
        onNoteEdit() {
            eventBus.$emit('noteEdit', this.note)
        },
        onNoteChangeColorClick(){
            let elColorInput =  this.$refs.colorInput;
            elColorInput.click();
        },
        onNotePinned(){
            this.$emit('pinNote',this.note.id)
        }
    }
}