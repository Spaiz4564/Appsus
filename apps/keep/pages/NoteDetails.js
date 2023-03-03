import { noteService } from '../services/note-service.js'
import NoteTypeList from '../cmps/NoteTypeList.js'
import NoteText from '../cmps/NoteText.js'

export default {
  props: ['note'],
  template: `
  <section :style="setBg" className="note-details">
<div className="title-pin">
    <div>{{ note.info.title }}</div>
    <i class="fa-solid fa-thumbtack"></i>
</div>


    <!-- <textarea  rows="4" spellcheck="false" style="resize: none; overflow: hidden" v-model="note.info.txt" contenteditable="true">
      {{ setNoteContent }}</textarea> -->
    <div style="white-space: pre-line;" ref="list" @input="ok" contenteditable="true">{{ setNoteContent }}</div>
    
<!-- <NoteTypeList ref="list"  @input="ok" contenteditable="true" v-if="note.type === 'NoteTodos'" :note="note"/>
<NoteText contenteditable="true" v-if="note.type === 'NoteTxt'" :note="note"/> -->




    <div className="note-tools">
    <i class="fa-solid fa-palette"></i>
    <RouterLink  @click="unSetNote"  to="/NoteIndex">Close</RouterLink>
       
    </div>
  
  </section>
   
    
    `,

  created() {
    console.log(this.note.info.txt)
    console.log('thing')
  },

  data() {
    return {
      thing: this.note.info.txt,
    }
  },

  methods: {
    unSetNote() {
      noteService.save(this.note)
      this.$emit('unset')
    },

    ok() {
      console.log('change')
      this.note.info.txt = this.$refs.list.innerText
    },
  },

  computed: {
    setBg() {
      return `background-color: ${this.note.style.backgroundColor}`
    },

    setNoteContent() {
      if (this.note.info.txt.includes(',')) {
        return this.note.info.txt
          .split(',')
          .map(txt => (txt = `•  ${txt}`))
          .join('\n')
      } else {
        return this.note.info.txt
      }
    },
  },

  components: {
    NoteText,
    NoteTypeList,
  },
}
