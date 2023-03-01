import { mailService } from '../services/mail.service.js'

export default {
  template: `
        <section class="email-trash">
            <h1>{{trashMails}}</h1>
        </section>
    `,
  data() {
    return {
      trashMails: null,
    }
  },
  created() {
    mailService.query().then((mails) => {
      this.trashMails = mails.filter((mail) => mail.isTrash)
    })
  },
}
