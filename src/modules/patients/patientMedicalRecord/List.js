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

  // Runs on server only for SSR
  static fetchData({ store }) {
    return store.dispatch(getCrateList('DESC'))
  }

  // Runs on client only
  componentDidMount() {
    this.props.getCrateList('DESC')
  }

  remove = (id) => {
    if (id > 0) {
      let check = confirm('Are you sure you want to delete this Medical Record?')

      if (check) {
        this.props.messageShow('Deleting, please wait...')

        this.props.removeCrate({ id })
          .then(response => {
            if (response.status === 200) {
              if (response.data.errors && response.data.errors.length > 0) {
                this.props.messageShow(response.data.errors[0].message)
              } else {
                this.props.messageShow('Record deleted successfully.')

                this.props.getCrateList(false)
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
    const { isLoading, list } = this.props.crates

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
                <tr>
                  <td style={{ textAlign: 'center' }}>GX04001 </td>
                  <td style={{ textAlign: 'center' }}>2018/09/12 </td>
                  <td style={{ textAlign: 'center' }}>Bruce Lee</td>
                  <td style={{ textAlign: 'center' }}>National University Hospital</td>
                  <td style={{ textAlign: 'center' }}>Bad Cold with peritonsillr bscess.</td>
                  <td style={{ textAlign: 'center' }}>2018/09/12</td>
                  <td style={{ textAlign: 'center' }}>

                    {/*<Link to={}>*/}
                    <Button type="button" theme="secondary" style={{marginRight : '0.5em'}}>Pay the doctor</Button>
                    {/*</Link>*/}

                  </td>
                </tr>

                {/* Get data from backend */}
                {
                  isLoading
                    ? <tr>
                        <td colSpan="6">
                          <Loading message="loading crates..."/>
                        </td>
                      </tr>
                    : list.length > 0
                      ? list.map(({ id, name, description, createdAt, updatedAt }) => (
                          <tr key={id}>
                            <td>
                              { name }
                            </td>

                            <td>
                              { description }
                            </td>

                            <td>
                              { new Date(parseInt(createdAt)).toDateString() }
                            </td>

                            <td>
                              { new Date(parseInt(updatedAt)).toDateString() }
                            </td>

                            <td style={{ textAlign: 'center' }}>
                              <Link to={doctorsRoute.crateEdit.path(id)}>
                                <Icon size={2} style={{ color: black }}>edit</Icon>
                              </Link>

                              <span style={{ cursor: 'pointer' }} onClick={this.remove.bind(this, id)}>
                                <Icon size={2} style={{ marginLeft: '0.5em' }}>delete</Icon>
                              </span>
                            </td>
                          </tr>
                        ))
                      : <tr>
                          <td colSpan="6">
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
