import { svgService } from './../../../services/svg-service.js'
import NoteDetails from '../pages/NoteDetails.js'

export default {
  props: ['note'],
  template: `
   <!-- <RouterLink :to="'/NoteIndex/'+note.id"> -->
   
        <section class="note-preview-section"  :style="bgColor"   @mouseout="showTools = false" @mouseover="showTools = true">
        <div class="note-img-container">
     
      </div>
      <RouterLink to="/noteIndex/Details">
      <div   class="note-preview-container">
        <h2>{{ note.info.title }}</h2>
      <h4>{{ note.info.txt }}</h4>
    
      </div>
      </RouterLink>
      <div :class="opacity">
      <div className="icon" v-html="getSvg('trash')"></div>
      <div className="color">
      <input v-model="note.style.backgroundColor" type="color" id="color" />
      <i class="fa-solid fa-palette"></i>
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
    console.log(this.note)
  },

  components: {
    NoteDetails,
  },
}

/* <p contenteditable="true">
****YOU CAN EDIT THIS CONTENT***
Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
asperiores expedita at voluptatem eligendi ipsum sit, tempora modi
nisi eum quae id cumque et, quibusdam, excepturi porro mollitia.
Adipisci, exercitationem?
</p> */
