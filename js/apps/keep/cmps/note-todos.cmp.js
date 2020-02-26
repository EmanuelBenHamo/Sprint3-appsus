export default {
    template: `
        <section>
            <h1>I am note-todos cmp of keep app</h1>
            <ul >
                <li  v-for="(todo, idx) in info.todos" @click="setStyle(idx)"  :ref="idx">{{todo.txt}}</li>
            </ul>
        </section>
    `,
    props:['info'],
    data(){
        return{
            isDone:false,
        }
    },
  
    methods:{
        setStyle(idx){
            this.isDone = !this.isDone
            this.$refs[idx][0].style = (this.isDone)?'text-decoration: line-through' : 'text-decoration: none';
        }
    }
 
}

