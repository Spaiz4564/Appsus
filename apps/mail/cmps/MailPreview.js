export default {
  props: ['mail'],
  template: `
    <article class="mail-preview">
        <h1>{{mail.from}}</h1>
        <h4 class=mail-subject>{{mail.subject}}</h4>
        <h4>{{mail.body}}</h4>
        <h5>{{mail.sentAt}}</h5>

        
    </article>
    `,
}
