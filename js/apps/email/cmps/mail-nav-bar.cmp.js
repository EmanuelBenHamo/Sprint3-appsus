'use strict';

export default {
    template: `
    <section :class="{'mail-side-nav-bar-container': true, 'mobile-display': showMobileNavBar}">
        <router-link class="mail-compose-router-link" to="/mail/compose" exact>Compose</router-link>
        <ul ref="navList" class="directories-container clean-list flex column">
            <li @click="setMailsDirectory('inbox', $event)" class="flex space-between active">
                <span>Inbox</span>
                <span class="unread-mails-count">{{unreadMailsCount}}</span>
            </li>
            <li @click="setMailsDirectory('sent',$event)">Sent</li>
            <li @click="setMailsDirectory('draft', $event)">Draft</li>
            <li @click="setMailsDirectory('starred', $event)">Starred</li>
        </ul>
</section>
    `,
    props: ['countUnreadMails', 'showMobileNavBar'],
    computed: {
        unreadMailsCount(){
            if(!this.countUnreadMails){
                return '';
            } else {
                return this.countUnreadMails;
            }
        }
    },
    methods: {
        setMailsDirectory(mailsDirectory, ev) {
            this.setActive(ev);
            // TODO - disable the already pushed button
            this.$router.push({ path: '/mail', query: { directory: mailsDirectory } }).catch(err => { })
        },
        setActive(ev) {
            [...this.$refs.navList.children].forEach(li => li.classList.remove('active'));
            ev.target.classList.add('active');
        }
    }
}