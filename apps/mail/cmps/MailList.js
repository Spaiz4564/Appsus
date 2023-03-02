import MailPreview from './MailPreview.js'
import { mailService } from '../services/mail.service.js'

export default {
  props: ['mails'],
  template: `
        <section class="mail-list">
            <ul>
                <li v-for="mail in mails" :key="mail.id">
                  <RouterView />
                <RouterLink :to="'/mail/' + mail.id">
                  <RouterLink :to = "'trash/' + mail.id">
                    <MailPreview :mail="mail"
                    @selected="selectMail(mail.id)" 
                    @click="updateMail(mail.id)"
                    @starred="isStar(mail.id)"                 
                    />
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

  created() {
    const mailId = this.$route.params.mailId
    if (mailId) {
      this.selectMail(mailId)
    }
  },
  computed: {
    mailId() {
      return this.$route.params.mailId
    },
  },

  methods: {
    selectMail(mailId) {
      this.selectedMailId = mailId
      console.log('selectedMailId', mailId)
    },

    isStar(mailId) {
      mailService.updateIsStar(mailId)
    },
    updateMail(mailId) {
      mailService.updateIsRead(mailId)
    },
  },

  components: {
    MailPreview,
  },
}
