import HomePage from './views/HomePage.js'
import AboutUs from './views/AboutUs.js'
import MailIndex from './apps/mail/pages/MailIndex.js'
import NoteIndex from './apps/keep/pages/NoteIndex.js'
import MailDetails from './apps/mail/pages/MailDetails.js'
import EmailTrash from './apps/mail/cmps/EmailTrash.js'
// import GoogleKeep from './views/GoogleKeep.js'

const { createRouter, createWebHashHistory } = VueRouter

const routerOptions = {
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: HomePage,
    },
    {
      path: '/about',
      component: AboutUs,
    },
    {
      path: '/mail',
      component: MailIndex,
    },
    {
      path: '/NoteIndex',
      component: NoteIndex,
    },

    {
      path: '/mail/:mailId',
      component: MailDetails,
    },

    {
      path: '/mail/trash',
      component: EmailTrash,
    },
    {
      // path: '/GoogleKeep',
      // component: GoogleKeep,
    },
  ],
}

export const router = createRouter(routerOptions)
