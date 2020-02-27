'use strict';
import mailService from '../apps/email/services/mail.service.js';
import mailFilter from '../apps/email/cmps/mail-filter.cmp.js';
// import mailList from '../../js/apps/email/cmps/mail-list.cmp.js';
import {eventBus} from '../services/event-bus-service.js';
import mailCompose from '../apps/email/cmps/mail-compose.cmp.js';

export default {
    template: `
        <section v-if="mails" class="mail-app-container">
            <h1>Welcome to the mail app</h1>
            <router-link to="/">Home</router-link>
            <mail-filter @filtered="setFilter"></mail-filter>
            <!-- <mail-list :mails="mailsToShow"></mail-list> -->
            <mail-compose v-if="compose"></mail-compose>
            <section class="main-mail-view">
                <router-view :mails="mailsToShow"></router-view>
            </section>
        </section>
    `,
    data() {
        return {
            mails: null,
            compose: true,
            filterBy: null
        }
    },
    created() {
        mailService.getMails()
            .then(mails => this.mails = mails);
        
        eventBus.$on('isRead', mail =>{
            mail.state = mailService.MAIL_STATE.read;
            mailService.updateMail(mail)
            .then(() => console.log('Mail is read'))
        })
        eventBus.$on('onRemoveMail', mailId =>{
            mailService.removeMail(mailId)
            .then(() => console.log('Mail has been removed!'))
        })
    },
    computed: {
        mailsToShow() {
            if (this.filterBy && this.filterBy.mailTxt) {
                let textToMatch = this.filterBy.mailTxt.toLowerCase();
                let filteredMails = this.mails.filter(mail => mail.subject.toLowerCase().includes(textToMatch) || mail.body.toLowerCase().includes(textToMatch));
                return filteredMails;
            }
            return this.mails;
        }
    },
    methods: {
        setFilter(filterBy) {
            this.filterBy = filterBy;
        }
    },
   
    components: {
        mailList,
        mailFilter,
        mailCompose
    },
}