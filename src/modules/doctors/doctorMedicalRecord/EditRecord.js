// Imports
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

// UI Imports
import { Grid, GridCell } from '../../../ui/grid'
import Button from '../../../ui/button'
import Icon from '../../../ui/icon'
import H4 from '../../../ui/typography/H4'
import { Input, Textarea } from '../../../ui/input'
import { white } from "../../../ui/common/colors"

// App Imports
import doctorsRoutes from '../../../setup/routes/doctors'
import { slug } from '../../../setup/helpers'
import {
  createOrUpdate as crateCreateOrUpdate,
  getById as getCrateById
} from '../../crate/api/actions'
import { messageShow, messageHide } from '../../common/api/actions'
import DoctorMenu from '../common/Menu'

// Component
class EditRecord extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      date : '',
      diagnosis: '',
      wardLevel: '',
      wardRoomNum: '',
      wardBedNum: '',
      currentMedicalRecord: ''
    }
  }

  componentDidMount() {
    // Get doctorMedicalcrate details (edit case)
    // this.getCrate(parseInt(this.props.match.params.id))
    console.log(this.props)
    
    fetch(`/doctor/api/org.healthcare.MedicalRecord/${this.props.match.params.id}`)
	    .then(response => response.json())
        .then(responseData => {
          this.setState({
            currentMedicalRecord: responseData,
          });
          console.log(this.state.currentMedicalRecord);

          this.updateState();
          
        })
        .catch(error => {
          console.log('Error fetching and parsing data', error);
        });

    
  }

  // getCrate = (crateId) => {
  //   if (crateId > 0) {
  //     this.props.getCrateById(crateId)
  //       .then(response => {
  //         if (response.data.errors && response.data.errors.length > 0) {
  //           this.props.messageShow(response.data.errors[0].message)
  //         } else {
  //           this.setState({
  //             crate: response.data.data.crateById
  //           })
  //         }
  //       })
  //       .catch(error => {
  //         this.props.messageShow('There was some error fetching doctorMedicalRecord types. Please try again.')
  //       })
  //   }
  // }

  updateState = async () => {
    await this.setState({
        date: this.state.currentMedicalRecord.date,
        diagnosis: this.state.currentMedicalRecord.diagnosis,
        wardLevel: this.state.currentMedicalRecord.wardInfo.level,
        wardRoomNum: this.state.currentMedicalRecord.wardInfo.roomNum,
        wardBedNum: this.state.currentMedicalRecord.wardInfo.bedNum,
    });

    console.log(this.state.date);
    console.log(this.state.diagnosis);
    console.log(this.state.wardBedNum);
  }
  handleChange = async (event) => {

    await this.setState({
      [event.target.name]: event.target.value
    });

    console.log("Diagnosis: " + this.state.diagnosis);
    console.log("Date: " + this.state.date);
    console.log("Ward bed num: " + this.state.wardBedNum);
  }


  onSubmit = (event) => {
    event.preventDefault()

    console.log(this.state.date);
    console.log(this.state.diagnosis);
    console.log(this.state.wardBedNum);

    const medicalRecordToUpdate = {
        medicalRecord: this.state.currentMedicalRecord.recordID,
        date : this.state.date,
        diagnosis: this.state.diagnosis,
        wardInfo: {
          level: this.state.wardLevel,
          roomNum: this.state.wardRoomNum,
          bedNum: this.state.wardBedNum
        },
        lastModified: new Date(),
    }

    fetch('/doctor/api/org.healthcare.UpdateMedicalRecord', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(medicalRecordToUpdate)
    });
    
    this.setState({
      isLoading: true
    })

    this.props.messageShow('Saving Medical Record, please wait...')

    // Save doctorMedicalRecord
    this.props.crateCreateOrUpdate(this.state.medicalRecord)
      .then(response => {
        this.setState({
          isLoading: false
        })

        if (response.data.errors && response.data.errors.length > 0) {
          this.props.messageShow(response.data.errors[0].message)
        } else {
          this.props.messageShow('Medical Record saved successfully.')

          this.props.doctorHowItWorks.push(doctorsRoutes.doctorMedicalRecord.path)
        }
      })
      .catch(error => {
        this.props.messageShow('There was some error. Please try again.')

        this.setState({
          isLoading: false
        })
      })
      .then(() => {
        window.setTimeout(() => {
          this.props.messageHide()
        }, 5000)
      })
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
              <Link to={doctorsRoutes.doctorMedicalRecord.path}>
                <Button><Icon size={1.2}>arrow_back</Icon> Back</Button>
              </Link>
            </GridCell>
          </Grid>

          {/* Crate list */}
          <Grid alignCenter={true} style={{ padding: '1em' }}>
            <GridCell>
              <H4 font="secondary" style={{ marginBottom: '1em', textAlign: 'center' }}>
                {this.props.match.params.id === undefined ? 'Create' : 'EditRecord'} Medical Record
              </H4>
              {/* Form */}
              <form onSubmit={this.onSubmit}>
                <div style={{ width: '25em', margin: '0 auto' }}>
                  {/* Name */}
                  
                  <h3 
                    style={{ marginTop: '1em', textAlign: 'center' }} 
                    fullWidth={true} >
                    
                     {this.state.currentMedicalRecord.recordID} 
                     
                  </h3>
                
                
                  <Input
                    type="text"
                    fullWidth={true}
                    placeholder="Diagnosis"
                    required="required"
                    name="diagnosis"
                    autoComplete="off"
                    value={this.state.diagnosis}
                    onChange={this.handleChange}
                  />

                  <Input
                    type="text"
                    fullWidth={true}
                    placeholder="Date"
                    name="date"
                    autoComplete="off"
                    value={this.state.date}
                    onChange={this.handleChange}
                  />

                  <Input
                    type="text"
                    fullWidth={true}
                    placeholder="Ward Level"
                    name="wardLevel"
                    autoComplete="off"
                    value={this.state.wardLevel}
                    onChange={this.handleChange}
                  />

                  <Input
                    type="text"
                    fullWidth={true}
                    placeholder="Ward Room Num"
                    name="wardRoomNum"
                    autoComplete="off"
                    value={this.state.wardRoomNum}
                    onChange={this.handleChange}
                  />    
                  
                  <Input
                    type="text"
                    fullWidth={true}
                    placeholder="Ward Bed Num"
                    name="wardBedNum"
                    autoComplete="off"
                    value={this.state.wardBedNum}
                    onChange={this.handleChange}
                  />
                </div>

                {/* Form submit */}
                <div style={{ marginTop: '2em', textAlign: 'center' }}>
                  <Button type="submit" theme="secondary" disabled={this.state.isLoading}>
                    <Icon size={1.2} style={{ color: white }}>check</Icon> Save
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
EditRecord.propTypes = {
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
})(EditRecord))
