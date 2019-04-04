// App Imports
import Login from '../../modules/doctor/Login'
import Signup from '../../modules/doctor/Signup'
import Profile from '../../modules/doctor/Profile'
import Subscriptions from '../../modules/doctor/Subscriptions'

// User routes
export default {
    doctorLogin: {
        path: '/doctor/login',
        component: Login
    },

    doctorSignup: {
        path: '/doctor/signup',
        component: Signup
    },

    doctorProfile: {
        path: '/doctor/profile',
        component: Profile,
        // auth: true
    },

    subscriptions: {
        path: '/doctor/subscriptions',
        component: Subscriptions,
        // auth: true
    }
}
