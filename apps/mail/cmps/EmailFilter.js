export default {
  template: `
        <section class="email-filter">
            <select class="filter-read" v-model="filterBy.isRead" @change="emitFilter">
                <option value="All">All</option>
                <option value="true">Read</option>
                <option value="false">Unread</option>
            </select>


            <div class="filter-container">
            <div class="filter-subject">
              <form @submit.prevent="emitFilter">
                <i class="glass fa-solid fa-magnifying-glass"></i>
                <input name=subject class="filter-txt" type="text" placeholder="Search emails" v-model="filterBy.subject" @change="emitFilter" />
            </form>
            </div>
            </div>
            

            <select class="filter-trash" v-model="filterBy.isTrash" @change="emitFilter">
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
