import mailService from '../services/mail.service.js';

export default {
    template: `
        <section class="mail-compose-container">
            <h2>New Message</h2>
            <form @submit.prevent="submitMail" class="new-msg-form">
                <button @click.prevent="saveAsDraft">X</button>
                <label class="to-label">
                    To:
                    <input class="to-input" type="text" v-model="mail.to">
                </label>
                <label class="cc-label">
                    Cc:
                    <input class="cc-input" type="text" v-model="mail.cc">
                </label>
                <label class="bcc-label">
                    Bcc:
                    <input class="bcc-input" type="text" v-model="mail.bcc">
                </label>
                <input class="subject-input" type="text" placeholder="Subject" v-model="mail.subject">
                <textarea class="body-input" v-model="mail.body"></textarea>
                <button type="submit">Send</button>
            </form>
        </section>
    `,
    data() {
        return {
            mail: mailService.getEmptyMail()
        }
    },
    created() {
        let mailId = this.$route.params.id;
         
         if(mailId) {
             this.mail = mailService.getMailById(mailId);
         }
    },
    methods: {
        submitMail() {
            this.mail.sentAt = Date.now();
            this.mail.state = mailService.MAIL_STATE.sent;
            mailService.addMail(this.mail)
            .then((savedMail) => {
                console.log('The mail sent successfully', JSON.stringify(savedMail));
                this.mail = mailService.getEmptyMail();
            });
        },
        saveAsDraft() {
            this.mail.state = mailService.MAIL_STATE.draft;
            mailService.addMail(this.mail)
            .then((savedMail) => {
                console.log('The mail saved to drafts', JSON.stringify(savedMail));
                this.mail = mailService.getEmptyMail();
            });
        }
    },
    watch: {
        '$route.params.id'() {
            this.mail = mailService.getMailById(mailId);
        }
    }
}