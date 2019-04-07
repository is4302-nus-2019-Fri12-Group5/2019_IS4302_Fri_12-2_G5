// App Imports
import params from '../../../setup/config/params'
import Dashboard from '../../../modules/patients/Dashboard'
import Edit from '../../../modules/patients/Edit'

// Patient dashboard routes
export const patientsDashboard = {
    path: '/patients/dashboard',
    component: Dashboard,
    // auth: true,
    // role: params.user.roles.admin
}

export const patientsDashboardEdit = {
    path: '/patients/edit',
    component: Edit,
    // auth: true,
    // role: params.user.roles.admin
}