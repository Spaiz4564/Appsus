import MailPreview from './MailPreview.js'

export default {
  props: ['mails'],
  template: `
        <section class="mail-list">
            <ul>
                <li v-for="mail in mails" :key="mail.id">
                    <MailPreview :mail="mail" />
                </li>
            </ul>
        </section>
    `,
  components: {
    MailPreview,
  },
}
