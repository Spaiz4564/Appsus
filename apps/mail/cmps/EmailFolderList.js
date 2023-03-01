// • Allow filtering by different folders: inbox / sent / trash/ draft

export default {
  template: `
        <section class="mail-folders">
            <ul>
                <li v-for="folder in folders" :key="folder.id">
                    <RouterLink :to="folder.path">{{folder.name}}</RouterLink>
                </li>
            </ul>
        </section>
    `,
  data() {
    return {
      folders: [
        { id: 1, name: 'Inbox', path: '/mail' },
        { id: 2, name: 'Sent', path: '/mail/sent' },
        { id: 3, name: 'Trash', path: '/mail/trash' },
        { id: 4, name: 'Draft', path: '/mail/draft' },
      ],
    }
  },
}
