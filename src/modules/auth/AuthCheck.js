// Imports
import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// App Imports
import crate from '../../setup/routes/crate'
import doctorsRoutes from '../../setup/routes/doctors'
import patientsRoutes from '../../setup/routes/doctors'

// Component
const AuthCheck = (props) => (
    props.user.isAuthenticated ? (props.user.details.role === 'ADMIN' ? <Redirect to={doctorsRoutes.dashboard.path}/> : <Redirect to={crate.list.path}/>) : ''
)

// to be implemented
// const AuthCheck = (props) => (
//     props.user.isAuthenticated ? (props.user.details.role === 'ADMIN' ? <Redirect to={patientRoutes.dashboard.path}/> : <Redirect to={crate.list.path}/>) : ''
// )

// Component Properties
AuthCheck.propTypes = {
  user: PropTypes.object.isRequired
}

// Component State
function authCheckState(state) {
  return {
    user: state.user
  }
}

export default connect(authCheckState, {})(AuthCheck)
