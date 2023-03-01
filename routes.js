import HomePage from './views/HomePage.js'
import AboutUs from './views/AboutUs.js'
import EmailPage from './views/EmailPage.js'
import GoogleKeep from './views/GoogleKeep.js'

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
      path: '/Email',
      component: EmailPage,
    },
    {
      path: '/GoogleKeep',
      component: GoogleKeep,
    },
  ],
}

export const router = createRouter(routerOptions)
