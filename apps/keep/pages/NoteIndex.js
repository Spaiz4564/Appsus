import NoteList from '../cmps/NoteList.js'
import { noteService } from '../../keep/services/note-service.js'
import NoteHeader from '../cmps/NoteHeader.js'
import TakeANote from '../cmps/TakeANote.js'

export default {
  template: `
   <NoteHeader @setFilter="settingFilter" />
 
   <TakeANote @changeNoteType="settingsNoteType"  :notes="notes" :note="note"/>



  <section className="note-list">
  <NoteList @set-note="settingsNote" :notes="filteredNotes" />
<RouterView @unset="unSetNote"  v-if="selectedNote"  :note="selectedNote" />
  </section>
 
 
`,

  watch: {
    notes: {
      handler() {
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
    unSetNote() {
      this.selectedNote = null
      console.log('note is null')
    },

    settingsNote(note) {
      this.selectedNote = note
      console.log(note)
    },

    settingFilter(filterBy) {
      this.filterBy = filterBy
    },

    settingsNoteType(type) {
      console.log(type)
      if (type === 'list') {
        this.note = noteService.createNoteList()
      } else if (type === 'text') {
        this.note = noteService.createNewNote()
      }
      console.log(this.note)
    },
  },

  created() {
    noteService.query().then(notes => (this.notes = notes))
    setTimeout(() => console.log(this.notes), 1500)
  },

  computed: {
    filteredNotes() {
      if (!this.filterBy.text) return this.notes

      const searchStr = this.filterBy.text.toLowerCase()
      const filteredNotes = this.notes.filter(note => {
        return note.info.txt.toLowerCase().includes(searchStr)
      })
      return filteredNotes
    },
  },

  components: {
    TakeANote,
    NoteHeader,
    NoteList,
  },
}
