'use strict';
import { eventBus } from '../../../services/event-bus-service.js'

export default {
    template:`
    <section class="long-text-container text-center" v-if="note">
        <button @click="note = null" class=" fa fa-times"></button>
        <section  class="note-edit-text">
            <div v-if="note.type === 'noteTodos'" class="note-todo-edit flex column" >
                <template v-for="todo in note.info.todos">
                    <input type="text" v-model="todo.txt" @input="onNoteUpdate" :key="todo.id" @keyup.enter="addNewTodo"/>
                </template>
            </div>
        </section>
        <textarea v-if="note.type === 'noteText'"  v-model="text" @input="onNoteUpdate" >{{text}}</textarea>  
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
    watch:{
        'addNewTodo'(){
            console.log('todo added')
        }
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