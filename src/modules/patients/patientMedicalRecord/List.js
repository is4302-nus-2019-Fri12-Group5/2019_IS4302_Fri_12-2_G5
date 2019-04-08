// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

// UI Imports
import { Grid, GridCell } from '../../../ui/grid'
import Button from '../../../ui/button'
import Icon from '../../../ui/icon'
import { white, black } from '../../../ui/common/colors'

// App Imports
import { getList as getCrateList, remove as removeCrate } from '../../crate/api/actions'
import { messageShow, messageHide } from '../../common/api/actions'
import Loading from '../../common/Loading'
import EmptyMessage from '../../common/EmptyMessage'
import DoctorMenu from '../common/Menu'
import doctorsRoute from '../../../setup/routes/doctors'

// Component
class List extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      medicalRecords:[],
      selectedMedicalRecord: ''
    }
  }
  // Runs on server only for SSR
  // static fetchData({ store }) {
  //   return store.dispatch(getCrateList('DESC'))
  // }

  // Runs on client only
  componentDidMount() {
    this.props.getCrateList('DESC')
    fetch("/hlf/api/org.healthcare.MedicalRecord")
	    .then(response => response.json())
        .then(responseData => {
          this.setState({
            medicalRecords: responseData
          });
          console.log(this.state.medicalRecords);
        })
        .catch(error => {
          console.log('Error fetching and parsing data', error);
        });
  }

  handlePayBill = (singleRecord) => {

    const selectedMedicalRecord = singleRecord;
    
    console.log(selectedMedicalRecord);
    console.log(selectedMedicalRecord.patient);
    console.log(selectedMedicalRecord.doctor);

    const billToPay = {
      $class: "org.healthcare.PayFees",
      patient: selectedMedicalRecord.patient,
      doctor: selectedMedicalRecord.doctor,
    }
        

    fetch('/hlf/api/org.healthcare.PayFees', {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(billToPay)
    }); 
  }

  render() {
    const { isLoading, list } = this.props.crates
    const { medicalRecords } = this.state

    return (
      <div>
        {/* SEO */}
        <Helmet>
          <title>Records - Patient</title>
        </Helmet>

        {/* Top menu bar */}
        <DoctorMenu/>

        {/* Page Content */}
        <div>

          {/* Medical Record list */}
          <Grid alignCenter={true} style={{ padding: '1em' }}>
            <GridCell>
              <table className="striped">
                <thead>
                <tr>
                  <th style={{ textAlign: 'center' }}>RecordID</th>
                  <th style={{ textAlign: 'center' }}>Date</th>
                  <th style={{ textAlign: 'center' }}>Doctor</th>
                  <th style={{ textAlign: 'center' }}>Hospital</th>
                  <th style={{ textAlign: 'center' }}>Diagnosis</th>
                  <th style={{ textAlign: 'center' }}>LastModified</th>
                  <th style={{ textAlign: 'center' }}>Actions</th>
                </tr>
                </thead>

                <tbody>
                {/* Mock data */}
                {/* <tr>
                  <td style={{ textAlign: 'center' }}>GX04001 </td>
                  <td style={{ textAlign: 'center' }}>2018/09/12 </td>
                  <td style={{ textAlign: 'center' }}>Bruce Lee</td>
                  <td style={{ textAlign: 'center' }}>National University Hospital</td>
                  <td style={{ textAlign: 'center' }}>Bad Cold with peritonsillr bscess.</td>
                  <td style={{ textAlign: 'center' }}>2018/09/12</td>
                  <td style={{ textAlign: 'center' }}>
                    
                    <Button type="button" style={{marginRight : '0.5em'}}>See Prescriptions</Button>

                    <Button type="button" theme="secondary" style={{marginRight : '0.5em'}}>Pay Doctor</Button>

                  </td>
                </tr> */}

                {/* Get data from backend */}
                {
                  isLoading
                    ? <tr>
                        <td colSpan="7">
                          <Loading message="loading medical records..."/>
                        </td>
                      </tr>
                    : medicalRecords.length > 0
                      ? medicalRecords.map((singleRecord) => (
                          <tr key={singleRecord.recordID}>
                            <td style={{ textAlign: 'center' }}>
                              { singleRecord.recordID }
                            </td>

                            <td style={{ textAlign: 'center' }}>
                              { singleRecord.date }
                            </td>

                            <td style={{ textAlign: 'center' }}>
                              { singleRecord.doctor }
                            </td>

                            <td style={{ textAlign: 'center' }}>
                              { singleRecord.hospital }
                            </td>

                            <td style={{ textAlign: 'center' }}>
                              { singleRecord.diagnosis }
                            </td>

                            <td style={{ textAlign: 'center' }}>
                              { singleRecord.lastModified  }
                            </td>

                            <td style={{ textAlign: 'center' }}>
                              <Button type="button" theme="primary" style={{marginRight : '0.5em'}}  
                                    onClick={() => this.handlePayBill(singleRecord)}> Pay </Button>
                            </td>
                          </tr>
                        ))
                      : <tr>
                          <td colSpan="7">
                            <EmptyMessage message="No medical records to show. The above is Mock Data."/>
                          </td>
                        </tr>
                }

                </tbody>
              </table>
            </GridCell>
          </Grid>
        </div>
      </div>
    )
  }
}

// Component Properties
List.propTypes = {
  crates: PropTypes.object.isRequired,
  getCrateList: PropTypes.func.isRequired,
  removeCrate: PropTypes.func.isRequired,
  messageShow: PropTypes.func.isRequired,
  messageHide: PropTypes.func.isRequired
}

// Component State
function listState(state) {
  return {
    crates: state.crates
  }
}

export default connect(listState, { getCrateList, removeCrate, messageShow, messageHide })(List)
