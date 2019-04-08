// App Imports
import params from '../../../setup/config/params'
import DoctorList from '../../../modules/patients/patientHospital/List'

// See all the hospitals
export const patientDoctors = {
    path: '/patients/doctors',
    component: DoctorList,
    // auth: true,
    role: params.user.roles.admin
}
