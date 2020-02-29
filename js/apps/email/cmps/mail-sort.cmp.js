export default {
    template: `
        <section class="mail-sort-container">
            <select class="mail-sort-select" @change="onSortChange">
                <option value="time">Time</option>
                <option value="subject">Subject</option>
            </select>
        </section>
    `,
    data() {
        return {
            sortBy: null
        }
    },
    methods: {
        onSortChange(sort) {
            this.sortBy = sort.target.value;
            this.$emit('sorted', JSON.parse(JSON.stringify(this.sortBy)));
        }
    } 
}