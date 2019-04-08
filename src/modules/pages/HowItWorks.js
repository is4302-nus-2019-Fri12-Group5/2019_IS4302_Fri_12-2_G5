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
import Icon from '../../ui/icon'
import { textLevel1 } from '../../ui/common/shadows'
import { white, grey, grey2, grey3 } from '../../ui/common/colors'

// App Imports
import { APP_URL } from '../../setup/config/env'
import patientRoutes from '../../setup/routes/patient'

// Component
const HowItWorks = (props) => (
  <div>
    {/* SEO */}
    <Helmet>
      <title>How it works? - MediChain</title>
    </Helmet>

    {/* Top title bar */}
    <Grid style={{ backgroundColor: grey }}>
      <GridCell style={{ padding: '2em', textAlign: 'center' }}>
        <H3 font="secondary">How it works</H3>

        <p style={{ marginTop: '1em', color: grey2 }}>Just 4 easy steps to approach a doctor and get subscription issued!</p>
      </GridCell>
    </Grid>

    {/* 1 - Choose Your Hospital */}
    <Grid>
      <GridCell justifyCenter={true} style={{ textAlign: 'center', padding: '8em 0em' }}>
        <Icon size={4} style={{ color: grey3, textShadow: textLevel1 }}>looks_one</Icon>

        <H4 style={{ marginTop: '0.5em', textTransform: 'uppercase' }}>Choose Your Hospital</H4>

        <p style={{ marginTop: '0.5em', color: grey3 }}>The trusted hospitals will be added to your list!</p>
      </GridCell>

      <GridCell style={{ background: `url('${ APP_URL }/images/how_it_works_1.jpeg') center top no-repeat` }}/>
    </Grid>

    {/* 2 - Choose Your Doctor */}
    <Grid>
      <GridCell style={{ background: `url('${ APP_URL }/images/how_it_works_2.jpg') center top no-repeat` }}/>

      <GridCell justifyCenter={true} style={{ textAlign: 'center', padding: '8em 0em' }}>
        <Icon size={4} style={{ color: grey3, textShadow: textLevel1 }}>looks_two</Icon>

        <H4 style={{ marginTop: '0.5em', textTransform: 'uppercase' }}>Choose Your Doctor</H4>

        <p style={{ marginTop: '0.5em', color: grey3 }}>All trusted doctors will be added to your list!</p>
      </GridCell>
    </Grid>

    {/* 3 - Pay when booking appointment! */}
    <Grid>
      <GridCell justifyCenter={true} style={{ textAlign: 'center', padding: '8em 0em' }}>
        <Icon size={4} style={{ color: grey3, textShadow: textLevel1 }}>looks_3</Icon>

        <H4 style={{ marginTop: '0.5em', textTransform: 'uppercase' }}>Pay when booking appointment!</H4>

        <p style={{ marginTop: '0.5em', color: grey3 }}>Pay immediately through MediChain!</p>
      </GridCell>

      <GridCell style={{ background: `url('${ APP_URL }/images/how_it_works_3.jpeg') center top no-repeat` }}/>
    </Grid>

      {/* 4 - Pay when booking appointment! */}
      <Grid>
          <GridCell style={{ background: `url('${ APP_URL }/images/how_it_works_4.jpg') center top no-repeat` }}/>

          <GridCell justifyCenter={true} style={{ textAlign: 'center', padding: '8em 0em' }}>
              <Icon size={4} style={{ color: grey3, textShadow: textLevel1 }}>looks_4</Icon>

              <H4 style={{ marginTop: '0.5em', textTransform: 'uppercase' }}>Check Your Medical Record Online!</H4>

              <p style={{ marginTop: '0.5em', color: grey3 }}>Check your medical record anywhere at any time!</p>

          </GridCell>
      </Grid>

    {/* Bottom call to action bar */}
    <Grid style={{ backgroundColor: grey }}>
      <GridCell style={{ padding: '3em', textAlign: 'center' }}>
          <Link to={patientRoutes.signup.path}>
              <Button theme="primary"><Icon size={1.2}>PATIENT SIGNUP</Icon></Button>
          </Link>
      </GridCell>
    </Grid>
  </div>
)

// Component Properties
HowItWorks.propTypes = {
  user: PropTypes.object.isRequired
}

// Component State
function howItWorksState(state) {
  return {
    user: state.user
  }
}

export default connect(howItWorksState, {})(HowItWorks)
