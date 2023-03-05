import { svgService } from '../../../services/svg-service.js'
import NoteFilter from './NoteFilter.js'

export default {
  template: `
          <header class="app-header">
              <div className="logo-keep">
                <div style="padding-top:5px"  v-html="getSvg('bars')" ></div>
                <img class="logo" src='../../../assets/style/apps/keep/imgs/keep.png' alt="" />
            <h1>Appsus</h1>
            <div  class="glass-icon" v-html="getSvg('search')" ></div>
           <NoteFilter @filter="setFilterBy" />
            </div>

            
            <router-link to="/">Home</router-link> 
            <router-link to="/mail"><img class="logo" src='././assets/style/apps/mail/imgs/mail.png' alt="" /></router-link>
            
            <!-- <nav>
                  <router-link to="/about">About</router-link>
              </nav> -->
          </header>
      `,

  methods: {
    getSvg(iconName) {
      return svgService.getSvg(iconName)
    },

    setFilterBy(filterBy) {
      this.$emit('setFilter', filterBy)
    },
  },

  components: {
    NoteFilter,
  },
}
