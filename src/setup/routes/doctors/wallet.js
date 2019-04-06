// App Imports
import params from '../../../setup/config/params'
import SubscriptionList from '../../../modules/doctors/doctorWallet/List'

// Admin subscriptions routes
export const doctorWallet = {
  path: '/doctors/subscriptions',
  component: SubscriptionList,
  // auth: true,
  role: params.user.roles.admin
}