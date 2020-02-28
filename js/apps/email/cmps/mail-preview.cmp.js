'use strict';
import { eventBus } from '../../../services/event-bus-service.js';


export default {
    template: `
    <section class="mail-preview-container flex align-center space-between" @click="onReadMail" :class="{read: isUnread}">
        <h1>{{mail.subject}}</h1>
        <p>{{shortBody}}</p>
        <div class="buttons">
            <button class="reply-mail" @click.stop="onReplyMail">↺</button>
            <button class="expend-mail" @click.stop="onExpendMail">⛶</button>
            <button class="remove-mail" @click.stop="onRemoveMail">X</button>
        </div>
    </section>
    `,
    data(){
        return{
            isUnread:false,
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
            if(this.mail.state === 'unread'){
                this.isUnread = false;
                eventBus.$emit('isRead', this.mail);
            }
            this.preview = !this.preview

        },
        onRemoveMail(){
            eventBus.$emit('onRemoveMail',this.mail.id)
        },
        onExpendMail(){
            this.$router.push('mail/details/'+this.mail.id)
        },
        onReplyMail(){
            this.$router.push('compose/'+this.mail.id)

        }
    },
    created(){
        console.log('this.mail.state',this.mail.state);
        if(this.mail.state === 'unread')this.isUnread =true
        
    }   
}