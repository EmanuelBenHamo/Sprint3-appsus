import { keepService } from '../services/keep.service.js';

export default {
    template: `
        <section class="note-input-container">
            <input type="text" :placeholder="inputPlaceholder" v-model="input" @change="onAddedNote">
            <section class="note-type-option-btns-container">
                <button class="note-type-option-btn note-type-txt-btn" @click="onSetInputType(noteTypes.text)">text</button>
                <button class="note-type-option-btn note-type-img-btn" @click="onSetInputType(noteTypes.image)">img</button>
                <button class="note-type-option-btn note-type-video-btn" @click="onSetInputType(noteTypes.video)">video</button>
                <button class="note-type-option-btn note-type-audio-btn" @click="onSetInputType(noteTypes.audio)">audio</button>
                <button class="note-type-option-btn note-type-todos-btn" @click="onSetInputType(noteTypes.todoList)">todos</button>
                <button class="note-type-option-btn note-type-map-btn" @click="onSetInputType(noteTypes.map)">map</button>
            </section>
        </section>
    `,
    data() {
        return {
            noteTypes: keepService.NOTE_TYPES,
            inputType: null,
            input: null
        }
    },
    created() {
        this.inputType = this.noteTypes.text;
    },
    computed: {
        inputPlaceholder() {
            switch (this.inputType) {
                case this.noteTypes.text:
                    return "what's on your mind...";
                case this.noteTypes.image:
                    return 'Enter image URL...';
                case this.noteTypes.video:
                    return 'Enter video URL...';
                case this.noteTypes.audio:
                    return 'Enter audio URL...';
                case this.noteTypes.todoList:
                    return 'Enter comma seperated list...';
                case this.noteTypes.map:
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
            this.input = null;
        },
        onSetInputType(inputType) {
            this.inputType = inputType;
        }
    }
}