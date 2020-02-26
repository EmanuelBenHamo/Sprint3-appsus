import {keepService} from '../services/keep.service.js';

const noteTypes = keepService.NOTE_TYPES;

export default {
    template: `
        <section class="note-input-container">
            <input type="text" :placeholder="inputPlaceholder" v-model="input" @change="onAddedNote">
            <section class="note-type-option-btns-container">
                <button class="note-type-option-btn note-type-txt-btn" @click="inputType='noteTypes.text'">text</button>
                <button class="note-type-option-btn note-type-img-btn" @click="inputType='noteTypes.image'">img</button>
                <button class="note-type-option-btn note-type-video-btn" @click="inputType='noteTypes.video'">video</button>
                <button class="note-type-option-btn note-type-audio-btn" @click="inputType='noteTypes.audio'">audio</button>
                <button class="note-type-option-btn note-type-todos-btn" @click="inputType='noteTypes.todoList'">todos</button>
                <button class="note-type-option-btn note-type-map-btn" @click="inputType='noteTypes.map'">map</button>
            </section>
        </section>
    `,
    data() {
        return {
            inputType: null,
            input: null
        }
    },
    created() {
        this.inputType = noteTypes.text;
    },
    computed: {
        inputPlaceholder() {
            switch (this.inputType) {
                case noteTypes.text:
                    return "what's on your mind...";
                case noteTypes.image:
                    return 'Enter image URL...';
                case noteTypes.video:
                    return 'Enter video URL...';
                case noteTypes.audio:
                    return 'Enter audio URL...';
                case noteTypes.todoList:
                    return 'Enter comma seperated list...';
                case noteTypes.map:
                    return 'Enter location...';
            }
        }
    },
    methods: {
        onAddedNote() {
            let note = {
                type: this.inputType,
                txt: this.input
            }

            this.$emit('addedNote', note);
        }
    }
}