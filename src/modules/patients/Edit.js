// Imports
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

// UI Imports
import { Grid, GridCell } from '../../ui/grid'
import Button from '../../ui/button'
import Icon from '../../ui/icon'
import H4 from '../../ui/typography/H4'
import H1 from '../../ui/typography/H1'
import { Input, Textarea } from '../../ui/input'
import { white } from "../../ui/common/colors"

// App Imports
import admin from '../../setup/routes/doctors'
import {
  createOrUpdate as crateCreateOrUpdate,
  getById as getCrateById
} from '../crate/api/actions'
import { messageShow, messageHide } from '../common/api/actions'
import DoctorMenu from './common/Menu'
import patientRoutes from '../../setup/routes/patients'

// Component
class Edit extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentPatient: '',
      street: '',
      aptNum: '',
      city: '',
      country: '',
      postalCode: '',
      phoneNum:'',
      nationality:'',
      isPosted: false
    }
  }

  componentDidMount() {
    // Get doctorMedicalcrate details (edit case)
    // this.getCrate(parseInt(this.props.match.params.id))
    console.log(this.props)
    
    fetch(`/doctor/api/org.healthcare.Patient`)
	    .then(response => response.json())
        .then(responseData => {
          this.setState({
            currentPatient: responseData[0],
          });
          console.log(this.state.currentPatient);

          this.updateState();
          
        })
        .catch(error => {
          console.log('Error fetching and parsing data', error);
        });
  }

  updateState = async () => {
    
    await this.setState({
        street: this.state.currentPatient.address.street,
        aptNum: this.state.currentPatient.address.aptNum,
        city: this.state.currentPatient.address.city,
        country: this.state.currentPatient.address.country,
        postalCode: this.state.currentPatient.address.postalCode,
        phoneNum:this.state.currentPatient.phoneNum,
        nationality:this.state.currentPatient.nationality
    });
  }
  
  handleChange = async (event) => {

    await this.setState({
      [event.target.name]: event.target.value
    });
  }


  onSubmit = (event) => {
    event.preventDefault()

    const patientToUpdate = {
      patient: this.state.currentPatient.NRIC,
      firstName: this.state.currentPatient.firstName,
      lastName: this.state.currentPatient.lastName,
      dateOfBirth: this.state.currentPatient.dateOfBirth,
      address: {
        street: this.state.street,
        aptNum: this.state.aptNum,
        country: this.state.country,
        city: this.state.city,
        postalCode: this.state.postalCode
      },
      phoneNum: this.state.phoneNum,
      nationality: this.state.nationality,
      race: this.state.currentPatient.race,
      gender: this.state.currentPatient.gender
    }

    this.setState({
      isPosted: true
    })

    fetch('/hlf/api/org.healthcare.UpdatePatientPersonalInfo', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(patientToUpdate)
    })
    .catch(error => {
      console.log('Error parsing / posting data', error);
      this.setState({
        isPosted: false
      })
    });

    this.props.messageShow('Saving patient\'s personal information, please wait...')

    window.setTimeout(() => {
        this.props.messageHide()

        console.log("Is is posted? " + this.state.isPosted);

        this.state.isPosted ? 
            this.props.messageShow('Patient\'s medical information updated successfully!') : this.props.messageShow('Error occured, please try again')
        
        window.setTimeout(() => {
            this.props.messageHide()
        }, 3000)
        
        window.history.back();

    }, 1500)
  }

  render() {
    return (
      <div>
        {/* SEO */}
        <Helmet>
          <title>Record / Create or Edit - Doctor</title>
        </Helmet>

        {/* Top menu bar */}
        <DoctorMenu/>

        {/* Page Content */}
        <div>
          {/* Top actions bar */}
          <Grid alignCenter={true} style={{ padding: '1em' }}>
            <GridCell style={{ textAlign: 'left' }}>
              <Link to={patientRoutes.patientsDashboard.path}>
                <Button><Icon size={1.2}>arrow_back</Icon> Back</Button>
              </Link>
            </GridCell>
          </Grid>

          {/* Crate list */}
          <Grid alignCenter={true} style={{ padding: '1em' }}>
            <GridCell>
              <H4 font="secondary" style={{ marginBottom: '1em', textAlign: 'center' }}>
                Update Personal Information
              </H4>
              {/* Form */}
              <form onSubmit={this.onSubmit}>
                <div style={{ width: '25em', margin: '0 auto' }}>
                  {/* Name */}
                  
                  <H1 
                    style={{ marginTop: '1em', textAlign: 'center', marginBottom: '1em' }} 
                    fullWidth={true} >
                    
                     {this.state.currentPatient.firstName} {this.state.currentPatient.lastName} 
                     
                  </H1>
                
                  Phone Number
                  <Input
                    type="text"
                    fullWidth={true}
                    placeholder="e.g 61129885"
                    required="required"
                    name="phoneNum"
                    value={this.state.phoneNum}
                    onChange={this.handleChange}
                    style={{ marginBottom: '2em' }}
                  />

                  Nationality
                  <Input
                    type="text"
                    fullWidth={true}
                    placeholder="e.g Singaporean"
                    name="nationality"
                    value={this.state.nationality}
                    onChange={this.handleChange}
                    style={{ marginBottom: '2em' }}
                  />

                  Street
                  <Input
                    type="text"
                    fullWidth={true}
                    placeholder="Date"
                    name="street"
                    value={this.state.street}
                    onChange={this.handleChange}
                    style={{ marginBottom: '2em' }}
                  />

                  Apartment number
                  <Input
                    type="text"
                    fullWidth={true}
                    placeholder="Apt number"
                    name="aptNum"
                    value={this.state.aptNum}
                    onChange={this.handleChange}
                    style={{ marginBottom: '2em' }}
                  />

                  Country
                  <Input
                    type="text"
                    fullWidth={true}
                    placeholder="e.g Vietnam"
                    name="country"
                    value={this.state.country}
                    onChange={this.handleChange}
                    style={{ marginBottom: '2em' }}
                  />

                  City
                  <Input
                    type="text"
                    fullWidth={true}
                    placeholder="e.g Georgia"
                    name="city"
                    value={this.state.city}
                    onChange={this.handleChange}
                    style={{ marginBottom: '2em' }}
                  />

                  Postal code
                  <Input
                    type="text"
                    fullWidth={true}
                    placeholder="e.g 119278"
                    name="postalCode"
                    value={this.state.postalCode}
                    onChange={this.handleChange}
                    style={{ marginBottom: '2em' }}
                  />

                </div>

                {/* Form submit */}
                <div style={{ marginTop: '2em', textAlign: 'center' }}>
                  <Button type="submit" theme="secondary" disabled={this.state.isLoading}>
                    <Icon size={1.2} style={{ color: white }}>check</Icon> Update
                  </Button>
                </div>
              </form>
            </GridCell>
          </Grid>
        </div>
      </div>
    )
  }
}

// Component Properties
Edit.propTypes = {
  crateCreateOrUpdate: PropTypes.func.isRequired,
  getCrateById: PropTypes.func.isRequired,
  messageShow: PropTypes.func.isRequired,
  messageHide: PropTypes.func.isRequired
}

export default withRouter(connect(null, {
  crateCreateOrUpdate,
  getCrateById,
  messageShow,
  messageHide
})(Edit))
