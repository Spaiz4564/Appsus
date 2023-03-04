import { svgService } from './../../../services/svg-service.js'
import NoteDetails from '../pages/NoteDetails.js'
import { noteService } from '../services/note-service.js'
import NoteText from './NoteText.js'
import NoteTypeList from './NoteTypeList.js'
import NoteTypeImg from './NoteTypeImg.js'

export default {
  props: ['note'],
  template: `
   
        <section class="note-preview-section"  :style="bgColor"   @mouseout="showTools = false" @mouseover="showTools = true">
        
      <RouterLink :to="'/noteIndex/Details/'+note.id">
      <div :class="note.type ==='NoteImg' ? 'no-padding' : ''" class="note-preview-container">

     
            <NoteText v-if="note.type === 'NoteTxt'" :note="note"/>
            <NoteTypeList v-if="note.type === 'NoteTodos'"  :note="note"/>
            <NoteTypeImg v-if="note.type === 'NoteImg'" :note="note" />

      </div>
      </RouterLink>
      <div :class="opacity">
      <div @click.prevenet="onRemoveNote(note.id)"  className="icon" v-html="getSvg('trash')"></div>
      <div className="color">
      <input @change="setBg" v-model="note.style.backgroundColor" type="color" id="color" />
      <div class="icon" v-html="getSvg('colorPallet')"></div>
    
      </div>
      
      </div>

        </section>
      
       
    `,

  data() {
    return {
      showTools: false,
    }
  },

  methods: {
    getSvg(iconName) {
      return svgService.getSvg(iconName)
    },

    onRemoveNote(noteId) {
      console.log('removing note')
      this.$emit('removeNote', noteId)
    },

    setBg() {
      noteService.save(this.note)
      console.log('bg set')
    },
  },

  computed: {
    imgSrc() {
      return `https://source.unsplash.com/random/200x200?sig=${Math.floor(
        Math.random() * 20
      )}`
    },

    opacity() {
      if (!this.showTools) return 'preview-tools noOpacity'
      else return 'preview-tools opacity'
    },

    bgColor() {
      return `background-color: ${this.note.style.backgroundColor}`
    },
  },

  created() {
    // console.log(this.note)
  },

  components: {
    NoteTypeImg,
    NoteTypeList,
    NoteText,
    NoteDetails,
  },
}
