export default {
  props: ['note'],
  template: `

<ul>

<li v-for="todo in makeA">{{ todo }}</li>

</ul>


    
    `,

  methods: {},

  computed: {
    makeA() {
      return this.note.info.txt.split(',')
    },
  },
}
