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
import {
  createOrUpdate as crateCreateOrUpdate,
  getById as getCrateById
} from '../../crate/api/actions'
import { messageShow, messageHide } from '../../common/api/actions'
import DoctorMenu from '../common/Menu'

// Component
class CreateRecord extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isPosted: false,
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
      input_list: [],
      presID: '',
      drugName: '',
      quantity: '',
      unitType: '',
      dosage: '',
      duration: ''
    }

    this. add_new_input.bind(this)
    this.handleChange.bind(this)
  }

  componentDidMount() {
  }


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

    this.setState({
      isPosted: true
    })

    fetch('/doctor/api/org.healthcare.CreateMedicalRecord', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(medicalRecordToCreate)
    })
    .catch(error => {
      console.log('Error parsing / posting data', error);
      this.setState({
          isPosted: false
      })
    });

    this.props.messageShow('Saving Medical Record, please wait...')

    window.setTimeout(() => {
        this.props.messageHide()

        console.log("Is is posted? " + this.state.isPosted);

        this.state.isPosted ? 
            this.props.messageShow('Medical record created successfully!') : this.props.messageShow('Error occured, please try again')
        
        window.setTimeout(() => {
                this.props.messageHide()
        }, 3000)
        
        window.history.back();

    }, 1500)
  }

  onSubmitPrescription = (event) => {
    // {
    //   "$class": "org.healthcare.CreatePrescription",
    //   "prescription": {
    //     "$class": "org.healthcare.Prescription",
    //     "presID": "string",
    //     "drugName": "string",
    //     "quantity": "string",
    //     "unitType": "TABLET",
    //     "dosage": "string",
    //     "duration": "string",
    //     "medicalRecord": {},
    //     "lastModified": "2019-04-07T03:03:23.944Z"
    //   },
    //   "transactionId": "string",
    //   "timestamp": "2019-04-07T03:03:23.944Z"
    // }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  add_new_input() {
    let i = this.state.input_list.length;
    let val = this.state.input_list;
    val.push(
        <div id={i} style={{ width: '25em', margin: '0 auto' }}>

          {/* Auto-generate presID */}
          <Input
              type="text"
              fullWidth={true}
              placeholder="Prescription ID"
              required="required"
              name="drugName"
              // autoComplete="on"
              value={this.state.drugName}
              onChange={this.onChange}
              style={{ marginBottom: '2em' }}
          />
        </div>
    );
    this.setState({
      input_list:val
    })
  }


  render() {
    let input_list = [];
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
                {/* <Link to={admin.doctorMedicalRecord.path}> */}
                  <Button onClick={() => window.history.back() }><Icon size={1.2}>arrow_back</Icon> Back</Button>
                {/* </Link> */}
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
                    
                    Record ID
                    <Input
                        type="text"
                        fullWidth={true}
                        placeholder="Record ID"
                        required="required"
                        name="recordID"
                        autoComplete="off"
                        value={this.state.medicalRecord.recordID}
                        onChange={this.onChangeRecordID}
                        style={{ marginBottom: '2em' }}
                    />

                    Patient ID / NRIC
                    <Input
                        type="text"
                        fullWidth={true}
                        placeholder="Patient ID"
                        required="required"
                        name="patientID"
                        value={this.state.medicalRecord.patient}
                        onChange={this.onChangePatientID}
                        style={{ marginBottom: '2em' }}
                    />

                    Diagnosis
                    <Input
                        type="text"
                        fullWidth={true}
                        placeholder="Diagnosis"
                        required="required"
                        name="diagonsis"
                        value={this.state.medicalRecord.diagnosis}
                        onChange={this.onChangeDiagnosis}
                        style={{ marginBottom: '2em' }}
                    />

                    Ward - Level
                    <Input
                        type="text"
                        fullWidth={true}
                        placeholder="Ward-level"
                        // required="required"
                        name="wardLevel"
                        value={this.state.medicalRecord.wardInfo.level}
                        onChange={this.onChangeWardLevel}
                        style={{ marginBottom: '2em' }}
                    />

                    Ward - Room Number
                    <Input
                        type="text"
                        fullWidth={true}
                        placeholder="Ward-roomNum"
                        name="roomNum"
                        value={this.state.medicalRecord.wardInfo.roomNum}
                        onChange={this.onChangeWardRoomNum}
                        style={{ marginBottom: '2em' }}
                    />

                    Ward - Bed Number
                    <Input
                        type="text"
                        fullWidth={true}
                        placeholder="Ward-bedNum"
                        name="bedNum"
                        value={this.state.medicalRecord.wardInfo.bedNum}
                        onChange={this.onChangeWardBedNum}
                        style={{ marginBottom: '2em' }}
                    />
                  </div>

                  {/* <div style={{ marginTop: '2em', textAlign: 'center' }}>
                    {[...this.state.input_list]}
                    <Button style={{textAlign: 'center' }} onClick={this.add_new_input.bind(this)}>
                      <Icon size={1.2}>add</Icon> Add Prescription ID
                    </Button>
                  </div> */}

                  {/* Form submit */}
                  <div style={{ marginTop: '2em', textAlign: 'center' }}>
                    <Button type="submit" theme="secondary" disabled={this.state.isPosted}>
                      <Icon size={1.2} style={{ color: white }}>check</Icon> Create
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
CreateRecord.propTypes = {
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
})(CreateRecord))
