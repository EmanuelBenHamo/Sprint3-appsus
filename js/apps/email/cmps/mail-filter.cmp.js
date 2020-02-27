export default {
    template: `
        <section class="mail-filter-container">
            <input type="text" class="mail-filter-input" placeholder="search mail" v-model="filterBy.mailTxt" @input="onSearchInputChange">
        </section>
    `,
    data(){
        return {
            filterBy: {mailTxt: ''}
        }
    },
    methods: {
        onSearchInputChange(){
            this.$emit('filtered', {...this.filterBy});
        }
    }

}