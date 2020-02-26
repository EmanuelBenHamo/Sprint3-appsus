export default {
    template: `
        <section class="note-text-container">
            <h1>I am note-txt cmp of keep app</h1>
            <textarea v-model="txt" @input="$emit('changed',txt)"></textarea>
        </section>
    `,
    data(){
        return{
            txt :this.info.txt
        }
    },
    props:['info']
}