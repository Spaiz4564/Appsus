import { noteService } from '../services/note-service.js'
import NoteTypeList from '../cmps/NoteTypeList.js'
import { svgService } from '../../../services/svg-service.js'
import NoteText from '../cmps/NoteText.js'

export default {
  props: ['note'],
  template: `
  <section :class="note.type ==='NoteImg' ? 'no-padding' : ''" :style="setBg" class="note-details">

<div v-if="note.type !== 'NoteImg'" className="title-pin">
<textarea spellcheck="false" style="resize: none;" v-model="note.info.title">{{ note.info.title }}</textarea>
    <i class="fa-solid fa-thumbtack"></i>
</div>

<img v-if="note.type ==='NoteImg'" class="note-img" :src="note.info.url" alt="" />

<div v-if="note.type === 'NoteImg'" className="title-pin">
<textarea  spellcheck="false" style="resize: none;" v-model="note.info.title">{{ note.info.title }}</textarea>
    <i class="fa-solid fa-thumbtack"></i>
</div>


<textarea :class="note.info.txt.length > 100 ? 'height' : ''" class="margined" v-if="note.type === 'NoteTxt'" spellcheck="false" style="resize: none;" v-model="note.info.txt"></textarea>
    <div v-if="note.type === 'NoteTodos'" class="rega" :style="note.type === 'NoteTodos' ? 'white-space: pre-line' : ''" ref="list"  :contenteditable="isEditable">
     <ul class="note-todos"  >
      <li :class="note.info.todos[index].isDone ? 'line-through': ''" ref="listTodo" @click="lineThrough(index)" v-for="(todo,index) in note.info.todos">{{ todo.txt }}</li>
     </ul>

    </div>
    <form v-if="note.type==='NoteTodos' && showInput" @submit.prevent="pushList" action="">
      <input placeholder="Type something..." ref="newListInput" class="new-list" >
      </form>

    <div className="note-tools">
      <div class="note-tools-icons">
    <div class="icon" v-html="getSvg('colorPallet')"></div>
    <div v-show="note.type==='NoteTodos'" @click="openEdit" class="icon" v-html="getSvg('editList')"></div>
  </div>
  
    <RouterLink  @click="unSetNote"  to="/NoteIndex">Close</RouterLink>
       
    </div>
  
  </section>
   
    
    `,

  created() {
    console.log(this.note.info.txt)
  },

  data() {
    return {
      showInput: false,
    }
  },

  methods: {
    lineThrough(index) {
      console.log(this.$refs.listTodo[index].classList.toggle('line-through'))
      this.note.info.todos[index].isDone = !this.note.info.todos[index].isDone
      console.log(this.note.info.todos)
    },

    unSetNote() {
      noteService.save(this.note)
      this.$emit('unset')
    },

    getSvg(iconName) {
      return svgService.getSvg(iconName)
    },

    openEdit() {
      this.showInput = !this.showInput
      console.log('editing')
    },

    pushList() {
      this.note.info.todos.push({
        txt: this.$refs.newListInput.value,
        isDone: false,
      })

      this.showInput = !this.showInput
    },
  },

  computed: {
    info() {
      return this.note.info.txt
    },

    setBg() {
      return `background-color: ${this.note.style.backgroundColor}`
    },

    setNoteContent() {
      if (this.note.type === 'NoteTodos') {
        console.log(this.note)
        return this.note.info.txt
          .split(',')
          .map(txt => (txt = `•  ${txt}`))
          .join('\n')
      } else {
        return this.note.info.txt
      }
    },

    isEditable() {
      return this.note.type === 'NoteTodos' ? 'false' : 'true'
    },
  },

  components: {
    NoteText,
    NoteTypeList,
  },
}
