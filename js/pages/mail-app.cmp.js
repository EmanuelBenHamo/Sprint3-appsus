'use strict';
import mailService from '../apps/email/services/mail.service.js';
import mailFilter from '../apps/email/cmps/mail-filter.cmp.js';
import navBar from '../apps/email/cmps/nav-bar.cmp.js'
import mailSort from '../apps/email/cmps/mail-sort.cmp.js';
import { eventBus } from '../services/event-bus-service.js';

export default {
    template: `
        <section v-if="mails" class="mail-app-container flex column">
            <section class="filter-container flex space-between align-center ">
                <mail-filter @filtered="setFilter" :showReadStateFilter="showReadStateFilter"></mail-filter>
                <mail-sort @sorted="setSort"></mail-sort>
            </section>
            <section class="main-app-section">
                <nav-bar class="nav-bar flex column grow 1" :countUnreadMails="countUnreadMails"></nav-bar>
                <section class="main-mail-view flex grow-3">
                    <router-view :mails="mailsToShow"></router-view>
                </section>
            </section>
        </section>
    `,
    data() {
        return {
            mails: null,
            compose: true,
            filterBy: null,
            sortBy: null,
            mailsDirectoryToShow: 'inbox',
            showReadStateFilter: true,
            unwatchMailReadState: null
        }
    },
    created() {
        mailService.getMails()
            .then(mails => this.mails = mails);

        eventBus.$on('isRead', mail => {
            if (this.unwatchMailReadState) {
                this.unwatchMailReadState();
            };
            if (this.filterBy && this.filterBy.mailReadState === 'all') {
                mail.state = mailService.MAIL_STATE.read;
                mailService.updateMail(mail)
                    .then(() => console.log('Mail is read'));
            } else {
                this.unwatchMailReadState = this.$watch('filterBy.mailReadState', (newMailReadState) => {
                    this.unwatchMailReadState();
                    mail.state = newMailReadState;
                    mailService.updateMail(mail)
                        .then(() => console.log('Mail is read'));
                });
            }
        })
        eventBus.$on('onRemoveMail', mailId => {
            mailService.removeMail(mailId)
                .then(() => console.log('Mail has been removed!'))
        })
    },
    computed: {
    
        mailsToShow() {
            return this.mails.filter(this.isMailMatchShowState)
                .filter(this.isMailMatchSearchText)
                .filter(this.isMailMatchReadState)
                .sort(this.compareMails);
        },
        countUnreadMails() {
            let unreadMails = this.mails.filter(mail => mail.state === mailService.MAIL_STATE.unread);
            return unreadMails.length;
        }
    },
    methods: {
        compareMails(firstMail, secondMail) {
            if (!this.sortBy) {
                return 0;
            }

            if (this.sortBy === 'time') {
                return firstMail.sentAt - secondMail.sentAt;
            } else if (this.sortBy === 'subject') {
                return firstMail.subject.toLowerCase().localeCompare(secondMail.subject.toLowerCase());
            } else {
                return 0;
            }
        },
        setSort(sortBy) {
            this.sortBy = sortBy;
        },
        setFilter(filterBy) {
            this.filterBy = filterBy;
        },
        isMailMatchShowState(mail) {
            let currComputedMailDirectory = mail.state;
            if (mail.state === mailService.MAIL_STATE.read || mail.state === mailService.MAIL_STATE.unread) {
                currComputedMailDirectory = 'inbox';
            }

            return currComputedMailDirectory === this.mailsDirectoryToShow;
        },
        isMailMatchSearchText(mail) {
            if (this.filterBy && this.filterBy.mailTxt) {
                let textToMatch = this.filterBy.mailTxt.toLowerCase();
                return mail.subject.toLowerCase().includes(textToMatch) || mail.body.toLowerCase().includes(textToMatch);
            }
            return true;
        },
        isMailMatchReadState(mail) {
            if (!this.filterBy || !this.filterBy.mailReadState || this.filterBy.mailReadState === 'all') {
                return true;
            }

            return mail.state === this.filterBy.mailReadState;
        }
    },
    watch: {
        '$route'() {
            if (this.$route.query.directory) {
                this.mailsDirectoryToShow = this.$route.query.directory;
            }
            if (this.mailsDirectoryToShow === 'inbox' || this.mailsDirectoryToShow === 'starred') {
                this.showReadStateFilter = true;
            } else {
                this.showReadStateFilter = false;
            }
        }
    },
    components: {
        mailFilter,
        navBar,
        mailSort
    }
}