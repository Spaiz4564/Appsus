import { mailService } from '../services/mail.service.js'

export default {
  template: `
        <section class="mail-details" v-if="mail">
          <h4>Subject:{{mail.subject}}</h4>
            <h3>Sent from:{{mail.from}}</h3>
            <h3>Sent to:{{mail.to}}</h3>
            <p>{{mail.body}}</p>
            <button @click="remove(mail.id)">Delete</button>
            <RouterLink :to="'/mail'">Back</RouterLink>
        </section>
    `,
  data() {
    return {
      mail: null,
    }
  },
  created() {
    const { mailId } = this.$route.params
    mailService.get(mailId).then((mail) => (this.mail = mail))
  },
  methods: {
    remove(mailId) {
      mailService.removeToTrash(mailId)
      this.$router.push('/mail')
    },
  },
}
