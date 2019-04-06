// App Imports
import * as dashboard from './dashboard'
import * as patients from './patients'
import * as record from './record'
import * as wallet from './wallet'
import * as user from './user'


// Admin routes
const doctors = {
  ...dashboard,
  ...patients,
  ...record,
  ...wallet,
  ...user
}

export default doctors
