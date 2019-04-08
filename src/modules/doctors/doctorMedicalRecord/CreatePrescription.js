// Imports
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

// UI Imports
import { Grid, GridCell } from '../../../ui/grid'
import Button from '../../../ui/button'
import Icon from '../../../ui/icon'
import H4 from '../../../ui/typography/H4'
import { Input, Textarea } from '../../../ui/input'
import { white } from "../../../ui/common/colors"

// App Imports
import doctorsRoutes from '../../../setup/routes/doctors'
import { slug } from '../../../setup/helpers'
import {
    createOrUpdate as crateCreateOrUpdate,
    getById as getCrateById
} from '../../crate/api/actions'
import { messageShow, messageHide } from '../../common/api/actions'
import DoctorMenu from '../common/Menu'

// Component
class PrescriptionCreate extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isPosted: false,
            presID: '',
            drugName: '',
            quantity: '',
            unitType: '',
            dosage: '',
            duration: '',
        }

    }

    componentDidMount() {

    }
    
    onSubmit = (event) => {
        event.preventDefault()
    
        const prescriptionToCreate = {
            prescription: {
                presID: this.state.presID,
                drugName: this.state.drugName,
                quantity: this.state.quantity,
                unitType: this.state.unitType,
                dosage: this.state.dosage,
                duration: this.state.duration,
                medicalRecord: this.props.match.params.id,
                lastModified: new Date()
            }
        }

        this.setState({
            isPosted: true
        })

        fetch('/doctor/api/org.healthcare.CreatePrescription', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(prescriptionToCreate)
        })
        .catch(error => {
            console.log('Error parsing / posting data', error);
            this.setState({
                isPosted: false
            })
        });
    
        this.props.messageShow('Saving Prescription, please wait...')

        window.setTimeout(() => {
            this.props.messageHide()

            console.log("Is is posted? " + this.state.isPosted);

            this.state.isPosted ? 
                this.props.messageShow('Prescription created successfully!') : this.props.messageShow('Error occured, please try again')
            
            window.setTimeout(() => {
                    this.props.messageHide()
            }, 3000)
            
            this.props.history.push(doctorsRoutes.doctorPrescription.path(this.props.match.params.id));

        }, 1500)

    }
    
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        let input_list = [];
        return (
            <div>
                {/* SEO */}
                <Helmet>
                    <title>Prescription / Create - Doctor</title>
                </Helmet>

                {/* Top menu bar */}
                <DoctorMenu/>

                {/* Page Content */}
                <div>
                    {/* Top actions bar */}
                    <Grid alignCenter={true} style={{ padding: '1em' }}>
                        <GridCell style={{ textAlign: 'left' }}>
                            <Link to={doctorsRoutes.doctorPrescription.path(this.props.match.params.id)}>
                                <Button><Icon size={1.2}>arrow_back</Icon> Back</Button>
                            </Link>
                        </GridCell>
                    </Grid>

                    {/* Crate list */}
                    <Grid alignCenter={true} style={{ padding: '1em' }}>
                        <GridCell>
                            <H4 font="secondary" style={{ marginBottom: '1em', textAlign: 'center' }}>
                                Create Prescription
                            </H4>

                            {/* Form */}
                            <form onSubmit={this.onSubmit}>
                                <div style={{ width: '25em', margin: '0 auto' }}>
                                    
                                    Prescription ID
                                    <Input
                                        type="text"
                                        fullWidth={true}
                                        placeholder="e.g. pres32"
                                        required="required"
                                        name="presID"
                                        autoComplete="off"
                                        value={this.state.presID}
                                        onChange={this.handleChange}
                                        style={{ marginBottom: '2em' }}                                    
                                    />

                                    Drug Name
                                    <Input
                                        type="text"
                                        fullWidth={true}
                                        placeholder="e.g. Panadol"
                                        required="required"
                                        name="drugName"
                                        autoComplete="off"
                                        value={this.state.drugName}
                                        onChange={this.handleChange}
                                        style={{ marginBottom: '2em' }}
                                    />
                                    
                                    Quantity
                                    <Input
                                        type="text"
                                        fullWidth={true}
                                        placeholder="e.g. 10"
                                        required="required"
                                        name="quantity"
                                        value={this.state.quantity}
                                        onChange={this.handleChange}
                                        style={{ marginBottom: '2em' }}
                                    />

                                    Unit Type
                                    <Input
                                        type="text"
                                        fullWidth={true}
                                        placeholder="TABLET / ML"
                                        required="required"
                                        name="unitType"
                                        value={this.state.unitType}
                                        onChange={this.handleChange}
                                        style={{ marginBottom: '2em' }}
                                    />

                                    Dosage
                                    <Input
                                        type="text"
                                        fullWidth={true}
                                        placeholder="e.g. 3 times a day"
                                        name="dosage"
                                        value={this.state.dosage}
                                        onChange={this.handleChange}
                                        style={{ marginBottom: '2em' }}
                                    />

                                    Duration
                                    <Input
                                        type="text"
                                        fullWidth={true}
                                        placeholder="e.g. 2 weeks"
                                        name="duration"
                                        value={this.state.duration}
                                        onChange={this.handleChange}
                                        style={{ marginBottom: '2em' }}
                                    />
                                </div>

                                {/* Form submit */}
                                <div style={{ marginTop: '2em', textAlign: 'center' }}>
                                    <Button type="submit" theme="secondary" disabled={this.state.isPosted}>
                                        <Icon size={1.2} style={{ color: white }}>check</Icon> Create
                                    </Button>
                                </div>
                            </form>
                        </GridCell>
                    </Grid>
                </div>
            </div>
        )
    }
}

// Component Properties
PrescriptionCreate.propTypes = {
    crateCreateOrUpdate: PropTypes.func.isRequired,
    getCrateById: PropTypes.func.isRequired,
    messageShow: PropTypes.func.isRequired,
    messageHide: PropTypes.func.isRequired
}

export default withRouter(connect(null, {
    crateCreateOrUpdate,
    getCrateById,
    messageShow,
    messageHide
})(PrescriptionCreate))
