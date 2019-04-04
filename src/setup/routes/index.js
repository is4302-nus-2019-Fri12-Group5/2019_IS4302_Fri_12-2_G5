// App Imports
import { APP_URL_API } from '../config/env'
import admin from './admin'
import home from './home'
import doctor from './doctor'
import patient from './patient'
import product from './product'
import crate from './crate'

// Combined routes
export const routes = Object.assign(admin, home, doctor, patient, product, crate)

// API Routes
export const routeApi = APP_URL_API

// Image
export const routeImage = APP_URL_API
