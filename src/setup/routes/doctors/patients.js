// App Imports
import params from '../../../setup/config/params'
import ProductList from '../../../modules/doctors/doctorPatient/PatientList'
import ProductCreateOrEdit from '../../../modules/doctors/doctorPatient/CreateOrEdit'

// Admin doctorPatient routes
export const doctorPatients = {
  path: '/doctors/products',
  component: ProductList,
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