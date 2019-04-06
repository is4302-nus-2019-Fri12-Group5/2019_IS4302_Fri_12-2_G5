// App Imports
import * as dashboard from './dashboard'
import * as doctors from './doctors'
import * as record from './record'
import * as wallet from './wallet'

// Admin routes
const patients = {
    ...dashboard,
    ...doctors,
    ...record,
    ...wallet,
}

export default patients
