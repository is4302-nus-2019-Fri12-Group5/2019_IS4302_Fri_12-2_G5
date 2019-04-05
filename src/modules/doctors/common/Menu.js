// Imports
import React from 'react'

// UI Imports
import { Grid, GridCell } from '../../../ui/grid'
import { black, grey } from "../../../ui/common/colors"

// App Imports
import doctor from '../../../setup/routes/doctor'
import doctors from '../../../setup/routes/doctors'
import Menu from '../../common/header/Menu'
import MenuItem from '../../common/header/MenuItem'

// Component
const DoctorMenu = () => (
  <Grid style={{ backgroundColor: grey }}>
    <GridCell style={{ padding: '2em', textAlign: 'center' }}>
      <Menu>
        <MenuItem to={doctors.dashboard.path} type="primary" style={{ color: black }}>Dashboard</MenuItem>

        <MenuItem to={doctors.doctorPatients.path} section="products" type="primary" style={{ color: black }}>Patients</MenuItem>

        <MenuItem to={doctors.doctorMedicalRecord.path} type="primary" style={{ color: black }}>Medical Records</MenuItem>

        <MenuItem to={doctors.doctorWallet.path} type="primary" style={{ color: black }}>Wallet</MenuItem>
      </Menu>
    </GridCell>
  </Grid>
)

export default DoctorMenu