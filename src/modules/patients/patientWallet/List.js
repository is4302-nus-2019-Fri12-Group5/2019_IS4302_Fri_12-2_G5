// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

// UI Imports
import { Grid, GridCell } from '../../../ui/grid'
import Button from '../../../ui/button'

// App Imports
import { getList as getSubscriptionsList } from '../../subscription/api/actions'
import { messageShow, messageHide } from '../../common/api/actions'
import Loading from '../../common/Loading'
import EmptyMessage from '../../common/EmptyMessage'
import PatientMenu from '../common/Menu'
import ImageTile from "../../../ui/image/Tile";
import {level1} from "../../../ui/common/shadows";
import {APP_URL} from "../../../setup/config/env";
import {H3, H4} from "../../../ui/typography";
import {grey2} from "../../../ui/common/colors";
import {Link} from "react-router-dom";
import doctorsRoutes from "../../../setup/routes/doctors";
import home from "../../../setup/routes/home";
import {logout} from "../../doctor/api/actions";

// Component
const Wallet = (props) => (
      <div>
          {/* SEO */}
          <Helmet>
            <title>My Wallet - MediChain</title>
          </Helmet>

          {/* Top menu bar */}
          <PatientMenu/>

          {/* Page Content */}
          <div>
              <Grid gutter={true} alignCenter={true} style={{ padding: '2em' }}>
                  {/* Left Content - Image Collage */}
                  <GridCell>
                    <Grid gutter={true} alignCenter={true}>
                      <GridCell justifyCenter={true}>
                        <ImageTile width={650} height={500} shadow={level1} image={`${ APP_URL }/images/how_it_works_3.jpeg`}/>
                      </GridCell>
                    </Grid>
                  </GridCell>

                  <GridCell style={{textAlign: 'center' }}>
                      <H3 font="secondary" style={{ marginBottom: '1em' }}>My Wallet</H3>
                        {/*<H4 style={{ marginBottom: '0.5em' }}>{props.user.details.name}</H4>*/}
                        <H4 style={{ marginBottom: '3em' }}>Income:   320</H4>
                        {/*<p style={{ color: grey2, marginBottom: '2em' }}>{props.user.details.email}</p>*/}
                        <p style={{ color: grey2, marginBottom: '2em' }}>Income increased in the last week:  30%</p>

                        {/*<Link to={doctorsRoutes.dashboard.path}>*/}
                        <Button theme="primary" style={{marginRight : '0.5em'}}>Withdraw</Button>
                        {/*</Link>*/}

                        {/*<Link to={home.home.path}>*/}
                        <Button type="button" theme="secondary" >Share</Button>
                        {/*</Link>*/}
                  </GridCell>
              </Grid>
          </div>
      </div>
)

// Component Properties
Wallet.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

// Component State
function walletState(state) {
  return {
    user: state.user
  }
}

export default connect(walletState, { logout })(Wallet)
