// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

// UI Imports
import { Grid, GridCell } from '../../../ui/grid'
import Button from '../../../ui/button'
import {white, black, grey, grey2, grey3} from '../../../ui/common/colors'

// App Imports
import { getList as getProductList, remove as removeProduct } from '../../product/api/actions'
import Loading from '../../common/Loading'
import EmptyMessage from '../../common/EmptyMessage'
import {H3} from "../../../ui/typography";
import PatientMenu from '../common/Menu'

// Component
class HospitalList extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      hospital: [],
      filteredHospital: [],
      selectedPatient: ''
    }
    this.refreshList = this.refreshList.bind(this);
  }

  // Runs on server only for SSR
  static fetchData({ store }) {
    return store.dispatch(getProductList())
  }

  // Runs on client only
  componentDidMount() {
    this.props.getProductList();
    console.log("Getting p1");
    
    fetch("/hlf/api/org.healthcare.Patient")
        .then(response => response.json())
        .then(responseData => {

          this.setState({
            selectedPatient: responseData[0]
          });
        })
        .catch(error => {
          console.log('Error fetching and parsing data', error);
        });

    console.log("Getting the hospital of the patient");

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
      patient: 'resource:org.healthcare.Patient#p1',
      hospital: event.target.value,
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

    this.testFunction();
    this.refreshList();
  }

  testFunction = () => {
    console.log("Function working");
  }

  refreshList = async () => {
    
    const response = await fetch("/hlf/api/org.healthcare.Hospital");
    const responseData = await response.json();

    // await fetch("/hlf/api/org.healthcare.Hospital")
    // .then(response => response.json())
    // .then(responseData => {
      
      console.log("Response data: " + responseData);
      const thePatientHospitals = this.state.selectedPatient.currentHospitals;

      const filteredList = responseData.filter(hospitals => thePatientHospitals.some(c => c == "resource:org.healthcare.Hospital#" + hospitals.registrationID));

      console.log("The patient's hospitals: " + thePatientHospitals);
      console.log("Before set: " + this.state.filteredHospital);
      console.log("filteredList: " + filteredList);


      await this.setState({
        filteredHospital: filteredList
      });

      console.log("After click: " + thePatientHospitals);
      await console.log(this.state.filteredHospital);

      window.location.reload();
  }

  handleRemoveHospital = (event) => {

    event.preventDefault();

    const hospitalToRemove = {
      $class:'org.healthcare.RemovePatientHospital',
      patient: 'resource:org.healthcare.Patient#p1',
      hospital: event.target.value,
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

    this.testFunction();
    this.refreshList();
  }

  render() {
    const { isLoading, list } = this.props.products;
    const { hospital, filteredHospital } = this.state;

    return (
        <div>
          {/* SEO */}
          <Helmet>
            <title>Hospitals - MediChain</title>
          </Helmet>

            {/* Top menu bar */}
            <PatientMenu/>

          {/* Top title bar */}
          <Grid style={{ backgroundColor: grey }}>
            <GridCell style={{ padding: '2em', textAlign: 'center' }}>
              <H3 font="secondary">Your Current Hospital </H3>
            </GridCell>
          </Grid>

          {/* Get Current Hospital list */}
          <Grid>
              <table className="striped">
                  <thead>
                  <tr>
                      <th style={{ textAlign: 'center' }}>RegistrationID</th>
                      <th style={{ textAlign: 'center' }}>Name</th>
                  </tr>
                  </thead>

                  <tbody>
                  {/* Mock data */}
                  <tr>
                      <td style={{ textAlign: 'center' }}>AX001 </td>
                      <td style={{ textAlign: 'center' }}>National University Hospital </td>
                      <td style={{ textAlign: 'center' }}>

                          {/*<Link to={}>*/}
                          <Button type="button" theme="secondary" style={{marginRight : '0.5em'}}>Remove</Button>
                          {/*</Link>*/}

                      </td>
                  </tr>

                  {/* Get data from backend */}
                  {
                      isLoading
                          ? <tr>
                              <td colSpan="6">
                                  <Loading message="loading hospitals..."/>
                              </td>
                          </tr>
                          : filteredHospital.length > 0
                          ? filteredHospital.map((singleHospital) => (
                              <tr key={singleHospital.registrationID}>
                                  <td style={{ textAlign: 'center' }}>{ singleHospital.registrationID }</td>
                                  <td style={{ textAlign: 'center' }}>{ singleHospital.name }</td>
                                  <td style={{ textAlign: 'center' }}>
                                      {/*<Link to={}>*/}
                                      <Button type="button" theme="primary" style={{marginRight : '0.5em'}} value={singleHospital.registrationID}
                                      onClick={this.handleRemoveHospital}>Remove</Button>

                                      {/*</Link>*/}
                                  </td>
                              </tr>
                          ))
                          : <tr>
                              <td colSpan="3">
                                  <EmptyMessage message="You haven't added any hospital yet. The above is Mock Data."/>
                              </td>
                          </tr>
                  }
                  </tbody>
              </table>
          </Grid>

            {/* Second title bar */}
            <Grid style={{ backgroundColor: grey }}>
                <GridCell style={{ padding: '2em', textAlign: 'center' }}>
                    <H3 font="secondary">All Hospitals </H3>
                    <p style={{ marginTop: '1em', color: grey2 }}>Watch this space to keep updated with available hospitals!</p>
                </GridCell>
            </Grid>

          {/* Get All Hospital list */}
          <Grid>
              <table className="striped">
                  <thead>
                  <tr>
                      <th style={{ textAlign: 'center' }}>RegistrationID</th>
                      <th style={{ textAlign: 'center' }}>Name</th>
                  </tr>
                  </thead>

                  <tbody>
                  {/* Mock data */}
                  <tr>
                      <td style={{ textAlign: 'center' }}>AX002 </td>
                      <td style={{ textAlign: 'center' }}>Singapore General Hospital</td>
                      <td style={{ textAlign: 'center' }}>
                          {/*<Link to={}>*/}
                          <Button type="button" theme="secondary" style={{marginRight : '0.5em'}}>Add</Button>
                          {/*</Link>*/}
                      </td>
                  </tr>
                  <tr>
                      <td style={{ textAlign: 'center' }}>AX003</td>
                      <td style={{ textAlign: 'center' }}>Changi General Hospital</td>
                      <td style={{ textAlign: 'center' }}>
                          {/*<Link to={}>*/}
                          <Button type="button" theme="secondary" style={{marginRight : '0.5em'}}>Add</Button>
                          {/*</Link>*/}
                      </td>
                  </tr>

                  {/* Get data from backend */}
                  {
                      isLoading
                          ? <tr>
                              <td colSpan="6">
                                  <Loading message="loading hospitals..."/>
                              </td>
                          </tr>
                          : hospital.length > 0
                          ? hospital.map((singleHospital) => (
                            <tr key={singleHospital.registrationID}>
                                <td style={{ textAlign: 'center' }}>{ singleHospital.registrationID }</td>
                                <td style={{ textAlign: 'center' }}>{ singleHospital.name }</td>
                                <td style={{ textAlign: 'center' }}>
                                    {/*<Link to={}>*/}
                                    <Button type="button" theme="primary" style={{marginRight : '0.5em'}} value={singleHospital.registrationID} 
                                    onClick={this.handleAddHospital}>Add</Button>
                                    {/*</Link>*/}
                                </td>
                            </tr>
                          ))
                          : <tr>
                              <td colSpan="3">
                                  <EmptyMessage message="No hospitals to show. The above is Mock Data."/>
                              </td>
                          </tr>
                  }
                  </tbody>
              </table>
          </Grid>

            {/* Third title bar */}
            <Grid style={{ backgroundColor: grey }}>
                <GridCell style={{ padding: '2em', textAlign: 'center' }}>
                    <H3 font="secondary">Manage Your Hospitals </H3>
                    <p style={{ marginTop: '1em', color: grey2 }}>Add or Remove a hospital!</p>
                </GridCell>
            </Grid>

            {/* Add new hospital */}
            <Grid>
                <GridCell style={{ padding: '2em', textAlign: 'center' }}>
                    {/* Retrival Forms */}
                    <form id="addHospital" onSubmit={this.handleAddHospital}>
                        <label style={{ textAlign: 'center', color: grey3, flex: 1, padding: 10 }}>
                            Patient:
                            <input type="text" name="patient"/>
                        </label>
                        <label style={{ textAlign: 'center', color: grey3, flex: 1, padding: 10 }}>
                            Hospital:
                            <input type="text" name="hospital" />
                        </label>
                        <input type="submit"  style={{ textAlign: 'center', flex: 1, padding: 10 }} value="Add hospital" />
                    </form>
                </GridCell>
            </Grid>

            {/* Remove hospital */}
            <Grid>
                <GridCell style={{ padding: '2em', textAlign: 'center' }}>
                    <form id="removeHospital" onSubmit={this.handleRemoveHospital}>
                        <label style={{ textAlign: 'center', color: grey3, flex: 1, padding: 10 }}>
                            Patient:
                            <input type="text" name="patientremove"/>
                        </label>
                        <label style={{ textAlign: 'center', color: grey3, flex: 1, padding: 10 }}>
                            Hospital:
                            <input type="text" name="hospitalremove" />
                        </label>
                        <input type="submit" style={{ textAlign: 'center', flex: 1, padding: 10 }} value="Remove hospital" />
                    </form>
                </GridCell>
            </Grid>
        </div>
    )
  }
}

// Component Properties
HospitalList.propTypes = {
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

export default connect(whatsNewState, { getProductList })(HospitalList)