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
import admin from '../../../setup/routes/doctors'
import { slug } from '../../../setup/helpers'
import {
  createOrUpdate as crateCreateOrUpdate,
  getById as getCrateById
} from '../../crate/api/actions'
import { messageShow, messageHide } from '../../common/api/actions'
import DoctorMenu from '../common/Menu'

// Component
class CreateOrEdit extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      medicalRecord: {
        recordID: '',
        date : new Date(),
        diagnosis: '',
        wardInfo: {
          level: '',
          roomNum: '',
          bedNum: ''
        },
        lastModified: new Date(),
        patient:'',
        doctor:'',
        hospital: '',
        prescriptions: []
      },
      
    }
  }

  componentDidMount() {
    // Get doctorMedicalcrate details (edit case)
    // this.getCrate(parseInt(this.props.match.params.id))

  
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


  // handleChange = (event) => {
  //   this.setState({
  //     [event.target.name]: event.target.value
  //   });
  // }

  onChangeRecordID = async (event) => {

    await this.setState({
      medicalRecord: {
        recordID: event.target.value,
        date: this.state.medicalRecord.date,
        patient: this.state.medicalRecord.patient,
        diagnosis: this.state.medicalRecord.diagnosis,
        wardInfo : {
          level: this.state.medicalRecord.wardInfo.level,
          bedNum: this.state.medicalRecord.wardInfo.bedNum,
          roomNum: this.state.medicalRecord.wardInfo.roomNum
        }
      },
    });

    console.log(this.state.medicalRecord.recordID);
  }
  
  onChangePatientID = async (event) => {
    
    await this.setState({
      medicalRecord: {
        recordID: this.state.medicalRecord.recordID,
        date: this.state.medicalRecord.date,
        patient: event.target.value,
        diagnosis: this.state.medicalRecord.diagnosis,
        wardInfo : {
          level: this.state.medicalRecord.wardInfo.level,
          bedNum: this.state.medicalRecord.wardInfo.bedNum,
          roomNum: this.state.medicalRecord.wardInfo.roomNum
        }
      },
    });
    
    await console.log(this.state.medicalRecord.patient);
  }

  onChangeDiagnosis = async (event) => {

    await this.setState({
      medicalRecord: {
        recordID: this.state.medicalRecord.recordID,
        date: this.state.medicalRecord.date,
        patient: this.state.medicalRecord.patient,
        diagnosis: event.target.value,
        wardInfo : {
          level: this.state.medicalRecord.wardInfo.level,
          bedNum: this.state.medicalRecord.wardInfo.bedNum,
          roomNum: this.state.medicalRecord.wardInfo.roomNum
        }
      },
    });
    console.log(this.state.medicalRecord.diagnosis);
  }

  onChangeWardBedNum = async (event) => {

    await this.setState({
      medicalRecord: {
        recordID: this.state.medicalRecord.recordID,
        date: this.state.medicalRecord.date,
        patient: this.state.medicalRecord.patient,
        diagnosis: this.state.medicalRecord.diagnosis,
        wardInfo : {
          level: this.state.medicalRecord.wardInfo.level,
          bedNum: event.target.value,
          roomNum: this.state.medicalRecord.wardInfo.roomNum
        }
      },
    });
    console.log(this.state.medicalRecord.wardInfo.bedNum);
  }

  onChangeWardLevel = async (event) => {

    await this.setState({
      medicalRecord: {
        recordID: this.state.medicalRecord.recordID,
        date: this.state.medicalRecord.date,
        patient: this.state.medicalRecord.patient,
        diagnosis: this.state.medicalRecord.diagnosis,
        wardInfo : {
          level: event.target.value,
          bedNum: this.state.medicalRecord.wardInfo.bedNum,
          roomNum: this.state.medicalRecord.wardInfo.roomNum
        }
      },
    });
    console.log(this.state.medicalRecord.wardInfo.level);
    console.log(this.state.medicalRecord.wardInfo.roomNum);
  }

  onChangeWardRoomNum = async (event) => {

    await this.setState({
      medicalRecord: {
        recordID: this.state.medicalRecord.recordID,
        date: this.state.medicalRecord.date,
        patient: this.state.medicalRecord.patient,
        diagnosis: this.state.medicalRecord.diagnosis,
        wardInfo : {
          level: this.state.medicalRecord.wardInfo.level,
          bedNum: this.state.medicalRecord.wardInfo.bedNum,
          roomNum: event.target.value
        }
      },
    });
    console.log(this.state.medicalRecord.wardInfo.roomNum);
  }


  onSubmit = (event) => {
    event.preventDefault()

    const medicalRecordToCreate = {
      medicalRecord: {
        recordID: this.state.medicalRecord.recordID,
        date : this.state.medicalRecord.date,
        diagnosis: this.state.medicalRecord.diagnosis,
        wardInfo: {
          level: this.state.medicalRecord.wardInfo.level,
          roomNum: this.state.medicalRecord.wardInfo.roomNum,
          bedNum: this.state.medicalRecord.wardInfo.bedNum
        },
        lastModified: new Date(),
        patient: "resource:org.healthcare.Patient#" + this.state.medicalRecord.patient,
        doctor: "resource:org.healthcare.Doctor#d1",
        hospital: "resource:org.healthcare.Hospital#h1",
        prescriptions: []
      }
    }

    fetch('/doctor/api/org.healthcare.CreateMedicalRecord', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(medicalRecordToCreate)
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

          this.props.doctorHowItWorks.push(admin.doctorMedicalRecord.path)
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
              <Link to={admin.doctorMedicalRecord.path}>
                <Button><Icon size={1.2}>arrow_back</Icon> Back</Button>
              </Link>
            </GridCell>
          </Grid>

          {/* Crate list */}
          <Grid alignCenter={true} style={{ padding: '1em' }}>
            <GridCell>
              <H4 font="secondary" style={{ marginBottom: '1em', textAlign: 'center' }}>
                {this.props.match.params.id === undefined ? 'Create' : 'Edit'} Medical Record
              </H4>

              {/* Form */}
              <form onSubmit={this.onSubmit}>
                <div style={{ width: '25em', margin: '0 auto' }}>
                  {/* Name */}
                  <Input
                    type="text"
                    fullWidth={true}
                    placeholder="Record ID"
                    required="required"
                    name="recordID"
                    autoComplete="off"
                    value={this.state.medicalRecord.recordID}
                    onChange={this.onChangeRecordID}
                  />
                  
                  <Textarea
                    fullWidth={true}
                    placeholder="PatientID"
                    required="required"
                    name="patientID"
                    value={this.state.medicalRecord.patient}
                    onChange={this.onChangePatientID}
                    style={{ marginTop: '1em' }}
                  />

                  {/* Description */}
                  <Textarea
                    fullWidth={true}
                    placeholder="Diagnosis"
                    required="required"
                    name="diagonsis"
                    value={this.state.medicalRecord.diagnosis}
                    onChange={this.onChangeDiagnosis}
                    style={{ marginTop: '1em' }}
                  /> 

                  <Textarea
                    fullWidth={true}
                    placeholder="Ward-level"
                    // required="required"
                    name="wardLevel"
                    value={this.state.medicalRecord.wardInfo.level}
                    onChange={this.onChangeWardLevel}
                    style={{ marginTop: '1em' }}
                  />

                  <Textarea
                    fullWidth={true}
                    placeholder="Ward-roomNum"
                    name="roomNum"
                    value={this.state.medicalRecord.wardInfo.roomNum}
                    onChange={this.onChangeWardRoomNum}
                    style={{ marginTop: '1em' }}
                  />
                  
                  <Textarea
                    fullWidth={true}
                    placeholder="Ward-bedNum"
                    name="bedNum"
                    value={this.state.medicalRecord.wardInfo.bedNum}
                    onChange={this.onChangeWardBedNum}
                    style={{ marginTop: '1em' }}
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
CreateOrEdit.propTypes = {
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
})(CreateOrEdit))
