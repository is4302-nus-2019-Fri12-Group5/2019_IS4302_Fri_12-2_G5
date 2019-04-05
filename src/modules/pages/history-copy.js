// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

// UI Imports
import { Grid, GridCell } from '../../ui/grid'
import { H2, H5 } from '../../ui/typography'
import Button from '../../ui/button'
import ImageTile from '../../ui/image/Tile'
import { level1 } from '../../ui/common/shadows'

// App Imports
import { APP_URL } from '../../setup/config/env'
import crateRoutes from '../../setup/routes/crate'
import userRoutes from '../../setup/routes/patient'
import { getList as getProductList } from '../product/api/actions'

// Component
class History extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      medicalRecords: []
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
	  fetch("/hlf/api/org.healthcare.MedicalRecord")
	    .then(response => response.json())
        .then(responseData => {
          
          this.setState({
            medicalRecords: responseData
          });

        })
        .catch(error => {
          console.log('Error fetching and parsing data', error);
        });

  }

  render() {

    return (
    <Grid alignCenter={true} style={{ padding: '2em' }}>
      {/* SEO */}
      <Helmet>
        <title>Check Your Medical or Transaction History Here!</title>
      </Helmet>

      {/* Left Content - Image Collage */}
      <GridCell>
        <Grid gutter={true} alignCenter={true}>
          <GridCell justifyCenter={true}>
            <ImageTile width={300} height={530} shadow={level1} image={`${ APP_URL }/images/history_1.jpg`} />
          </GridCell>

          <GridCell>
            <Grid>
              <GridCell justifyCenter={true}>
                <ImageTile width={170} height={250} shadow={level1} image={`${ APP_URL }/images/history_2.jpg`} />
              </GridCell>
            </Grid>

            <Grid>
              <GridCell justifyCenter={true}>
                <ImageTile width={170} height={250} shadow={level1} image={`${ APP_URL }/images/history_3.jpg`} style={{ marginTop: '1.9em' }} />
              </GridCell>
            </Grid>
          </GridCell>
        </Grid>
      </GridCell>

      {/* Right Content */}
      <GridCell style={{ textAlign: 'center' }}>
        <H2 font="secondary">Online Medical History For You</H2>

        <H5 style={{ marginTop: '0.5em' }}>
          Reliable Medical Record for You. Detailed Medical Billing!
        </H5>

        {/* Call to action */}
        {
          props.user.isAuthenticated
            ? <Link to={crateRoutes.list.path}>
                <Button theme="secondary" style={{ marginTop: '1em' }}>Get Subscription</Button>
              </Link>
            : <Link to={userRoutes.signup.path}>
                <Button theme="secondary" style={{ marginTop: '1em' }}>Get Started</Button>
              </Link>
        }
      </GridCell>
    </Grid>
    )
  }
}
// Component Properties
History.propTypes = {
  user: PropTypes.object.isRequired
}

// Component State
function womenState(state) {
  return {
    user: state.user
  }
}

export default connect(womenState, {})(History)
