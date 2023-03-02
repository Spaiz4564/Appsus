import LongText from '../../../cmps/LongTxt.js'

export default {
  props: ['mail'],
  template: `

    <article class="mail-preview" @click="mailSelected(mail.id)">
      <div class="mail-header">
        <i v-if="mail.isStared" class="fas fa-star" @click.stop="isStar"></i>
        <i v-else class="far fa-star" @click.stop="isStar"></i>
        <h4 :class="read"@click="changeColor()">{{mail.from}}</h4>
      </div>
      
      <div class="mail-content">
        <h4 @click="changeColor()":class="read">{{mail.subject}}</h4>
        <LongText :txt="mail.body" :length="40" class="mail-body">
          </LongText>
        </div>
        <h5 class="mail-date">{{formatDate}}</h5>
    </article>
    `,
  data() {
    return {
      read: '',
    }
  },
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
    changeColor() {
      this.read = 'read'
      console.log('read', this.mail)
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
