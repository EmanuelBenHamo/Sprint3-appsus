import { eventBus } from '../../../services/event-bus-service.js';

export default {
    template: `
        <section class="user-msg-container" v-if="showMsg">
            <button @click="onCloseUserMessage">X</button>
            <div class="user-msg">{{msg}}</div>
        </section>
    `,
    data() {
        return {
            msg: null,
            showMsg: false,
            displayTime: 2000,
            timeout: null
        }
    },
    created() {
        eventBus.$on('showUserMsg', (msg) => {
            clearTimeout(this.timeout);
            this.msg = msg.txt;
            this.showMsg = true;
            this.timeout = setTimeout(() => {
                this.showMsg = false;
            }, this.displayTime);
        })
    },
    methods: {
        onCloseUserMessage() {
            clearTimeout(this.timeout);
            this.showMsg = false;
        }
    }
}
