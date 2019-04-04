// App Imports
import * as dashboard from './dashboard'
import * as product from './product'
import * as crate from './crate'
import * as subscription from './subscription'
import * as user from './user'
// import * as doctor from './doctor'
// import * as patient from './patient'

// Admin routes
const admin = {
  ...dashboard,
  ...product,
  ...crate,
  ...subscription,
  ...user
  // ...doctor,
  // ...patient
}

export default admin
