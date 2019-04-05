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
        error: null,
        isLoaded: false,
		patientInfo: [],
      };
  }

  // Runs on server only for SSR
  static fetchData({ store }) {
    return store.dispatch(getProductList())
  }

  // Runs on client only
  componentDidMount() {
    this.props.getProductList();
	fetch("/hlf/api/org.healthcare.Patient")
      .then(response => response.json())
      .then(responseData => {
          this.setState({
              isLoaded: true,
              patientInfo: responseData,
          });
	  })
      .catch(error => {
	      this.setState({
              isLoaded: true,
			  error
          });
	      console.log('Error fetching and parsing data', error);
      });
  }

  render() {
    const { isLoading, list } = this.props.products
	const { error, isLoaded, patientInfo} = this.state

    return (
      <div>
        {/* SEO */}
        <Helmet>
          <title>Balance - MediChain</title>
        </Helmet>

        {/* Top title bar */}
        <Grid style={{ backgroundColor: grey }}>
          <GridCell style={{ padding: '2em', textAlign: 'center' }}>
            <H3 font="secondary">Your Account Balance:     230 </H3>

            <p style={{ marginTop: '1em', color: grey2 }}>Watch this space to keep updated with your transaction record!</p>
          </GridCell>
        </Grid>

        {/* Product list */}
        <Grid>
          {
            isLoading
              ? <Loading/>
              : patientInfo.length > 0
                ? patientInfo.map(patient => (
                    <GridCell key={patient.NRIC} style={{ textAlign: 'center' }}>
                      <p>{patient.dateOfBirth}</p>
                    </GridCell>
                  ))
                : <EmptyMessage message="No history to show" />
          }
        </Grid>

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
