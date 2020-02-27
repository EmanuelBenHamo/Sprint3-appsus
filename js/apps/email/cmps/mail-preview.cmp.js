'use strict';

export default {
    template: `
        <section class="mail-preview-container flex" >
            <h1>{{mail.subject}}</h1>
            <p>{{shortBody}}</p>
        </section>
        `,
    props: ['mail'],
    computed: {
        shortBody() {
            return this.mail.body.substring(0, 100);
        }
    }
}