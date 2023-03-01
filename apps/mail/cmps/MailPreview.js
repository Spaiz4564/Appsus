import LongText from '../../../cmps/LongTxt.js'

export default {
  props: ['mail'],
  template: `
    <article class="mail-preview">
      <i class=" star fa-solid fa-star" @click ="isStar"></i>
        <h4 @click="mailSelected(mail.id)">{{mail.from}}</h4>
        <h4 @click="mailSelected(mail.id)">{{mail.subject}}</h4>
        <LongText :txt="mail.body"
         :length="40"
          @click="mailSelected(mail.id)"
          class="mail-body"
          ></LongText>
        <h5 class="mail-date" @click="mailSelected(mail.id)">{{formatDate}}</h5>
    </article>
    `,
  components: {
    LongText,
  },
  methods: {
    mailSelected(mailId) {
      this.$emit('selected', mailId)
    },
    isStar() {
      this.$emit('starred', this.mail)
    },
  },
  computed: {
    formatDate() {
      const date = new Date(this.mail.sentAt)
      const today = new Date()
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)
      if (date.toDateString() === today.toDateString()) {
        //show the hours
        const option = {
          hour: 'numeric',
          minute: 'numeric',
        }
        const formattedDate = new Intl.DateTimeFormat('en-US', option).format(
          date
        )
        return formattedDate
      } else if (date.toDateString() === yesterday.toDateString()) {
        //show date by day and month
        const option = {
          month: 'short',
          day: 'numeric',
        }
        const formattedDate = new Intl.DateTimeFormat('en-US', option).format(
          date
        )
        return formattedDate
      } else {
        //if its more than year ago show the year
        const option = {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }
        const formattedDate = new Intl.DateTimeFormat('en-US', option).format(
          date
        )
        return formattedDate
      }
    },
  },
}
