'use strict';
import mailList from '../../js/apps/email/cmps/mail-list.cmp.js'

export default {
    template: `
        <section class="mail-app-container">
            <h1>Welcome to the mail app</h1>
        <router-link to="/">Home</router-link>
        <mail-list></mail-list>

        </section>
    `,
    components:{
        mailList
    }
}