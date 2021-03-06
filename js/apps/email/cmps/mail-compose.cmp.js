import mailService from '../services/mail.service.js';

export default {
    template: `
        <section v-if="mail" class="mail-compose-container flex column align-start ">
            <h2 class="new-msg-header">New Message</h2>
            <form @submit.prevent="submitMail" class="new-msg-form flex column">
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
                <textarea class="body-input" v-model="mail.body" rows="10"></textarea>
                <div class="mail-compose-btns flex space-between">
                    <button class="send-mail-btn" type="submit">Send</button>
                    <button @click.prevent="saveAsDraft" class="draft-mail-btn fa fa-times"></button>
                </div>
            </form>
        </section>
    `,
    // TODO - ADD A FROM FIELD TO BE FILLED AUTOMATICLY

    data() {
        return {
            mail: null,
            isNewMail: null
        }
    },
    created() {
        this.loadMail();
    },
    methods: {
        loadMail(){
            let mailId = this.$route.params.id;
         
            if(mailId) {
                this.isNewMail = false;
                mailService.getMailById(mailId)
                .then((mail) => {
                    if(mail.state === mailService.MAIL_STATE.read) {
                        mail.subject = 'Re:' + mail.subject;
                    }
                    this.mail = mail;
                });
            } else {
                this.isNewMail = true;
                mailService.getEmptyMail()
                .then(emptyMail => {
                    console.log('EMPTY MAIL')
                return this.mail = emptyMail
                });
            }
        },
        submitMail() {
            this.mail.sentAt = Date.now();
            this.mail.state = mailService.MAIL_STATE.sent;
            if(this.isNewMail){
                mailService.addMail(this.mail)
                .then((savedMail) => {
                    console.log('The mail sent successfully', JSON.stringify(savedMail));
                    mailService.getEmptyMail()
                    .then(emptyMail => this.mail = emptyMail);
                });
            } else {
                mailService.updateMail(this.mail)
                .then((savedMail) => {
                    console.log('The mail sent successfully', JSON.stringify(savedMail));
                    mailService.getEmptyMail()
                    .then(emptyMail => this.mail = emptyMail);
                });
            }
            this.$router.push('/mail');          
        },
        saveAsDraft() {
            this.mail.state = mailService.MAIL_STATE.draft;
            if(this.isNewMail){
                mailService.addMail(this.mail)
                .then((savedMail) => {
                    console.log('The mail saved to drafts', savedMail.subject);
                    this.mail = mailService.getEmptyMail();
                    this.$router.push('/mail');
                });
            } else {
                mailService.updateMail(this.mail)
                .then((savedMail) => {
                    console.log('The mail saved to drafts', savedMail.subject);
                    this.mail = mailService.getEmptyMail();
                    this.$router.push('/mail');
                });
            }
        }
    },
    watch: {
        '$route.params.id'() {
            this.loadMail();
        }
    }
}