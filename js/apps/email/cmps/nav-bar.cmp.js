'use strict';

export default {
    template:`
    <section class="mail-nav-bar-container">
    <router-link to="/mail/compose" exact>Compose</router-link>
        <ul ref="navList" class="nav-bar clean-list flex column">
            <li @click="setMailsDirectory('inbox', $event)" class="active">Inbox</li>
            <li @click="setMailsDirectory('sent',$event)">Sent</li>
            <li @click="setMailsDirectory('draft', $event)">Draft</li>
            <li @click="setMailsDirectory('stared', $event)">Stared</li>
        </ul>
        <h4>You Have <span class="unread-mails-count">{{countUnreadMails}}</span> Unread Mails</h4>
</section>
    `,
    props:['countUnreadMails'],
    data(){
        return{
            unreadmails:null
        }
    },
    methods:{
     
        setMailsDirectory(mailsDirectory,ev){
            this.setActive(ev)
            // TODO - disable the already pushed button
            this.$router.push({ path: '/mail', query: { directory: mailsDirectory} }).catch(err => {})

        },
        setActive(ev){
         [...this.$refs.navList.children].forEach(li => li.className = "");
            ev.target.className = 'active';
        }
    }

}