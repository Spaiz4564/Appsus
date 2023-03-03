import NotePreview from './NotePreview.js'
import { noteService } from '../services/note-service.js'
import PinnedNotes from '../cmps/PinnedNotes.js'

export default {
  props: ['notes'],
  template: `

       <!-- <PinnedNotes /> -->

     <div class="container">

     <section class="notes">
   
            <ul class="notes-list">
                <li class="note" v-for="note in notes" :key="note.id">
            
                    <notePreview @removeNote="removeNote"   @click="setSelectedNote(note)"  :note="note" />
            
                </li>
            </ul>
         
        </section>
        </div>  
    
    `,

  methods: {
    setSelectedNote(note) {
      this.$emit('setNote', note)
    },
    removeNote(noteId) {
      console.log(noteId)
      noteService.remove(noteId).then(() => {
        const idx = this.notes.findIndex(note => note.id === noteId)
        this.notes.splice(idx, 1)
      })

      console.log('Note Removed')
    },
  },

  components: {
    PinnedNotes,
    NotePreview,
  },
}
