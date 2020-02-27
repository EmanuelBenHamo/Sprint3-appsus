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
    watch:{
        'note.info.txt'(to, from){
            this.txt = to
        }
    },
    created(){
        this.txt = this.note.info.txt;
    }
}