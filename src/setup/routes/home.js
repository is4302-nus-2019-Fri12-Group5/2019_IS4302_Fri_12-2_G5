// App Imports
import Home from '../../modules/pages/Home'
import Hospital from '../../modules/pages/Hospital'
import History from '../../modules/pages/History'
import HowItWorks from '../../modules/pages/HowItWorks'
import WhatsNew from '../../modules/pages/WhatsNew'

// Home routes
export default {
  home: {
    path: '/',
    component: Home,
    exact: true
  },

  hospital: {
    path: '/hospital',
    component: Hospital
  },

  history: {
    path: '/history',
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
