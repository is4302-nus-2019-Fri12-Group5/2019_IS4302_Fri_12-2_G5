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
import { getList as getProductList, remove as removeProduct } from '../../product/api/actions'
import { messageShow, messageHide } from '../../common/api/actions'
import Loading from '../../common/Loading'
import EmptyMessage from '../../common/EmptyMessage'
import DoctorMenu from '../common/Menu'
import doctorsRoutes from '../../../setup/routes/doctors'
import { routeImage } from '../../../setup/routes'

// Component
class PatientList extends PureComponent {
  
  constructor(props) {
    super(props);
    this.state = {
      patients: [],
      doctor: "",
      // doctorNRIC: localStorage.getItem('user')  // comment this for UI TESTING
    }
    
    //localStorage.setItem('user', data);

    // // getter
    // localStorage.getItem('user');

    // // remove
    // localStorage.removeItem('user');

    // // remove all
    // localStorage.clear();
  }
   // Runs on server only for SSR
  static fetchData({ store }) {
    return store.dispatch(getProductList())
  }

  // Runs on client only
  componentDidMount() {
    this.props.getProductList();
    console.log("Passed");
    fetch("/doctor/api/org.healthcare.Patient")
	    .then(response => response.json())
        .then(patientList => {

          // const patientHospitalList = responseData.map(function(response) {
          //   return response.currentHospitals;
          // });
          console.log(this.state.doctorNRIC);

          console.log(patientList);

          // const patientsCopy = patientList.filter(patient => patient.medicalRecords.some(medicalRecord => medicalRecord == this.state.doctorNRIC));

          this.setState({
            patients: patientList
          });
          
        })
        .catch(error => {
          console.log('Error fetching and parsing data', error);
        });
        
        console.log("Passed 2nd time");
  }

  remove = (id) => {
    if (id > 0) {
      let check = confirm('Are you sure you want to delete this patient?')

      if (check) {
        this.props.messageShow('Deleting, please wait...')

        this.props.removeProduct({ id })
          .then(response => {
            if (response.status === 200) {
              if (response.data.errors && response.data.errors.length > 0) {
                this.props.messageShow(response.data.errors[0].message)
              } else {
                this.props.messageShow('Patient deleted successfully.')

                this.props.getProductList(false)
              }
            } else {
              this.props.messageShow('Please try again.')
            }
          })
          .catch(error => {
            this.props.messageShow('There was some error. Please try again.')

          })
          .then(() => {
            this.setState({
              isLoading: false
            })

            window.setTimeout(() => {
              this.props.messageHide()
            }, 5000)
          })
      }
    }
  }

  render() {
    const { isLoading, list } = this.props.products
    const { patients } = this.state

    return (
      <div>
        {/* SEO */}
        <Helmet>
          <title>Patients - Doctor</title>
        </Helmet>

        {/* Top menu bar */}
        <DoctorMenu/>

        {/* Page Content */}
        <div>

          {/* Product list */}
          <Grid alignCenter={true} style={{ padding: '1em' }}>
            <GridCell>
              <table className="striped">
                <thead>
                  <tr>
                    <th style={{ textAlign: 'center' }}>NRIC</th>
                    <th style={{ textAlign: 'center' }}>First Name</th>
                    <th style={{ textAlign: 'center' }}>Last Name</th>
                    <th style={{ textAlign: 'center' }}>Gender</th>
                    <th style={{ textAlign: 'center' }}>Last Visit</th>
                    <th style={{ textAlign: 'center' }}>Number of Medical Histories</th>
                    <th style={{ textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>

                <tbody>
                {/*mock data for testing*/}
                <tr>
                  <td style={{ textAlign: 'center' }}>A12344WED</td>
                  <td style={{ textAlign: 'center' }}>Kelvin</td>
                  <td style={{ textAlign: 'center' }}>Bro</td>
                  <td style={{ textAlign: 'center' }}>Male</td>
                  <td style={{ textAlign: 'center' }}>23/04/2018</td>
                  <td style={{ textAlign: 'center' }}>5</td>
                  <td style={{ textAlign: 'center' }}>
                    <Link to={doctorsRoutes.doctorPatientsRecord.path}>
                      <Button theme="secondary" style={{ marginRight: '1em' }}>Medical Records</Button>
                    </Link>

                    {/*this message button just for future*/}
                    <Icon size={2} style={{ color: black }}>email</Icon>

                  </td>
                </tr>
                {
                  isLoading
                    ? <tr>
                        <td colSpan="6">
                          <Loading message="loading patients..."/>
                        </td>
                      </tr>
                    : patients.length > 0
                      ? patients.map((patient) => (
                          <tr key={patient.NRIC}>
                            <td style={{ textAlign: 'center' }}>
                              { patient.NRIC}
                            </td>

                            <td style={{ textAlign: 'center' }}>
                              { patient.firstName }
                            </td>

                            <td style={{ textAlign: 'center' }}>
                              { patient.lastName }
                            </td>

                            <td style={{ textAlign: 'center' }}>
                              { patient.gender }
                              {/* { new Date(parseInt(lastVisit)).toDateString() } */}
                            </td>

                            <td style={{ textAlign: 'center' }}>
                              { patient.lastVisit } 
                            </td>

                            <td style={{ textAlign: 'center' }}>
                              { patient.medicalRecords.length }
                              {/* { new Date(parseInt(updatedAt)).toDateString() } */}
                            </td>

                            <td style={{ textAlign: 'center' }}>

                              { patient.currentHospitals.length } 
                              {/* <Link to={admin.productEdit.path(id)}>
                                <Icon size={2} style={{ color: black }}>mode_edit</Icon>
                              </Link>

                              <span style={{ cursor: 'pointer' }} onClick={this.remove.bind(this, id)}>
                                  <Icon size={2} style={{ marginLeft: '0.5em' }}>delete</Icon>
                                </span> */}
                            </td>
                          </tr>
                        ))
                      : <tr>
                          <td colSpan="6">
                            <EmptyMessage message="No patients to show."/>
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
PatientList.propTypes = {
  products: PropTypes.object.isRequired,
  getProductList: PropTypes.func.isRequired,
  removeProduct: PropTypes.func.isRequired,
  messageShow: PropTypes.func.isRequired,
  messageHide: PropTypes.func.isRequired
}

// Component State
function listState(state) {
  return {
    products: state.products
  }
}

export default connect(listState, { getProductList, removeProduct, messageShow, messageHide })(PatientList)
