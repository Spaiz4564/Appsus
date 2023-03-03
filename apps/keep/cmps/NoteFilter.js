export default {
  template: `
    
    <input
     v-model="filterBy.text"
     @input="filter" 
      class="notes-filter"
       type="text"
        placeholder="Search" />
    
    `,

  data() {
    return {
      filterBy: { title: '', text: '', type: '' },
    }
  },

  methods: {
    filter() {
      this.$emit('filter', this.filterBy)
    },
  },
}
