// Imports
import React from 'react'

// UI Imports
import { Grid, GridCell } from '../../../ui/grid'
import { black, grey } from "../../../ui/common/colors"

// App Imports
import patients from '../../../setup/routes/patients'
import Menu from '../../common/header/Menu'
import MenuItem from '../../common/header/MenuItem'

// Component
const DoctorMenu = () => (
  <Grid style={{ backgroundColor: grey }}>
    <GridCell style={{ padding: '2em', textAlign: 'center' }}>
      <Menu>
        <MenuItem to={patients.patientsDashboard.path} type="primary" style={{ color: black }}>Dashboard</MenuItem>

        <MenuItem to={patients.patientDoctors.path} section="products" type="primary" style={{ color: black }}>Doctors</MenuItem>

        <MenuItem to={patients.patientMedicalRecord.path} type="primary" style={{ color: black }}>Medical Records</MenuItem>

        <MenuItem to={patients.patientWallet.path} type="primary" style={{ color: black }}>Wallet</MenuItem>
      </Menu>
    </GridCell>
  </Grid>
)

export default DoctorMenu