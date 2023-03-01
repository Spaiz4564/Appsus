import MailPreview from './MailPreview.js'
import { mailService } from '../services/mail.service.js'

export default {
  props: ['mails'],
  template: `
        <section class="mail-list">
            <ul>
                <li v-for="mail in mails" :key="mail.id">
                    <MailPreview :mail="mail" @selected="selectMail"  @click="updateMail(mail.id)"/>
                    <div>
                    </div>
                </li>
            </ul>
        </section>
    `,

  data() {
    return {
      selectedMailId: null,
      mail: null,
    }
  },

  methods: {
    selectMail(mailId) {
      console.log('mailId', mailId)
      this.selectedMailId = mailId
      this.$router.push(`/mail/${mailId}`)
    },
    updateMail(mailId) {
      mailService.updateIsRead(mailId)
      console.log('mailId', mailId)
    },
  },

  components: {
    MailPreview,
  },
}
