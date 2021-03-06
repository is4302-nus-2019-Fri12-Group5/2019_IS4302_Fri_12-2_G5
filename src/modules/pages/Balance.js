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
import Icon from '../../ui/icon'
import { white, grey, grey2 } from '../../ui/common/colors'

// App Imports
import crateRoutes from '../../setup/routes/crate'
import userRoutes from '../../setup/routes/patient'
import { getList as getProductList } from '../product/api/actions'
import Loading from '../common/Loading'
import EmptyMessage from '../common/EmptyMessage'
import ProductItem from '../product/Item'

// Component
class Balance extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      medicalRecords: [],
      patient: ''
    }
  }

  // Runs on server only for SSR
  static fetchData({ store }) {
    return store.dispatch(getProductList())
  }

  // Runs on client only
  componentDidMount() {
    this.props.getProductList();
    console.log("Passed medical record");
    
	  fetch("/hlf/api/org.healthcare.MedicalRecord")
	    .then(response => response.json())
        .then(responseData => {
          
          this.setState({
            medicalRecords : responseData
          });

        })
        .catch(error => {
          console.log('Error fetching and parsing data', error);
        });

        console.log("Passed patient");
      fetch("/hlf/api/org.healthcare.Patient")
      .then(response => response.json())
        .then(responseData => {
          
          this.setState({
            patient: responseData.find(response => response.NRIC = "p1")
          });

        })
        .catch(error => {
          console.log('Error fetching and parsing data', error);
        });
  }

  // componentDidMount() {
  //   this.props.getProductList();
  //   console.log("Passed");
  //   fetch('/hlf/api/org.healthcare.RemovePatientHospital', {
  //       method: 'POST',
  //       headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //           $class:'org.healthcare.RemovePatientHospital',
  //           patient: 'p1',
  //           hospital: 'h1',
  //           timestamp: new Date(),
        
  //       })
  //   });   
  // }

  render() {

    const { isLoading, list } = this.props.products;
    const { patient, medicalRecords } = this.state;


    console.log(medicalRecords);
    
    return (
      <div>
        {/* SEO */}
        <Helmet>
          <title>Balance - MediChain</title>
        </Helmet>

        {/* Top title bar */}
        <Grid style={{ backgroundColor: grey }}>
          <GridCell style={{ padding: '2em', textAlign: 'center' }}>
            <H3 font="secondary">Your Account Balance: {patient.walletBalance} </H3>

            <p style={{ marginTop: '1em', color: grey2 }}>Watch this space to keep updated with your transaction record!</p>
          </GridCell>
        </Grid>

        {/* Product list */}
        <Grid>
          {
            isLoading
              ? <Loading/>
              : medicalRecords.length > 0
                ? medicalRecords.map(singleRecord => (
                    <GridCell key={singleRecord.recordID} style={{ textAlign: 'center' }}>
                      <h4>{singleRecord.diagnosis}</h4>
                      <h4>{singleRecord.lastModified} </h4>
                      <h4>{singleRecord.prescriptions}</h4>
                      <br></br>

                    </GridCell>
                  ))
                : <EmptyMessage message="No history to show" />
          }
        </Grid>

        {/* <p> {patient.map(singlePatient => <li>{singlePatient.phoneNum} + "hello" </li>)} </p> */}

        
        {/* Bottom call to action bar */}
        <Grid style={{ backgroundColor: grey }}>
          <GridCell style={{ padding: '3em', textAlign: 'center' }}>
            <p style={{ marginBottom: '1em', color: grey2 }}>Like what you see?</p>

            {
              this.props.user.isAuthenticated
                ? <Link to={crateRoutes.list.path}>
                    <Button theme="primary">
                      Subscribe <Icon size={1.2} style={{ color: white }}>navigate_next</Icon>
                    </Button>
                  </Link>
                : <Link to={userRoutes.signup.path}>
                    <Button theme="primary">Start <Icon size={1.2} style={{ color: white }}>navigate_next</Icon></Button>
                  </Link>
            }
          </GridCell>
        </Grid>
      </div>
    )
  }
}

// Component Properties
Balance.propTypes = {
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

export default connect(whatsNewState, { getProductList })(Balance)
