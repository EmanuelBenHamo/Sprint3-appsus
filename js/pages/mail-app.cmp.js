'use strict';
import mailService from '../apps/email/services/mail.service.js';
import mailFilter from '../apps/email/cmps/mail-filter.cmp.js';
import mailNavBar from '../apps/email/cmps/mail-nav-bar.cmp.js'
import mailSort from '../apps/email/cmps/mail-sort.cmp.js';
import { eventBus } from '../services/event-bus-service.js';

export default {
    template: `
    <section class="mail-app-container flex column grow-1" v-if="mails">
        <button class="hamburger-btn fa fa-bars" @click="showMobileNavBar = !showMobileNavBar"></button>
        <section class="main-mail-view flex space-between">
            <mail-nav-bar :showMobileNavBar="showMobileNavBar" @hideMobileNavBar="hideMobileNavBar" class="mail-side-nav-bar flex column" :countUnreadMails="countUnreadMails"></mail-nav-bar>
                <section class="main-mail-list-view flex grow-1 column ">
                    <section class="mail-custom-display-container flex">
                        <mail-filter class="mail-filter" @filtered="setFilter" :showReadStateFilter="showReadStateFilter"></mail-filter>
                        <mail-sort class="mail-sort" @sorted="setSort"></mail-sort>
                    </section>
                    <router-view class="mail-router-view" :mails="mailsToShow"></router-view>
            </section>
        </section>
    </section>
    `,
    data() {
        return {
            showMobileNavBar: false,
            mails: null,
            currentWatchedMail: null,
            compose: true,
            filterBy: null,
            sortBy: null,
            mailsDirectoryToShow: 'inbox',
            showReadStateFilter: true
        }
    },
    created() {
        this.loadMails();
        this.addIsReadEventListener();
        this.addIsUnreadEventListener();
        this.addRemoveMailEventListener();
    },
    computed: {
        mailsToShow() {
            let filteredMails = this.mails.filter(this.isMailMatchShowState)
                .filter(this.isMailMatchSearchText)
                .filter(this.isMailMatchReadState);

            if (this.currentWatchedMail && !filteredMails.find(mail => mail.id === this.currentWatchedMail.id)) {
                filteredMails.push(this.currentWatchedMail);
            }

            filteredMails = filteredMails.sort(this.compareMails);
            return filteredMails;
        },
        countUnreadMails() {
            let unreadMails = this.mails.filter(mail => mail.state === mailService.MAIL_STATE.unread);
            return unreadMails.length;
        }
    },
    methods: {
        addRemoveMailEventListener() {
            eventBus.$on('onRemoveMail', mailId => {
                this.currentWatchedMail = null;
                mailService.removeMail(mailId)
                    .then(() => console.log('Mail has been removed!'))
            });
        },
        addIsReadEventListener() {
            eventBus.$on('isRead', mail => {
                this.currentWatchedMail = mail;
                mail.state = mailService.MAIL_STATE.read;
                mailService.updateMail(mail)
                    .then(() => console.log('Mail is read'))
            });
        },
        addIsUnreadEventListener() {
            eventBus.$on('isUnread', mail => {
                mail.state = mailService.MAIL_STATE.unread;
                mailService.updateMail(mail)
                    .then(() => console.log('Mail is unread'))
            })
        },
        loadMails() {
            mailService.getMails()
                .then(mails => this.mails = mails);
        },
        compareMails(firstMail, secondMail) {
            if (!this.sortBy || this.sortBy === 'time') {
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
            if (this.mailsDirectoryToShow === 'starred') {
                return mail.starred;
            } else {
                let currComputedMailDirectory = mail.state;
                if (mail.state === mailService.MAIL_STATE.read || mail.state === mailService.MAIL_STATE.unread) {
                    currComputedMailDirectory = 'inbox';
                }
                return currComputedMailDirectory === this.mailsDirectoryToShow;
            }
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
        },
        hideMobileNavBar(){
            this.showMobileNavBar = !this.showMobileNavBar
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
            this.currentWatchedMail = null;
        },
        'filterBy'() {
            this.currentWatchedMail = null;
        }
    },
    components: {
        mailFilter,
        mailNavBar,
        mailSort
    }
}