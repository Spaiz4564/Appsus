import NoteList from '../cmps/NoteList.js'
import { noteService } from '../../keep/services/note-service.js'

export default {
  template: `
  <section class="app-filter">
    <form @submit.prevent="onSaveNote" className="take-a-note">
    <input v-model="note.info.title" type="text" placeholder="Title" />
    <input v-model="note.info.txt" type="text" placeholder="Take a note..." />
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

 <div>
    
   </div>
   
   <NoteList :notes="notes" />

`,

  watch: {
    notes: {
      handler() {
        console.log('notes changed')
        this.note = noteService.createNewNote()
      },
      deep: true,
    },
  },

  data() {
    return {
      note: noteService.createNewNote(),
      notes: null,
      selectedNote: null,
      filterBy: {},
    }
  },

  methods: {
    onSaveNote() {
      noteService.saveNote(this.note).then(note => {
        this.notes.unshift(note)
      })
    },
  },

  components: {
    NoteList,
  },

  created() {
    noteService.query().then(notes => (this.notes = notes))
  },
}
