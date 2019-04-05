// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

// UI Imports
import { Grid, GridCell } from '../../ui/grid'
import { H3 } from '../../ui/typography'
import Button from '../../ui/button'
import Icon from '../../ui/image/Tile'
import { white, grey, grey2 } from '../../ui/common/colors'

// App Imports
import { APP_URL } from '../../setup/config/env'
import crateRoutes from '../../setup/routes/crate'
import userRoutes from '../../setup/routes/patient'
import { getList as getProductList } from '../product/api/actions'
import Loading from '../common/Loading'
import EmptyMessage from '../common/EmptyMessage'
import ProductItem from '../product/Item'

// Component
class Hospital extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      hospital: [],
      filteredHospital: [],
      selectedPatient: ''
    }
  }

  // Runs on server only for SSR
  static fetchData({ store }) {
    return store.dispatch(getProductList())
  }

  // Runs on client only
  componentDidMount() {
    this.props.getProductList();
    console.log("Passed");
    fetch("/hlf/api/org.healthcare.Patient")
	    .then(response => response.json())
        .then(responseData => {

          // const patientHospitalList = responseData.map(function(response) {
          //   return response.currentHospitals;
          // });

          const thePatient = responseData.find((response) => response.NRIC == 'p1');

          this.setState({
            selectedPatient: thePatient
          });
        })
        .catch(error => {
          console.log('Error fetching and parsing data', error);
        });
        
        console.log("Passed 2nd time");

	  fetch("/hlf/api/org.healthcare.Hospital")
	    .then(response => response.json())
        .then(responseData => {
          
          const thePatientHospitals = this.state.selectedPatient.currentHospitals;

          const filteredList = responseData.filter(hospitals => thePatientHospitals.some(c => c == "resource:org.healthcare.Hospital#" + hospitals.registrationID));

          this.setState({
            hospital: responseData,
            filteredHospital: filteredList
          });

          console.log(thePatientHospitals);
          console.log(responseData);

        })
        .catch(error => {
          console.log('Error fetching and parsing data', error);
        });
  }

  handleAddHospital = async (event) => {

      event.preventDefault();

      const newHospital = {
        $class:'org.healthcare.AddPatientHospital',
        patient: event.target.patient.value,
        hospital: event.target.hospital.value,
        timestamp: new Date()
      }

      await fetch('/hlf/api/org.healthcare.AddPatientHospital', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newHospital)
    });

  await fetch("/hlf/api/org.healthcare.Hospital")
    .then(response => response.json())
      .then(responseData => {
        
        const thePatientHospitals = this.state.selectedPatient.currentHospitals;

        const filteredList = responseData.filter(hospitals => thePatientHospitals.some(c => c == "resource:org.healthcare.Hospital#" + hospitals.registrationID));

        this.setState({
          filteredHospital: filteredList
        });

        console.log("After add" + thePatientHospitals);
        console.log(responseData);

      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  handleRemoveHospital = (event) => {

    event.preventDefault();

      const hospitalToRemove = {
        $class:'org.healthcare.RemovePatientHospital',
        patient: event.target.patientremove.value,
        hospital: event.target.hospitalremove.value,
        timestamp: new Date()
      }

      fetch('/hlf/api/org.healthcare.RemovePatientHospital', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(hospitalToRemove)
    });
  }

  render() {
    
    const { isLoading, list } = this.props.products;
    const { hospital, filteredHospital } = this.state;
    
    return (
        <div>
          {/* SEO */}
          <Helmet>
            <title>Hospital - MediChain</title>
          </Helmet>

          {/* Top title bar */}
          <Grid style={{ backgroundColor: grey }}>
            <GridCell style={{ padding: '2em', textAlign: 'center' }}>
              <H3 font="secondary">Your Current Hospital </H3>
              <form id="addHospital" onSubmit={this.handleAddHospital}>
                <label>
                  Patient:
                  <input type="text" name="patient"/>
                </label>
                <label>
                  Hospital:
                  <input type="text" name="hospital" />
                </label>
                <input type="submit" value="Add hospital" />
              </form>
              <form id="removeHospital" onSubmit={this.handleRemoveHospital}>
                <label>
                  Patient:
                  <input type="text" name="patientremove"/>
                </label>
                <label>
                  Hospital:
                  <input type="text" name="hospitalremove" />
                </label>
                <input type="submit" value="Remove hospital" />
              </form>
              <p style={{ marginTop: '1em', color: grey2 }}>Watch this space to keep updated with available hospitals!</p>
            </GridCell>
          </Grid>

          {/* Product list */}
          <Grid>
            {
              isLoading
                  ? <Loading/>
                  : filteredHospital.length > 0
                  ? filteredHospital.map(eachHospital => (
                      <GridCell key={eachHospital.registrationID} style={{ textAlign: 'center' }}>
                        <p> {eachHospital.registrationID} </p>
                      </GridCell>
                  ))
                  : <EmptyMessage message="No hospital to show" />
            }
          </Grid>

            {/* Second title bar */}
            <Grid style={{ backgroundColor: grey }}>
                <GridCell style={{ padding: '2em', textAlign: 'center' }}>
                    <H3 font="secondary">More Hospitals </H3>

                    <p style={{ marginTop: '1em', color: grey2 }}>Find more hospitals!</p>
                </GridCell>
            </Grid>

            {/* Product list */}
            <Grid>
                {
                    isLoading
                        ? <Loading/>
                        : hospital.length > 0
                        ? hospital.map(eachHospital => (
                            <GridCell key={eachHospital.registrationID} style={{ textAlign: 'center' }}>
                                <p> {eachHospital.registrationID} </p>
                            </GridCell>
                        ))
                        : <EmptyMessage message="No More hospital to show" />
                }
            </Grid>

        </div>
    )
  }
}









// Component Properties
Hospital.propTypes = {
  user: PropTypes.object.isRequired,
  products: PropTypes.object.isRequired,
  getProductList: PropTypes.func.isRequired
}

// Component State
function whatsNewState(state) {
  return {
    user: state.user,
    products: state.products
  }
}

export default connect(whatsNewState, { getProductList })(Hospital)
