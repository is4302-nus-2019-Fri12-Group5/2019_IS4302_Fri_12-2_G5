// App Imports
import Login from '../../modules/patient/Login'
import Signup from '../../modules/patient/Signup'
import Profile from '../../modules/patient/Profile'
import Subscriptions from '../../modules/patient/Subscriptions'

// User routes
export default {
  login: {
    path: '/patient/login',
    component: Login
  },

  signup: {
    path: '/patient/signup',
    component: Signup
  },

  profile: {
    path: '/patient/profile',
    component: Profile,
    // auth: true
  },

  subscriptions: {
    path: '/patient/subscriptions',
    component: Subscriptions,
    // auth: true
  }
}
