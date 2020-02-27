import mailService from '../services/mail.service.js';

export default {
    template: `
        <section v-if="mail" class="flex column align-start mail-compose-container">
            <h2 class="new-msg-header">New Message</h2>
            <form @submit.prevent="submitMail" class="flex column new-msg-form">
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
            <button @click.prevent="saveAsDraft" class="draft-mail-btn">X</button>
        </section>
    `,
    data() {
        return {
            mail: null
        }
    },
    created() {
        this.loadMail();
    },
    methods: {
        loadMail(){
            let mailId = this.$route.params.id;
         
            if(mailId) {
                mailService.getMailById(mailId)
                .then((mail) => {
                    if(mail.state === mailService.MAIL_STATE.read) {
                        mail.subject = 'Re:' + mail.subject;
                    }
                    this.mail = mail;
                });
            } else {
                mailService.getEmptyMail()
                .then(emptyMail => this.mail = emptyMail);
            }
        },
        submitMail() {
            this.mail.sentAt = Date.now();
            this.mail.state = mailService.MAIL_STATE.sent;
            mailService.addMail(this.mail)
            .then((savedMail) => {
                console.log('The mail sent successfully', JSON.stringify(savedMail));
                mailService.getEmptyMail()
                .then(emptyMail => this.mail = emptyMail);
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
            this.loadMail();
        }
    }
}