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

        {/*/!* SEO *!/*/}
        {/*<Helmet>*/}
          {/*<title>My Profile - MediChain</title>*/}
        {/*</Helmet>*/}

        {/*/!* Left Content - Image Collage *!/*/}
        {/*<GridCell>*/}
            {/*<Grid gutter={true} alignCenter={true}>*/}
                {/*<GridCell justifyCenter={true}>*/}
                    {/*<ImageTile width={700} height={630} shadow={level1} image={`${ APP_URL }/images/doctor_1.jpg`}/>*/}
                {/*</GridCell>*/}
            {/*</Grid>*/}
        {/*</GridCell>*/}

      {/*<GridCell style={{textAlign: 'center' }}>*/}
          {/*<H3 font="secondary" style={{ marginBottom: '1em' }}>My Profile</H3>*/}
        {/*/!*<H4 style={{ marginBottom: '0.5em' }}>{props.user.details.name}</H4>*!/*/}
          {/*<H4 style={{ marginBottom: '3em' }}>Bruce Lee</H4>*/}
        {/*/!*<p style={{ color: grey2, marginBottom: '2em' }}>{props.user.details.email}</p>*!/*/}
        {/*<p style={{ color: grey2, marginBottom: '2em' }}>License:   AX000123</p>*/}
          {/*<p style={{ color: grey2, marginBottom: '2em' }}>Department:   Orthopedics</p>*/}
          {/*<p style={{ color: grey2, marginBottom: '2em' }}>Title: Director</p>*/}
          {/*<p style={{ color: grey2, marginBottom: '4em' }}>Fee:   100</p>*/}

        {/*<Link to={doctorsRoutes.dashboard.path}>*/}
          {/*<Button theme="primary" style={{marginRight : '0.5em'}}>Dashboard</Button>*/}
        {/*</Link>*/}

          {/*/!*<Link to={}>*!/*/}
              {/*<Button type="button" style={{marginRight : '0.5em'}}>Edit</Button>*/}
          {/*/!*</Link>*!/*/}

        {/*/!*<Button theme="secondary" onClick={props.logout} style={{ marginLeft: '1em' }}>Logout</Button>*!/*/}
        {/*<Link to={home.home.path}>*/}
            {/*<Button type="button" theme="secondary" >Logout</Button>*/}
        {/*</Link>*/}
      {/*</GridCell>*/}
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
