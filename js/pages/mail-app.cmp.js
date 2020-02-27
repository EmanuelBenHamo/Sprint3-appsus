'use strict';
import mailService from '../apps/email/services/mail.service.js';
import mailFilter from '../apps/email/cmps/mail-filter.cmp.js';
import mailList from '../../js/apps/email/cmps/mail-list.cmp.js';

export default {
    template: `
        <section v-if="mails" class="mail-app-container">
            <h1>Welcome to the mail app</h1>
            <router-link to="/">Home</router-link>
            <mail-filter @filtered="setFilter"></mail-filter>
            <mail-list :mails="mailsToShow"></mail-list>
            <mail-compose v-if="compose"></mail-compose>
        </section>
    `,
    data() {
        return {
            mails: null,
            compose: false,
            filterBy: null
        }
    },
    created() {
        mailService.getMails()
            .then(mails => this.mails = mails)
    },
    computed: {
        mailsToShow() {
            if (!this.filterBy || !this.filterBy.mailTxt) {
                return this.mails;
            }
            return this.mails.filter(mail => mail.subject.includes(this.filterBy.mailTxt) || mail.body.includes(this.filterBy.mailTxt));
        }
    },
    methods: {
        setFilter(filterBy) {
            this.filterBy = filterBy;
        }
    },
    components: {
        mailList,
        mailFilter
    },
}