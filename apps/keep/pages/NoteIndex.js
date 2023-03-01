import NoteList from '../cmps/NoteList.js'
import { noteService } from '../../keep/services/note-service.js'

export default {
  template: `
<div class="icons-container">
    <div class="icon1"></div>
    <div class="icon2"></div>
  </div>
  <section class="app-filter">
    <input class="search-note" type="text" placeholder="search"/>
    <div className="take-a-note">
    <input type="text" placeholder="Title" />
    <input type="text" placeholder="Take a note" />
    <div class="some-content">
      <button data-title="ToolTip content">ok</button>
      <button >ok2</button>
      <button>ok3</button>
    </div>
   
    </div>
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

  methods: {},

  components: {
    NoteList,
  },

  created() {
    noteService.query().then(notes => (this.notes = notes))
  },
}
