export default {
  template: `
        <section class="mail-folders">
            <ul>
              <li v-for="folder in folders" :key="folder.id" @click="folderSelected(folder.id)">
                  <RouterLink :to="'/mail/' + folder.name">
                    <i v-if="folder.name === 'Inbox'" class="fa-solid fa-inbox"></i>
                    <i v-else-if="folder.name === 'Sent'" class="fa-solid fa-paper-plane"></i>
                    <i v-else-if="folder.name === 'Trash'" class="fa-solid fa-trash"></i>
                    <i v-else-if="folder.name === 'Draft'" class="fa-solid fa-file-edit"></i>
                    <i v-else-if="folder.name === 'Starred'" class="fa-solid fa-star"></i>
                    <span>{{folder.name}}</span>
                  </RouterLink>
                </li>
            </ul>
        </section>
    `,
  data() {
    return {
      folders: [
        {
          id: 1,
          name: 'Inbox',
        },
        {
          id: 2,
          name: 'Sent',
        },
        {
          id: 3,
          name: 'Trash',
        },
        {
          id: 4,
          name: 'Draft',
        },
        {
          id: 5,
          name: 'Starred',
        },
      ],
    }
  },
  methods: {
    folderSelected(folderId) {
      this.$emit('folderSelected', folderId)
    },
  },
}
