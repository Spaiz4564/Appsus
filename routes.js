import HomePage from './views/HomePage.js'
import AboutUs from './views/AboutUs.js'
import MailIndex from './apps/mail/pages/MailIndex.js'
import NoteDetails from './apps/keep/pages/NoteDetails.js'
import MailDetails from './apps/mail/pages/MailDetails.js'
import EmailTrash from './apps/mail/cmps/EmailTrash.js'
import NoteIndex from './apps/keep/pages/NoteIndex.js'

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
      path: '/noteIndex',
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

    {
      path: '/mail/trash',
      component: EmailTrash,
    },
  ],
}

export const router = createRouter(routerOptions)
