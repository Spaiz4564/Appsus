import { mailService } from '../services/mail.service.js'

import MailList from '../cmps/MailList.js'

export default {
  template: `
        <section class="mail-index">
            <h1>Mail</h1>
            <MailList :mails="mails" />
        </section>
    `,
  data() {
    return {
      mails: null,
    }
  },
  created() {
    mailService.query().then((mails) => (this.mails = mails))
  },
  components: {
    MailList,
  },
}
