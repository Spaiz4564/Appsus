export default {
  props: ['note'],
  template: `
  <section :style="setBg" className="note-details">
<div className="title-pin">
    <div>{{ note.info.title }}</div>
    <i class="fa-solid fa-thumbtack"></i>
</div>
    <div>{{ note.info.txt }}</div>
    <div className="note-tools">
    <i class="fa-solid fa-palette"></i>
    <RouterLink @click="unSetNote"  to="/NoteIndex">Close</RouterLink>
       
    </div>
  
  </section>
   
    
    `,

  methods: {
    unSetNote() {
      this.$emit('unset')
    },
  },

  computed: {
    setBg() {
      return `background-color: ${this.note.style.backgroundColor}`
    },
  },

  //   created() {
  //     console.log('Params:', this.$route.params)
  //     // const { bookId } = this.$route.params
  //     // bookService.get(bookId).then(book => (this.book = book))
  //     console.log('NoteDetails Params:', this.$route.params)
  //     // this.loadBook()
  //   },
}
