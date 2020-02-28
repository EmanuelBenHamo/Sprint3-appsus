'use strict';
import mailService from '../apps/email/services/mail.service.js';
import mailFilter from '../apps/email/cmps/mail-filter.cmp.js';
import navBar from '../apps/email/cmps/nav-bar.cmp.js'
import pageHeader from '../apps/email/cmps/page-header.cmp.js';
import pageFooter from '../apps/email/cmps/page-footer.cmp.js';
import {eventBus} from '../services/event-bus-service.js';

export default {
    template: `
        <section v-if="mails" class="mail-app-container">
            <page-header></page-header>
            <section class="main-app-section">
                <mail-filter @filtered="setFilter"></mail-filter>
                <!-- <nav-bar @setmailsDirectoryToShow="setmailsDirectoryToShow"></nav-bar> -->
                <nav-bar></nav-bar>
                <section class="main-mail-view">
                    <router-view :mails="mailsToShow"></router-view>
                </section>
            </section>
            <page-footer></page-footer>
        </section>
    `,
    data() {
        return {
            mails: null,
            compose: true,
            filterBy: null,
            mailsDirectoryToShow:'inbox'
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
            let mails = this.mails.filter(mail => {
             if(mail.state === 'read' || mail.state === 'unread') mail.state = 'inbox';
                return mail.state === this.mailsDirectoryToShow
            })
            if (this.filterBy && this.filterBy.mailTxt) {
                let textToMatch = this.filterBy.mailTxt.toLowerCase();
                let filteredMails = mails.filter(mail => mail.subject.toLowerCase().includes(textToMatch) || mail.body.toLowerCase().includes(textToMatch));
                return filteredMails;
            }
            return mails; 
        }
    },
    methods: {
        setFilter(filterBy) {
            this.filterBy = filterBy;
        },
    },
    watch:{
        '$route'(){
        if(this.$route.query.folder) this.mailsDirectoryToShow = this.$route.query.folder;
            else this.mailsDirectoryToShow = 'inbox'
        }
    },
   
    components: {
        mailFilter,
        navBar, 
        pageHeader,
        pageFooter
    },
}