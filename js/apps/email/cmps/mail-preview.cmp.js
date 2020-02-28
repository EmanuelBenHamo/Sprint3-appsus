'use strict';
import { eventBus } from '../../../services/event-bus-service.js';


export default {
    template: `
    <section class="mail-preview-container flex column " @click="onReadMail">
     <section class="shortContent flex align-center space-between" :class="{read: !isRead}">
         <h1>{{mail.subject}}</h1>
             <p>{{shortContent}}</p>
             {{mail.state}}
             <div class="tool-btns flex">

                 <router-link :to="'mail/compose/' + mail.id ">↺</router-link>   
                 <!-- <button class="unread-mail" @click.stop="setAsUnread"><></button> -->
                 <button class="expend-mail" @click.stop="onExpendMail">⛶</button>
                 <button class="remove-mail" @click.stop="onRemoveMail">X</button>
     
             </div>
     </section>  
        <p class="extendedContent" v-if="preview" >{{extendedContent}}</p>
    </section>
    `,
    data(){
        return{
            isRead:true,
            preview:false
        }
    },
    props:['mail'],
    computed:{
        shortContent(){
            return this.mail.body.substring(0,100); 
          
        },
        extendedContent(){
            return this.mail.body.substring(0,1000)
        }
    },
    methods:{
        onReadMail(){
            if(this.mail.state === 'unread'){
                this.isRead = true;
                eventBus.$emit('isRead', this.mail);
            }
            this.preview = !this.preview

        },
        onRemoveMail(){
            eventBus.$emit('onRemoveMail',this.mail.id)
        },
        onExpendMail(){
            this.$router.push('mail/details/'+this.mail.id)
        }
    },
    created(){
        if(this.mail.state === 'unread')this.isRead = false
        
    }   
}