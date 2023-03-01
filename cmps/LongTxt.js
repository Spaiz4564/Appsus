export default {
  props: ['txt', 'length'],
  template: `
    <section class="long-txt">
        <p v-if="!isLong">{{displayTxt}}</p>
        <p v-else>{{txt}}</p>
        <button v-if="isLong" @click="toggleTxt">Read Less</button>
        <button v-else @click="toggleTxt">Read More</button>
    </section>
    `,
  data() {
    return {
      isLong: false,
    }
  },
  computed: {
    displayTxt() {
      return this.txt.substring(0, this.length) + '...'
    },
  },
  methods: {
    toggleTxt() {
      this.isLong = !this.isLong
    },
  },
}
