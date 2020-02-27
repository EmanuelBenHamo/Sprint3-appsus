import { eventBus } from '../../../services/event-bus-service.js'

export default {
    template: `
        <section class="todo-list-container">
            <ul class="todo-list clean-list flex column" >
                <li  v-for="(todo, idx) in textLength" @click="setDone(idx)" :style="{'display': todo.display}"  :ref="idx">{{todo.txt}}</li>
            </ul>
        </section>
    `,
    props: ['note'],
    data() {
        return {
            isTodoDone: false,

        }
    },
    computed: {
        textLength() {
            if (this.note.info.todos.length > 7) {
                this.note.info.todos[7].txt = '. . . . .'

                for (var i = 8; i < this.note.info.todos.length; i++) {
                    this.note.info.todos[i].display = 'none'
                }
                return this.note.info.todos
            } else {
                return this.note.info.todos
            }
        }
    },
    methods: {
        setDone(idx) {
            this.isTodoDone = !this.isTodoDone
            this.setStyle(idx)
            this.$emit('setTodoDone', { noteId: this.note.id, todoIdx: idx })
        },
        setStyle(idx) {
            this.$refs[idx][0].style = (!this.note.info.todos[idx].doneAt) ? 'text-decoration: line-through' : 'text-decoration: none';
        }
    },
}

