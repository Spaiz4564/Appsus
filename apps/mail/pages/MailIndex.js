import { mailService } from '../services/mail.service.js'

import MailList from '../cmps/MailList.js'
import EmailFolderList from '../cmps/EmailFolderList.js'
import EmailFilter from '../cmps/EmailFilter.js'
import { utilService } from '../../../services/util.service.js'

export default {
  template: `
        <section class="mail-index">
            <EmailFilter @filtered="setFilter" />
            <MailList :mails= "filteredMails" />
            <EmailFolderList />


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
        const isAll = this.filterBy.isRead === 'All'
        if (isAll) return this.mails
        return this.mails.filter((mail) => mail.isRead === isRead)
      }
      if (this.filterBy.subject) {
        return this.mails.filter((mail) =>
          mail.subject.includes(this.filterBy.subject)
        )
      }
      if (this.filterBy.isTrash) {
        const isTrash = this.filterBy.isTrash === 'true'
        const isAll = this.filterBy.isTrash === 'All'
        if (isAll) return this.mails
        console.log('isTrash', isTrash)
        return this.mails.filter((mail) => mail.isTrash === isTrash)
      }
    },
  },

  components: {
    MailList,
    EmailFolderList,
    EmailFilter,
  },
}
