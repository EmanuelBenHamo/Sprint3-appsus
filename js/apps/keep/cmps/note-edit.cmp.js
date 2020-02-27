'use strict';
import { eventBus } from '../../../services/event-bus-service.js'

export default {
    template:
        `<section class="long-text-container text-center" v-if="note">
    <button @click="note = null">X</button>
        <h1>Edit text</h1>
        <section class="note-edit-text">
        <textarea ref="input" v-model="text" @input="onNoteUpdate">{{note.info.txt}}</textarea>
        </section>
        {{note}}
    </section>
    `,
    data() {
        return {
            note: null,
            text: ''
        }
    },
    created() {
        eventBus.$on('noteEdit', note => {
            this.note = note
            this.text = this.note.info.txt;
            console.log(note)
        });

        console.log('this.note', this.note)
    },
    mounted() {
        // this.$refs.input.focus()
    },
    methods: {
        onNoteUpdate() {
            this.note.info.txt = this.text
            console.log(this.note)
            eventBus.$emit('noteUpdate', this.note)
        }
    }


}