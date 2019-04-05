// App Imports
import params from '../../../setup/config/params'
import CrateList from '../../../modules/doctors/doctorMedicalRecord/List'
import CrateCreateOrEdit from '../../../modules/doctors/doctorMedicalRecord/CreateOrEdit'

// Admin doctorMedicalRecord routes
export const doctorMedicalRecord = {
  path: '/doctors/crates',
  component: CrateList,
  // auth: true,
  role: params.user.roles.admin
}

export const recordCreate = {
  path: '/doctors/doctorMedicalRecord/create',
  component: CrateCreateOrEdit,
  // auth: true,
  role: params.user.roles.admin
}

export const crateEdit = {
  path: (id = ':id') => (`/admin/crate/${ id }/edit`),
  component: CrateCreateOrEdit,
  // auth: true,
  role: params.user.roles.admin
}