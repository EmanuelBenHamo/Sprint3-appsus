import { eventBus } from '../../../services/event-bus-service.js';

export default {
    template: `
    <section class="mail-preview-container flex column " @click="onReadMail">
        <section class="short-content flex align-center" :class="{unread: !isRead}">
            <h1>{{mail.subject}}</h1>
                <p>{{shortContent}}</p>
                <div class="tool-btns flex justify-end">
                    
                    <router-link v-if="preview" :to="'mail/compose/' + mail.id " class="fa fa-reply" title="Reply"></router-link>   
                    <button v-if="isRead && mailsDirectoryToShow === 'inbox'" class="unread-mail fa fa-envelope" @click.stop="setAsUnread" title="Unread"></button>
                    <button class="expend-mail fa fa-expand" @click.stop="onExpendMail" title="Expand"></button>
                    <button class="remove-mail fa fa-trash" @click.stop="onRemoveMail" title="Remove"></button>
                    <button :class="{'star-mail':true, fa:true, 'fa-star-o': !mail.starred, 'fa-star': mail.starred}" @click.stop="onStarMail" title="Star"></button>

                </div>
        </section>  
        <p class="extended-content" v-if="preview" >{{extendedContent}}</p>
    </section>
    `,
    data() {
        return {
            isRead: true,
            preview: false,
            mailsDirectoryToShow: this.$route.query.directory
        }
    },
    props: ['mail'],
    computed: {
        // currentDirectory(){
        //     return this.$route.query.directory
        // },
        shortContent() {
            return this.mail.body.substring(0, 100);
        },
        extendedContent() {
            return this.mail.body.substring(0, 1000);
        }
    },
    methods: {
        onReadMail() {
            if (this.mail.state === 'unread') {
                this.isRead = true;
                eventBus.$emit('isRead', this.mail);
            }
            this.preview = !this.preview;
        },
        setAsUnread(){
            this.isRead = false;
            eventBus.$emit('isUnread', this.mail) 
        },
        onRemoveMail() {
            eventBus.$emit('onRemoveMail', this.mail.id);
        },
        onExpendMail() {
            this.$router.push('mail/details/' + this.mail.id);
        },
        onStarMail() {
            this.mail.starred = !this.mail.starred;
        }
    },
    created() {
        if (this.mail.state === 'unread') {
            this.isRead = false;
        };

    }
}