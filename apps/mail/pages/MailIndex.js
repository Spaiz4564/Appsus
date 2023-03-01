import { mailService } from '../services/mail.service.js'

import MailList from '../cmps/MailList.js'
import EmailFolderList from '../cmps/EmailFolderList.js'
import EmailFilter from '../cmps/EmailFilter.js'

export default {
  template: `
        <section class="mail-index">
            <h1>Mail</h1>
            <EmailFilter @filtered="setFilter" />
            <MailList :mails= "filteredMails" />


        </section>
    `,
  data() {
    return {
      mails: null,
      filterBy: null,
    }
  },
  created() {
    mailService.query().then((mails) => (this.mails = mails))
  },
  methods: {
    setFilter(filterBy) {
      this.filterBy = filterBy
      console.log('filterBy', filterBy)
    },
  },
  computed: {
    filteredMails() {
      if (!this.filterBy) return this.mails
      if (this.filterBy.isRead) {
        const isRead = this.filterBy.isRead === 'true'
        return this.mails.filter((mail) => mail.isRead === isRead)
      }
      if (this.filterBy.subject) {
        return this.mails.filter((mail) =>
          mail.subject.includes(this.filterBy.subject)
        )
      }
    },
  },

  components: {
    MailList,
    EmailFolderList,
    EmailFilter,
  },
}
