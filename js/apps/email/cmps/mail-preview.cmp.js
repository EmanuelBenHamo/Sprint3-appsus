'use strict';

export default {
    template: `
        <section class="mail-preview-container flex" >
            <h1>{{currMail.subject}}</h1>
            <p>{{shortBody}}</p>
        </section>
        `,
        data(){
            return{
                currMail:null,
            }
        },
        props:['mail'],
        computed:{
            shortBody(){
                return this.currMail.body.substring(0,100); 
            }
        },
        created(){
            this.currMail = this.mail
        }
}