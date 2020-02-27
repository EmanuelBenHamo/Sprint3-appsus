'use strict';
import { eventBus } from '../../../services/event-bus-service.js'

export default {
    template:`
    <section class="long-text-container text-center" v-if="note">
        <button @click="note = null">X</button>
        <h1>Edit text</h1>
        <section  class="note-edit-text">
            <div v-if="note.type === 'noteTodos'" class="note-todo-edit" v-for="todo in note.info.todos" :key="todo.id" @keyup.enter="addNewTodo">
                <input type="text" v-model="todo.txt" @input="onNoteUpdate"/>
            </div>
        </section>
        <textarea v-if="note.type === 'noteText'" v-model="text" @input="onNoteUpdate" >{{text}}</textarea>  
    </section>
    `,
    data() {
        return {
            note: null,
            text: '',
        }
    },
    created() {
        eventBus.$on('noteEdit', note => {
            this.note = note
            this.text = this.note.info.txt;
        }); 
    },
    methods: {
        onNoteUpdate() {
            this.note.info.txt = this.text
            eventBus.$emit('noteUpdate',this.note)
        },
        addNewTodo(){
            eventBus.$emit('addNewTodo',this.note);
        }
    }


}