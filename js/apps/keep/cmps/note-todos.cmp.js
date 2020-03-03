import { eventBus } from '../../../services/event-bus-service.js'

export default {
    template: `
        <section class="todo-list-container">
            <h1>{{note.title}}</h1>
            <ul class="todo-list clean-list flex column" >
                <li  v-for="(todo, idx) in textLength"  :key="todo.id" :ref="idx">
                    <input type="checkbox" @click="setDone(idx,$event)"/>
                    <input type="text" v-if="todo.edit" v-model="todo.txt"
                    :style="{'display': todo.display}"
                    @blur= "onNoteUpdate(idx)"
                    @keyup.enter="addNewTodo"/>
                    <label v-else="!todo.edit" @click = "todo.edit = true;">{{todo.txt}} </label>
                </li>
            </ul>
            <span v-if="todoCount > 7">Read More...</span>
        </section>
    `,
    props:['note'],
    data(){
        return{
            todoCount:this.note.info.todos.length,
        }
    },
    computed:{
        textLength(){
            if(this.note.info.todos.length > 7 ) return this.note.info.todos.slice(0,7)
            else return this.note.info.todos
        },
    },
    methods: {
        setDone(idx, ev) {
            this.setStyle(idx,ev)
            eventBus.$emit('onNoteTodoStateChange', { noteId: this.note.id, todoIdx: idx })
        },
        setStyle(idx,ev){
            if(ev.target.checked){
                this.$refs[idx][0].classList.add('display') 
            }else{
                this.$refs[idx][0].classList.remove('display') 
            }

        },
        onNoteUpdate(idx) {
            this.note.info.todos[idx].edit = false
            eventBus.$emit('noteUpdate',this.note)
        },
        addNewTodo(){
            eventBus.$emit('addNewTodo',this.note);
        }
    },
}

