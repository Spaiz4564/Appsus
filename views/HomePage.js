import AppHeader from './../cmps/AppHeader.js'

export default {
  template: `
     <AppHeader/>
        <section class="home-page">
            <div class="welcome-container">
            <h1>Secure, smart, and easy to use our <br /> apps</h1>
            <h2>Get more done with Gmail or Save your thoughts, wherever you are with google keep</h2>
            <div className="welcome-btns">
            <router-link class="btn" to="/mail">Start Mail</router-link>
            <router-link class="btn" to="/noteIndex">Start Notes</router-link>
            </div>
          
            </div>
            <div class="welcome-img-container">
IMAGE
            </div>
           
        </section>
    `,

  components: {
    AppHeader,
  },
}
