import NotePreview from './NotePreview.js'

export default {
  props: ['notes'],
  template: `
     <div class="container">

     <section class="notes">
   
            <ul class="notes-list">
                <li class="note" v-for="note in notes" :key="note.id">
            
                    <notePreview @click="setSelectedNote(note)"  :note="note" />
            
                </li>
            </ul>
         
        </section>
        </div>  
    
    `,

  methods: {
    setSelectedNote(note) {
      console.log('hello')
      this.$emit('setNote', note)
    },
  },

  components: {
    NotePreview,
  },
}
