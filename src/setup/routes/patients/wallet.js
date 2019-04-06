// App Imports
import params from '../../../setup/config/params'
import Wallet from '../../../modules/patients/patientWallet/List'

// Admin subscriptions routes
export const patientWallet = {
    path: '/patients/wallet',
    component: Wallet,
    // auth: true,
    role: params.user.roles.admin
}