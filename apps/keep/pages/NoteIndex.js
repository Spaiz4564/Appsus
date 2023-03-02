import NoteList from '../cmps/NoteList.js'
import { noteService } from '../../keep/services/note-service.js'

export default {
  template: `

  <section class="app-filter">
   
    <div className="take-a-note">
    <input v-model="note.info.title" type="text" placeholder="Title" />
    <textarea style="resize: none; overflow: hidden" v-model="note.info.txt" placeholder="Take a note..."  cols="30" rows="10"></textarea>
    <div class="tool-tip-btns">
    <div>
    <span >ok2</span>
    <span data-title="ToolTip content">ok</span>
    <span>ok3</span>
    </div>
    <button @click="onSaveNote" class="close-tool-tip">Close</button>
    </div>
    </div>
  </section>

  <section className="note-list">
  <NoteList @set-note="settingsNote" :notes="notes" />
<RouterView @unset="unSetNote"  v-if="selectedNote"  :note="selectedNote" />
  </section>
 
 
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
      if (!this.note.info.txt) return
      noteService.saveNote(this.note).then(note => {
        this.notes.unshift(note)
      })
    },

    unSetNote() {
      this.selectedNote = null
      console.log('note is null')
    },

    settingsNote(note) {
      this.selectedNote = note
      console.log(note)
    },
  },

  created() {
    noteService.query().then(notes => (this.notes = notes))
  },

  components: {
    NoteList,
  },
}
