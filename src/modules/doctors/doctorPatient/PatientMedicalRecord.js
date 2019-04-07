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
import Edit from './EditRecord'

// Component
class PatientRecordList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            medicalRecords: [],
            doctor: "",
            // doctorNRIC: localStorage.getItem('user') //I need to comment this line, or I can't test mock data
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
        return store.dispatch(getCrateList('DESC'))
    }

    // Runs on client only
    componentDidMount() {
        this.props.getCrateList('DESC');
        fetch("/doctor/api/org.healthcare.MedicalRecord")
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
        const { medicalRecords } = this.state

        return (
            <div>
                {/* SEO */}
                <Helmet>
                    <title>Records - Doctor</title>
                </Helmet>

                {/* Top menu bar */}
                <DoctorMenu/>

                {/* Page Content */}
                <div>
                    {/* Top actions bar */}
                    <Grid alignCenter={true} style={{ padding: '1em' }}>
                        <GridCell style={{ textAlign: 'right' }}>
                            <Link to={doctorsRoute.recordCreate.path}>
                                <Button theme="secondary" style={{ marginTop: '1em' }}>
                                    <Icon size={1.2} style={{ color: white }}>add</Icon> Add
                                </Button>
                            </Link>
                        </GridCell>
                    </Grid>

                    {/* Crate list */}
                    <Grid alignCenter={true} style={{ padding: '1em' }}>
                        <GridCell>
                            <table className="striped">
                                <thead>
                                <tr>
                                    <th style={{ textAlign: 'center' }}>RecordID</th>
                                    <th style={{ textAlign: 'center' }}>PatientName</th>
                                    <th style={{ textAlign: 'center' }}>WardInfo</th>
                                    <th style={{ textAlign: 'center' }}>Date</th>
                                    <th style={{ textAlign: 'center' }}>Diagnosis</th>
                                    <th style={{ textAlign: 'center' }}>LastModified</th>
                                    <th style={{ textAlign: 'center' }}>Actions</th>
                                </tr>
                                </thead>

                                <tbody>
                                {/*mock data for testing*/}
                                <tr>
                                    <td style={{ textAlign: 'center' }}>A002</td>
                                    <td style={{ textAlign: 'center' }}>Thomas Tan</td>
                                    <td style={{ textAlign: 'center' }}>305</td>
                                    <td style={{ textAlign: 'center' }}>30/04/2017</td>
                                    <td style={{ textAlign: 'center' }}>BAD things</td>
                                    <td style={{ textAlign: 'center' }}>30/04/2017</td>
                                    <td style={{ textAlign: 'center' }}>
                                        {/*see prescriptions*/}
                                        <Link to={doctorsRoute.doctorPrescription.path}>
                                            <Button theme="primary" style={{ marginRight: '1em' }}>See Prescription</Button>
                                        </Link>

                                        {/*edit records*/}
                                        {/*<Link to={doctorsRoute.recordEdit.path(medicalRecord.recordID)}>*/}
                                        <Icon size={2} style={{ color: black }}>edit</Icon>
                                        {/*</Link>*/}
                                    </td>
                                </tr>

                                {/* Get data from backend */}
                                {
                                    isLoading
                                        ? <tr>
                                            <td colSpan="6">
                                                <Loading message="loading records..."/>
                                            </td>
                                        </tr>
                                        : medicalRecords.length > 0
                                        ? medicalRecords.map((medicalRecord) => (
                                            <tr key={medicalRecord.recordID}>
                                                <td>
                                                    { medicalRecord.recordID }
                                                </td>

                                                <td>
                                                    { medicalRecord.patient }
                                                </td>

                                                <td>
                                                    { medicalRecord.wardInfo.level }-
                                                    { medicalRecord.wardInfo.roomNum }-
                                                    { medicalRecord.wardInfo.bedNum }
                                                </td>

                                                <td>
                                                    { medicalRecord.date }
                                                </td>

                                                <td>
                                                    { medicalRecord.diagnosis }
                                                </td>

                                                <td>
                                                    { medicalRecord.lastModified }
                                                </td>

                                                <td style={{ textAlign: 'center' }}>

                                                    <Link to={doctorsRoute.recordEdit.path(medicalRecord.recordID)}>
                                                        <Icon size={2} style={{ color: black }} value={medicalRecord.recordID}>edit</Icon>
                                                    </Link>

                                                    {/* <span style={{ cursor: 'pointer' }} onClick={this.remove.bind(this, id)}>
                                <Icon size={2} style={{ marginLeft: '0.5em' }}>delete</Icon>
                              </span> */}
                                                </td>
                                            </tr>
                                        ))
                                        : <tr>
                                            <td colSpan="6">
                                                <EmptyMessage message="No medical records to show."/>
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
PatientRecordList.propTypes = {
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

export default connect(listState, { getCrateList, removeCrate, messageShow, messageHide })(PatientRecordList)
