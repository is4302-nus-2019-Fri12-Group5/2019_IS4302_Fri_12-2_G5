// App Imports
import params from '../../../setup/config/params'
import RecordList from '../../../modules/patients/patientMedicalRecord/List'

// Admin doctorMedicalRecord routes
export const patientMedicalRecord = {
    path: '/patients/records',
    component: RecordList,
    // auth: true,
    role: params.user.roles.admin
}