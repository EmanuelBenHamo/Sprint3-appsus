export default {
    template: `
        <section class="note-input-container">
            <input type="text" :placeholder="inputPlaceholder">
            <section class="note-type-option-btns-container">
                <button class="note-type-option-btn note-type-txt-btn" @click="inputType='txt'">txt</button>
                <button class="note-type-option-btn note-type-img-btn" @click="inputType='img'">img</button>
                <button class="note-type-option-btn note-type-video-btn" @click="inputType='video'">video</button>
                <button class="note-type-option-btn note-type-audio-btn" @click="inputType='audio'">audio</button>
                <button class="note-type-option-btn note-type-todos-btn" @click="inputType='todos'">todos</button>
                <button class="note-type-option-btn note-type-map-btn" @click="inputType='map'">map</button>
            </section>
        </section>
    `,
    data() {
        return {
            inputType: null
        }
    },
    created() {
        this.inputType = 'txt';
    },
    computed: {
        inputPlaceholder() {
            switch (this.inputType) {
                case 'txt':
                    return "what's on your mind...";
                case 'img':
                    return 'Enter image URL...';
                case 'video':
                    return 'Enter video URL...';
                case 'audio':
                    return 'Enter audio URL...';
                case 'todos':
                    return 'Enter comma seperated list...';
                case 'map':
                    return 'Enter location...';
            }
        }

    }
}