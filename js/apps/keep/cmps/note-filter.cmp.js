export default {
    template: `
        <section class="note-filter-container">
            <input type="text" placeholder="Search notes" @input="onSearchInputChange">
        </section>
    `,
    data(){
        return {
            filterBy: {noteText: ''}
        }
    },
    methods: {
        onSearchInputChange(searchInput) {
            this.filterBy.noteText = searchInput;
            this.$emit('filtered', {...this.filterBy});
        }
    }
}