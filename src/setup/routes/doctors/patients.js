// App Imports
import params from '../../../setup/config/params'
import PatientList from '../../../modules/doctors/doctorPatient/PatientList'
import PatientRecordList from '../../../modules/doctors/doctorPatient/PatientMedicalRecord'
import ProductCreateOrEdit from '../../../modules/doctors/doctorPatient/CreateOrEdit'

// Admin doctorPatient routes
export const doctorPatients = {
  path: '/doctors/patients',
  component: PatientList,
  // auth: true,
  role: params.user.roles.admin
}

export const doctorPatientsRecord = {
  path: (id = ':id') => (`/doctors/patientsRecord/${id}`),
  component: PatientRecordList,
  // auth: true,
  role: params.user.roles.admin
}

export const productCreate = {
  path: '/doctors/doctorPatient/create',
  component: ProductCreateOrEdit,
  // auth: true,
  role: params.user.roles.admin
}

export const productEdit = {
  path: (id = ':id') => (`/admin/product/${ id }/edit`),
  component: ProductCreateOrEdit,
  // auth: true,
  role: params.user.roles.admin
}