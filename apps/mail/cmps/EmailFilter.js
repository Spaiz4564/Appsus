export default {
  template: `
        <section class="email-filter">
            <select v-model="filterBy.isRead" @change="emitFilter">
                <option value="">All</option>
                <option value="true">Read</option>
                <option value="false">Unread</option>
            </select>
            <input type="text" placeholder="Search by subject" v-model="filterBy.subject" @input="emitFilter" />

        </section>
    `,
  data() {
    return {
      filterBy: {
        isRead: null,
        subject: '',
      },
    }
  },
  methods: {
    emitFilter() {
      this.$emit('filtered', this.filterBy)
    },
  },
}
