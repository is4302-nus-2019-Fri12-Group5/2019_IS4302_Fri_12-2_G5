// App Imports
import params from '../../../setup/config/params'
import SubscriptionList from '../../../modules/doctors/subscription/List'

// Admin subscriptions routes
export const subscriptionList = {
  path: '/doctors/subscriptions',
  component: SubscriptionList,
  auth: true,
  role: params.user.roles.admin
}