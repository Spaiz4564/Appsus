import LongText from '../../../cmps/LongTxt.js'

export default {
  props: ['mail'],
  template: `
    <article class="mail-preview" @click=mailSelected(mail.id)>
        <h1>{{mail.from}}</h1>
        <h4 class=mail-subject>{{mail.subject}}</h4>
        <LongText :txt="mail.body" :length="100" />
        <h5>{{mail.sentAt}}</h5>
    </article>
    `,
  components: {
    LongText,
  },
  methods: {
    mailSelected(mailId) {
      this.$emit('selected', mailId)
    },
  },
}
