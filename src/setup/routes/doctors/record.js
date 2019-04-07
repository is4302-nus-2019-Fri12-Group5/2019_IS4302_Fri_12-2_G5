// App Imports
import params from '../../../setup/config/params'
import RecordList from '../../../modules/doctors/doctorMedicalRecord/List'
import PrescriptionList from '../../../modules/doctors/doctorMedicalRecord/Prescription'
import RecordCreateOrEdit from '../../../modules/doctors/doctorMedicalRecord/CreateOrEdit'
import RecordEdit from '../../../modules/doctors/doctorMedicalRecord/Edit'

// Admin doctorMedicalRecord routes
export const doctorMedicalRecord = {
  path: '/doctors/records',
  component: RecordList,
  // auth: true,
  role: params.user.roles.admin
}

export const doctorPrescription = {
  path: '/doctors/pres',
  component: PrescriptionList,
  // auth: true,
  role: params.user.roles.admin
}

export const recordCreate = {
  path: '/doctors/doctorMedicalRecord/create',
  component: RecordCreateOrEdit,
  // auth: true,
  role: params.user.roles.admin
}

export const recordEdit = {
  // path: (id = ':id') => (`/admin/crate/${ id }/edit`),
  path: (id = ':id') => (`/doctors/doctorMedicalRecord/edit/${ id }`),
  component: RecordEdit,
  // auth: true,
  role: params.user.roles.admin
}