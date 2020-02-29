export default {
    template: `
        <section class="note-filter-container">
            <input type="text" placeholder="Search notes" v-model="filterBy.noteText" @input="onSearchInputChange">
        </section>
    `,
    data() {
        return {
            filterBy: { noteText: '' }
        }
    },
    methods: {
        onSearchInputChange() {
            this.$emit('filtered', { ...this.filterBy });
        }
    },
    
}