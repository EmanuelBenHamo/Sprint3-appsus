'use strict';
import {mailService} from '../apps/email/services/mail.service.js'
import mailList from '../../js/apps/email/cmps/mail-list.cmp.js'

export default {
    template: `
        <section v-if="mails" class="mail-app-container">
            <h1>Welcome to the mail app</h1>
            <router-link to="/">Home</router-link>
            <mail-list :mails="mails"></mail-list>
            <mail-compose v-if="compose"></mail-compose>
            </section>
    `,
    data(){
        return{
            mails:null,
        }
    },
    created(){
        mailService.getMails()
        .then(mails => this.mails = mails)
    },
    components:{
        mailList
    },
}