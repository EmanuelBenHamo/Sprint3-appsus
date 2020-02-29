import { keepService } from '../services/keep.service.js';

export default {
    template: `
        <section class="note-main-input-container">
            <section class="note-input-container flex justify-center">
                <input class="note-input" type="text" :placeholder="inputPlaceholder" v-model="input" @change="onAddedNote">
                <section class="note-type-btns-container">
                    <button class="note-type-btn note-type-txt-btn fa fa-font" @click="onSetInputType(noteTypes.text)"></button>
                    <button class="note-type-btn note-type-img-btn fa fa-image" @click="onSetInputType(noteTypes.image)"></button>
                    <button class="note-type-btn note-type-video-btn fa fa-youtube-play" @click="onSetInputType(noteTypes.video)"></button>
                    <button class="note-type-btn note-type-todos-btn fa fa-list-ul" @click="onSetInputType(noteTypes.todoList)"></button>
                    <!-- <button class="note-type-btn note-type-audio-btn fa fa-volume-up" @click="onSetInputType(noteTypes.audio)"></button> -->
                    <!-- <button class="note-type-btn note-type-map-btn fa fa-map-marker" @click="onSetInputType(noteTypes.map)"></button> -->
                </section>
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