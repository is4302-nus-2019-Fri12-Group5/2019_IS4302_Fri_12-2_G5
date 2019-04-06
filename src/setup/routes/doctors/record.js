// App Imports
import params from '../../../setup/config/params'
import RecordList from '../../../modules/doctors/doctorMedicalRecord/List'
import RecordCreateOrEdit from '../../../modules/doctors/doctorMedicalRecord/CreateOrEdit'

// Admin doctorMedicalRecord routes
export const doctorMedicalRecord = {
  path: '/doctors/crates',
  component: RecordList,
  // auth: true,
  role: params.user.roles.admin
}

export const recordCreate = {
  path: '/doctors/doctorMedicalRecord/create',
  component: RecordCreateOrEdit,
  // auth: true,
  role: params.user.roles.admin
}

export const crateEdit = {
  path: (id = ':id') => (`/admin/crate/${ id }/edit`),
  component: RecordCreateOrEdit,
  // auth: true,
  role: params.user.roles.admin
}