'use strict';
import { eventBus } from '../../../services/event-bus-service.js';


export default {
    template: `
    <section class="mail-preview-container flex align-center space-between" @click="onReadMail" :class="{read: isRead}">
        <h1>{{mail.subject}}</h1>
        <p>{{shortBody}}</p>
        <div class="buttons">

            <button class="expend-mail" @click.stop="onExpendMail">&#9744;</button>
            <button class="remove-mail" @click.stop="onRemoveMail">X</button>
        </div>
    </section>
    `,
    data(){
        return{
            isRead:false,
            preview:false
        }
    },
    props:['mail'],
    computed:{
        shortBody(){
            if(!this.preview){
                return this.mail.body.substring(0,100); 
            }else{
                return this.mail.body
            }
        },
    },
    methods:{
        onReadMail(){
            this.isRead = true;
            eventBus.$emit('isRead', this.mail);
            this.preview = !this.preview

        },
        onRemoveMail(){
            eventBus.$emit('onRemoveMail',this.mail.id)
        },
        onExpendMail(){
            this.$router.push('/details/'+this.mail.id)
        }
    }   
}