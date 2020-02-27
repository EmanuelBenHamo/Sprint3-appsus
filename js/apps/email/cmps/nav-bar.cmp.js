'use strict';

export default {
    template:`
    <section class="mail-nav-bar-container">
    <router-link to="/mail/compose">Compose</router-link>
        <ul ref="navList" class="nav-bar clean-list">
            <li @click="setMailsStateToShow('inbox'), setActive($event)">Inbox</li>
            <li @click="setMailsStateToShow('sent'), setActive($event)">Sent</li>
            <li @click="setMailsStateToShow('draft'), setActive($event)">Draft</li>
            <li @click="setMailsStateToShow('stared'), setActive($event)">Stared</li>
        </ul>
</section>
    `,
    data(){
        return{
          
        }
    },
    methods:{
        setMailsStateToShow(mailStatus){
            this.$emit('setMailsStateToShow',mailStatus)
        },
        setActive(ev){
         [...this.$refs.navList.children].forEach(li => li.className = "");
            ev.target.className = 'active';
        }
    }

}