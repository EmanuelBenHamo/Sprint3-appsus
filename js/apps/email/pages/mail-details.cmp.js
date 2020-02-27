import mailService from "../services/mail.service.js"

export default {
    template: `
        <section class="mail-details-container">
            <h1>this is the mail details page</h1>
            {{}}
        </section>
    `,
    props:['mails'],
    watch:{
        '$route.params.id'() {
            console.log('PARAMS')
            // mails.find(mail=>mail.id)
        }
    }
}