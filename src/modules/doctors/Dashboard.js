// Imports
import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

// UI Imports
import { Grid, GridCell } from '../../ui/grid'
import {grey2} from '../../ui/common/colors'

// App Imports
import DoctorMenu from './common/Menu'
import ImageTile from "../../ui/image/Tile";
import Button from '../../ui/button'
import {level1} from "../../ui/common/shadows";
import {APP_URL} from "../../setup/config/env";
import {H3, H4} from "../../ui/typography";
import {Link} from "react-router-dom";
import home from "../../setup/routes/home";

// Component
class Dashboard extends PureComponent {
  
  constructor(props) {
    super(props);
    this.state = {
      doctor: ''
    }
  }

  componentDidMount() {

    fetch(`/doctor/api/org.healthcare.Doctor`)
    .then(response => response.json())
      .then(responseData => {
        this.setState({
          doctor: responseData[0]
        })
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }


  render() {
    
    const {doctor} = this.state;

    return (
    <div>
      {/* SEO */}
      <Helmet>
        <title>Dashboard - Doctor</title>
      </Helmet>

      {/* Top menu bar */}
      <DoctorMenu/>

      {/* Page Content */}

        <Grid gutter={true} alignCenter={true} style={{ padding: '2em' }}>

            {/* SEO */}
            <Helmet>
                <title>My Profile - MediChain</title>
            </Helmet>

            {/* Left Content - Image Collage */}
            <GridCell>
                <Grid gutter={true} alignCenter={true}>
                    <GridCell justifyCenter={true}>
                        <ImageTile width={700} height={630} shadow={level1} image={`${ APP_URL }/images/doctor_1.jpg`}/>
                    </GridCell>
                </Grid>
            </GridCell>

            <GridCell style={{textAlign: 'center' }}>
                <H3 font="secondary" style={{ marginBottom: '1em' }}>My Profile</H3>
                {/*<H4 style={{ marginBottom: '0.5em' }}>{props.user.details.name}</H4>*/}
                <H4 style={{ marginBottom: '3em' }}> {doctor.firstName} {doctor.lastName} </H4>
                {/*<p style={{ color: grey2, marginBottom: '2em' }}>{props.user.details.email}</p>*/}
                <p style={{ color: grey2, marginBottom: '2em' }}>License:   {doctor.licenseNum}</p>
                <p style={{ color: grey2, marginBottom: '2em' }}>Department:   {doctor.department}</p>
                <p style={{ color: grey2, marginBottom: '2em' }}>Title: {doctor.title}</p>
                <p style={{ color: grey2, marginBottom: '4em' }}>Fee:   {doctor.fee}</p>

                {/*<Link to={}>*/}
                <Button type="button" theme="primary" style={{marginRight : '0.5em'}}>Edit</Button>
                {/*</Link>*/}

                {/*<Button theme="secondary" onClick={props.logout} style={{ marginLeft: '1em' }}>Logout</Button>*/}
                <Link to={home.home.path}>
                    <Button type="button" theme="secondary" >Logout</Button>
                </Link>
            </GridCell>

        </Grid>

    </div>
    )
  }
}

// Component Properties
Dashboard.propTypes = {
  user: PropTypes.object.isRequired
}

// Component State
function dashboardState(state) {
  return {
    user: state.user
  }
}

export default connect(dashboardState, {})(Dashboard)
