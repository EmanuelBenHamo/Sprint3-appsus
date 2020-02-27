export default {
    template: `
        <section class="note-text-container" v-if="txt">
            <p>{{txt}}</p>
        </section>
    `,
    data(){
        return{
            txt: '',
        }
    },
    props:['note'],

    created(){
        this.txt = this.note.info.txt;
    }
}