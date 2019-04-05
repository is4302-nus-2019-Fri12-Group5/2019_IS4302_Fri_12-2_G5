// Imports
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

// UI Imports
import { Grid, GridCell } from '../../ui/grid'
import { H1, H4 } from '../../ui/typography'
import Button from '../../ui/button'
import {white} from '../../ui/common/colors'
import { textLevel1 } from '../../ui/common/shadows'

// App Imports
import { APP_URL } from '../../setup/config/env'
import patientRoutes from '../../setup/routes/patient'
import doctorRoutes from '../../setup/routes/doctor'
import Onboarding from './Onboarding'
import Icon from "../patient/Login";

// Component
const Home = (props) => (
  <div>
    {/* Home */}
    <Grid alignCenter={true} style={{
      backgroundImage: `url('${ APP_URL }/images/dark_cover.png')`,
      backgroundAttachment: 'fixed',
      backgroundSize: 'cover',
      backgroundPosition: 'center top',
      height: 'calc(100vh - 5em)',
      textAlign: 'center',
      color: white
    }}>
      {/* SEO */}
      <Helmet>
        <title> MediChain </title>
      </Helmet>

      {/* Content */}
      <GridCell>
        <H1 font="secondary" style={{ textShadow: textLevel1 }}>MediChain</H1>

        <H4 style={{ textShadow: textLevel1, marginTop: '0.5em' }}>
            Manage Your Medical Needs on Blockchain!
        </H4>


        {/* Call to action */}
        {/*<Link to={patientRoutes.login.path}>*/}
            {/*<Button theme="secondary" style={{ marginTop: '1em' }}>I'm a Patient</Button>*/}
        {/*</Link>*/}


        {/*<Link to={doctorRoutes.login.path}>*/}
            {/*<Button theme="secondary" style={{ marginTop: '1em' }}>I'm a Doctor</Button>*/}
        {/*</Link>*/}


          <div style={{ marginTop: '2em' }}>
              {/* Signup link */}
              <Link to={patientRoutes.login.path}>
                  <Button type="button" theme="secondary" style={{ marginRight: '0.5em' }}>I'm a Patient</Button>
              </Link>

              <Link to={doctorRoutes.doctorLogin.path}>
                  <Button type="button" theme="secondary">I'm a Doctor</Button>
              </Link>
          </div>


      </GridCell>
    </Grid>

    {/* Onboarding */}
    <Onboarding/>
  </div>
)

// Component Properties
Home.propTypes = {
  user: PropTypes.object.isRequired
}

// Component State
function homeState(state) {
  return {
    user: state.user
  }
}

export default connect(homeState, {})(Home)
