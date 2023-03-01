import { mailService } from '../services/mail.service.js'

export default {
  template: `
        <section class="mail-trash">
            <h1>Trash</h1>
            <ul>
                <li v-for="mail in trash" :key="mail.id">
                    <h3>{{mail.subject}}</h3>
                    <p>{{mail.body}}</p>
                    <button @click="unTrash(mail.id)">Untrash</button>
                </li>
            </ul>
            
        </section>    
    `,
  data() {
    return {
      trash: null,
    }
  },
  created() {
    mailService.query().then((mails) => (this.trash = mails))
  },
  methods: {
    unTrash(mailId) {
      mailService.unTrash(mailId)
    },
  },
}
