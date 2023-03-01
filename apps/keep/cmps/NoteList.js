import NotePreview from './NotePreview.js'

export default {
  props: ['notes'],
  template: `
     <div class="container">

     <section class="notes">
            <ul class="notes-list">
                <li class="note" v-for="note in notes" :key="note.id">
                    
                    <notePreview :note="note" />
            
                </li>
            </ul>
         
        </section>
        </div>  
    
    `,

  components: {
    NotePreview,
  },
}
