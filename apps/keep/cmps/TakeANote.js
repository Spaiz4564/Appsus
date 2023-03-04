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

   <textarea  v-if="note.type !== 'NoteImg'" spellcheck="false" style="resize: none; overflow: hidden" v-model="note.info.txt" :placeholder="text"></textarea>
   <div class="upload-an-img" v-if="note.type === 'NoteImg'" >Upload an image... <input class="img-input" v-if="this.note.type === 'NoteImg'" type="file" accept="image/jpeg" @change=uploadImage></div>

   <div class="tool-tip-btns">

   <div class="note-type">
     <div class="icon" v-html="getSvg('textFormat')" ref="text"  @click="onChangeNoteType('text'); mark('text')" data-title="Text"></div>
   <div class="icon" v-html="getSvg('listDisplay')" ref="list" @click="onChangeNoteType('list'); mark('list')" data-title="List"></div>
   <div class="icon" v-html="getSvg('img')" ref="img" @click="onChangeNoteType('img'); mark('list'); mark('img')" data-title="Image"></div>
   </div>

   <button @click="onSaveNote" class="close-tool-tip">Close</button>

   </div>

   </div>

 </section>
    
    `,

  data() {
    return {
      previewImage: null,
    }
  },

  methods: {
    uploadImage(e) {
      const image = e.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(image)
      reader.onload = e => {
        this.previewImage = e.target.result
        this.note.info.url = this.previewImage
      }
    },

    onSaveNote() {
      if (!this.note.info.txt && this.note.type !== 'NoteImg') return
      if (this.note.type === 'NoteTodos') {
        this.note.info.txt
          .split(',')
          .forEach(n => this.note.info.todos.push({ txt: n, isDone: false }))
      }
      console.log(this.notes)
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

    mark(type) {
      if (type === 'list') {
        this.removeMarks()
        this.$refs.list.classList.add('pressed')
      } else if (type === 'text') {
        this.removeMarks()
        this.$refs.text.classList.add('pressed')
      } else {
        this.removeMarks()
        this.$refs.img.classList.add('pressed')
      }
    },

    removeMarks() {
      document
        .querySelectorAll('.pressed')
        .forEach(i =>
          i.classList.contains('pressed') ? i.classList.remove('pressed') : ''
        )
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
