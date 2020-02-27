'use strict';
import mailPreview from './mail-preview.cmp.js'

export default {
    template: `
        <section class="mail-list-container">
            <h1>Mail List</h1>
            <mail-preview v-for="mail in mails" :mail="mail"></mail-preview>
        </section>
        `,
        props:['mails'],
        data(){
            return{
            }
        },
        components:{
            mailPreview
        }
}