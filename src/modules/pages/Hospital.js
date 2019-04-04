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

  // Runs on server only for SSR
  static fetchData({ store }) {
    return store.dispatch(getProductList())
  }

  // Runs on client only
  componentDidMount() {
    this.props.getProductList()
  }

  render() {
    const { isLoading, list } = this.props.products

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

              <p style={{ marginTop: '1em', color: grey2 }}>Watch this space to keep updated with available hospitals!</p>
            </GridCell>
          </Grid>

          {/* Product list */}
          <Grid>
            {
              isLoading
                  ? <Loading/>
                  : list.length > 0
                  ? list.map(transaction_history => (
                      <GridCell key={transaction_history.id} style={{ textAlign: 'center' }}>
                        <ProductItem product={transaction_history}/>
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
                        : list.length > 0
                        ? list.map(transaction_history => (
                            <GridCell key={transaction_history.id} style={{ textAlign: 'center' }}>
                                <ProductItem product={transaction_history}/>
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
