export default {
    template: `
        <section class="mail-filter-container flex space-between"> 
            <input ref="input" type="text" class="mail-filter-input" placeholder="Search mail" v-model="filterBy.mailTxt" @input="onSearchInputChange">
            <select v-if="showReadStateFilter" @change="onMailStateFilterChange">
                Filter:
                <option value="all">All</option>
                <option value="read">Read</option>
                <option value="unread">Unread</option>
            </select>
        </section>
    `,
    props: ['showReadStateFilter'],
    data(){
        return {
            filterBy: {mailTxt: '', mailReadState: null}
        }
    },
    mounted(){
        this.$refs.input.focus();
    },
    methods: {
        onSearchInputChange(){
            this.$emit('filtered', {...this.filterBy});
        },
        onMailStateFilterChange(ev){
            let selectedOption = ev.target.value;
            this.filterBy.mailReadState = selectedOption;
            this.$emit('filtered', {...this.filterBy});
        }
    },
    watch:{
        '$route'(){
            this.$refs.input.focus();
            this.filterBy.mailTxt = '';
            this.onSearchInputChange();
        }
    }

}