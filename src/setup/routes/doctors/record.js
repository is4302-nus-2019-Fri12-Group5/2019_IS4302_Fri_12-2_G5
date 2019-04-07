// App Imports
import params from '../../../setup/config/params'
import RecordList from '../../../modules/doctors/doctorMedicalRecord/RecordList'
import PrescriptionList from '../../../modules/doctors/doctorMedicalRecord/PrescriptionList'
import PrescriptionEdit from '../../../modules/doctors/doctorMedicalRecord/EditPrescription'
import PrescriptionCreate from '../../../modules/doctors/doctorMedicalRecord/CreatePrescription'
import RecordCreate from '../../../modules/doctors/doctorMedicalRecord/CreateRecord'
import RecordEdit from '../../../modules/doctors/doctorMedicalRecord/EditRecord'

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

export const doctorEditPrescription = {
  path: '/doctors/editPrescription',
  component: PrescriptionEdit,
  // auth: true,
  role: params.user.roles.admin
}

export const doctorCreatePrescription = {
  path: '/doctors/createPrescription',
  component: PrescriptionCreate,
  // auth: true,
  role: params.user.roles.admin
}

export const recordCreate = {
  path: '/doctors/doctorMedicalRecord/create',
  component: RecordCreate,
  // auth: true,
  role: params.user.roles.admin
}

export const recordEdit = {
  // path: (id = ':id') => (`/doctorsRoutes/crate/${ id }/edit`),
  path: (id = ':id') => (`/doctors/doctorMedicalRecord/edit/${ id }`),
  component: RecordEdit,
  // auth: true,
  role: params.user.roles.admin
}