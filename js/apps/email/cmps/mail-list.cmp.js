'use strict';
import mailPreview from './mail-preview.cmp.js'

export default {
    template: `
        <section class="mail-list-container">
            <mail-preview v-for="mail in mails" :key="mail.id" :mail="mail"></mail-preview>
        </section>
        `,
    props: ['mails'],
    components: {
        mailPreview
    }
}