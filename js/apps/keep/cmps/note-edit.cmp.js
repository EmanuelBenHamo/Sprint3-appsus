'use strict';
import eventBus from '../../../services/event-bus-service.js'

export default {
    template:`
    <section class="long-text-container text-center" v-if="note">
        <button @click="note = null">X</button>
        <h1>Edit text</h1>
        <section  class="note-edit-text">
            <div v-if="note.type === 'noteTodos'" class="note-todo-edit"   v-for="todo in note.info.todos">
                <input type="text"  :value="todo.txt"/>
            </div>
        </section>
        <textarea v-if="note.type === 'noteText'" v-model="text" ref="input"  @input="onNoteUpdate" >{{text}}</textarea>  
    </section>
    `,
    data(){
        return{
            note:null,
            text:'',
        }
    },
    created(){
        eventBus.$on('noteEdit', note => {
            this.note = note
            this.text = this.note.info.txt;
            // console.log('created',this.text)
        });

        // console.log('this.note',this.note)
    },
    mounted(){
        // this.$refs.input.focus()
    },
    methods:{
        onNoteUpdate(){
            this.note.info.txt = this.text
            // console.log(this.note)
            eventBus.$emit('noteUpdate',this.note)
        }
    }
   
  
}