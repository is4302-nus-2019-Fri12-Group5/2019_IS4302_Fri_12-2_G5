// App Imports
import params from '../../../setup/config/params'
import CrateList from '../../../modules/doctors/crate/List'
import CrateCreateOrEdit from '../../../modules/doctors/crate/CreateOrEdit'

// Admin crate routes
export const doctorMedicalRecord = {
  path: '/doctors/crates',
  component: CrateList,
  // auth: true,
  role: params.user.roles.admin
}

export const crateCreate = {
  path: '/doctors/crate/create',
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