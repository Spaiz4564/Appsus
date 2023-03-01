export default {
  template: `
        <section class="email-filter">
            <select v-model="filterBy.isRead" @change="emitFilter">
                <option value="All">All</option>
                <option value="true">Read</option>
                <option value="false">Unread</option>
            </select>
            <input type="text" placeholder="Search by subject" v-model="filterBy.subject" @input="emitFilter" />
            <select v-model="filterBy.isTrash" @change="emitFilter">
                <option value="All">All</option>
                <option value="true">Trash</option>
                <option value="false">Untrash</option>
            </select>
            

        </section>
    `,
  data() {
    return {
      filterBy: {
        isRead: null,
        subject: '',
        isTrash: null,
      },
    }
  },
  methods: {
    emitFilter() {
      this.$emit('filtered', this.filterBy)
    },
  },
}
