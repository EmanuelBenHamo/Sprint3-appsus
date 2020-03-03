import { eventBus } from '../../../services/event-bus-service.js'

export default {
    template: `
        <section class="note-text-container" v-if="text">
            <textarea v-model="text" @input="onNoteUpdate" >{{text}}</textarea>  
        </section>
    `,
    data(){
        return{
            text: '',
        }
    },
    props:['note'],

    created(){
        this.text = this.note.info.txt;
    },
    methods:{
        onNoteUpdate() {
            this.note.info.txt = this.text;        
            eventBus.$emit('noteUpdate',this.note)
        },
    }
}