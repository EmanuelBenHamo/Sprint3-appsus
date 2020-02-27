import { eventBus } from '../../../services/event-bus-service.js'

export default {
    template: `
        <section class="todo-list-container">
            <ul class="todo-list clean-list flex column" >
                <li  v-for="(todo, idx) in textLength" @click="setDone(idx)" :style="{'display': todo.display}" :key="todo.id" :ref="idx">{{todo.txt}}</li>
            </ul>
            <span v-if="todoCount > 7">Read More...</span>
        </section>
    `,
    props:['note'],
    data(){
        return{
            isTodoDone:false,
            todoCount:this.note.info.todos.length,
        }
    },
    computed:{
        textLength(){
            if(this.note.info.todos.length > 7 ) return this.note.info.todos.slice(0,7)
            else return this.note.info.todos
        }
    },
    methods: {
        setDone(idx) {
            this.isTodoDone = !this.isTodoDone
            this.setStyle(idx)
            this.$emit('setTodoDone', { noteId: this.note.id, todoIdx: idx })
        },
        setStyle(idx){
            this.$refs[idx][0].style = (!this.note.info.todos[idx].doneAt)?'text-decoration: line-through' : 'text-decoration: none';
        },
        // TODO - set class instead of inline style
    },
}

