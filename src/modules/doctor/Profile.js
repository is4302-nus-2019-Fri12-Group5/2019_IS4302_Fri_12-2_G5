// Imports
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

// UI Imports
import { Grid, GridCell } from '../../ui/grid'
import { H3, H4 } from '../../ui/typography'
import Button from '../../ui/button'
import { grey, grey2 } from '../../ui/common/colors'

// App Imports
import doctorRoutes from '../../setup/routes/doctor'
import doctorsRoutes from '../../setup/routes/doctors'
import home from '../../setup/routes/home'
import { logout } from './api/actions'
import ImageTile from "../../ui/image/Tile";
import {level1} from "../../ui/common/shadows";
import {APP_URL} from "../../setup/config/env";

// Component
const Profile = (props) => (
    <Grid gutter={true} alignCenter={true} style={{ padding: '2em' }}>
    </Grid>

)

// Component Properties
Profile.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

// Component State
function profileState(state) {
  return {
    user: state.user
  }
}

export default connect(profileState, { logout })(Profile)
