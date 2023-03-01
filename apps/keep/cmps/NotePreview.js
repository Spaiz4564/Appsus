export default {
  props: ['note'],
  template: `
        
        <div class="note-img-container">
     
       <img :src="imgSrc" alt="" />
        </div>
        <div class="note-preview-container">
        <h3>{{ note.info.txt }}</h3>
        <h3>{{ note.id }}</h3>
        <h3>{{ note.type}}</h3>
        </div>
        <div className="preview-tools">

        </div>
 
    `,

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
  },

  created() {
    console.log(this.note)
  },
}

/* <p contenteditable="true">
****YOU CAN EDIT THIS CONTENT***
Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
asperiores expedita at voluptatem eligendi ipsum sit, tempora modi
nisi eum quae id cumque et, quibusdam, excepturi porro mollitia.
Adipisci, exercitationem?
</p> */
