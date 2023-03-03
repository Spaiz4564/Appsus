import { noteService } from '../services/note-service.js'
import { svgService } from '../../../services/svg-service.js'

export default {
  props: ['note', 'notes'],
  template: `
       <section class="app-filter">

   <div className="take-a-note">

       <div className="title-tag">
           <input v-model="note.info.title" type="text" placeholder="Title" />
           <i @click="pinNote" class="fa-solid fa-thumbtack"></i>
       </div>

   <textarea spellcheck="false" style="resize: none; overflow: hidden" v-model="note.info.txt" :placeholder="text"></textarea>

   <div class="tool-tip-btns">

   <div class="note-type">
     <i @click="onChangeNoteType('text')" data-title="Text" class="fa-solid fa-font"></i>
   <i @click="onChangeNoteType('list')" data-title="List" class="fa-solid fa-list"></i>
   <i data-title="Image" class="fa-regular fa-file-image"></i>
   </div>

   <button @click="onSaveNote" class="close-tool-tip">Close</button>

   </div>

   </div>

 </section>
    
    `,

  methods: {
    onSaveNote() {
      if (!this.note.info.txt) return
      noteService.saveNote(this.note).then(note => {
        this.notes.unshift(note)
      })
    },

    getSvg(iconName) {
      return svgService.getSvg(iconName)
    },

    pinNote() {
      console.log('hello')
    },

    onChangeNoteType(type) {
      this.$emit('changeNoteType', type)
    },
  },

  computed: {
    text() {
      return this.note.type === 'NoteTxt'
        ? 'Take a note...'
        : 'Enter comma separated list...'
    },
  },
}
