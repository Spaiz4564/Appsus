import HomePage from './views/HomePage.js'
import AboutUs from './views/AboutUs.js'
import MailIndex from './apps/mail/pages/MailIndex.js'
import NoteIndex from './apps/keep/pages/NoteIndex.js'
import NoteDetails from './apps/keep/pages/NoteDetails.js'
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
      children: [
        {
          path: 'trash',
          name: 'TrashEmail',
          component: EmailTrash,
        },
      ],
    },
    {
      path: '/NoteIndex',
      component: NoteIndex,
      children: [
        {
          path: 'Details',
          component: NoteDetails,
        },
      ],
    },

    {
      path: '/mail/:mailId',
      component: MailDetails,
    },
  ],
}

export const router = createRouter(routerOptions)
