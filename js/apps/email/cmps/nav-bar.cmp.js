'use strict';

export default {
    template:`
    <section class="mail-nav-bar-container">
    <router-link to="/mail/compose" exact>Compose</router-link>
        <ul ref="navList" class="nav-bar clean-list flex column">
            <li @click="setMailsDirectory('inbox', $event)">Inbox</li>
            <li @click="setMailsDirectory('sent',$event)">Sent</li>
            <li @click="setMailsDirectory('draft', $event)">Draft</li>
            <li @click="setMailsDirectory('starred', $event)">Starred</li>
        </ul>
</section>
    `,
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