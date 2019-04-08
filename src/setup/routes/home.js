// App Imports
import Home from '../../modules/pages/Home'
import History from '../../modules/pages/History'
import HowItWorks from '../../modules/pages/HowItWorks'
import WhatsNew from '../../modules/pages/Balance'

// Home routes
export default {
  home: {
    path: '/',
    component: Home,
    exact: true
  },

  doctorHowItWorks: {
    path: '/doctorHowItWorks',
    component: History
  },

  howItWorks: {
    path: '/how-it-works',
    component: HowItWorks
  },

  whatsNew: {
    path: '/whats-new',
    component: WhatsNew
  }
}
