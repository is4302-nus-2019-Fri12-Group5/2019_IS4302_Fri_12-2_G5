// App Imports
import params from '../../../setup/config/params'
import Dashboard from '../../../modules/patients/Dashboard'

// Patient dashboard routes
export const patientsDashboard = {
    path: '/patients/dashboard',
    component: Dashboard,
    // auth: true,
    // role: params.user.roles.admin
}