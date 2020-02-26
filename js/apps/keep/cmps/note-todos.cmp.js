export default {
    template: `
        <section>
            <h1>I am note-todos cmp of keep app</h1>
            <ul>
                <li v-for="todo in info.todos">{{todo.txt}}</li>
            </ul>
            
        </section>
    `,
    props:['info']
}