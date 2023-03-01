import NoteList from '../cmps/NoteList.js'
import { noteService } from '../../keep/services/note-service.js'

export default {
  template: `
  <section class="app-filter">
    <form @submit.prevent="wow" className="take-a-note">
    <input type="text" placeholder="Title" />
    <input type="text" placeholder="Take a note..." />
    <div class="tool-tip-btns">
    <div>
    <span >ok2</span>
    <span data-title="ToolTip content">ok</span>
    <span>ok3</span>
    </div>
    <button class="close-tool-tip">Close</button>
    </div>
    </form>
  </section>

 
   <NoteList :notes="notes" />




`,

  data() {
    return {
      notes: null,
      selectedNote: null,
      filterBy: {},
    }
  },

  methods: {
    wow() {
      console.log('hello')
    },
  },

  components: {
    NoteList,
  },

  created() {
    noteService.query().then(notes => (this.notes = notes))
  },
}
