export default {
    template: `
        <section class="note-text-container" v-if="txt">
            <h1>I am note-txt cmp of keep app</h1>
            
            <!-- <textarea v-model="txt" @input="$emit('changed',txt)"></textarea> -->
        <p>{{txt}}</p>
        </section>
    `,
    data(){
        return{
            txt: '',
        }
    },
    props:['info'],

    created(){
        this.txt = this.info.txt;
    }
}