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

import {
    createOrUpdate as crateCreateOrUpdate,
    getById as getCrateById
} from '../../crate/api/actions'
import { messageShow, messageHide } from '../../common/api/actions'
import DoctorMenu from '../common/Menu'

// Component
class EditPrescription extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            quantity: '',
            unitType: '',
            dosage: '',
            duration: '',
            currentPrescription: '',
            associatedMedicalRecord: '',
            isPosted: false
        }
    }
    
    componentDidMount() {
        console.log(this.props)
    
        fetch(`/doctor/api/org.healthcare.Prescription/${this.props.match.params.id}`)
            .then(response => response.json())
            .then(responseData => {
                this.setState({
                    currentPrescription: responseData,
                });
                this.updateState();
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
            });
    
    
    }
    
    updateState = async () => {
        await this.setState({
            quantity: this.state.currentPrescription.quantity,
            unitType: this.state.currentPrescription.unitType,
            dosage: this.state.currentPrescription.dosage,
            duration: this.state.currentPrescription.duration,
            associatedMedicalRecord: this.state.currentPrescription.medicalRecord.split("#")[1]
        });
    
        console.log("Qty: " + this.state.quantity);
        console.log("Unit type: " + this.state.unitType);
        console.log("Dosage: " + this.state.dosage);
        console.log("associatedMedicalRecord: " + this.state.associatedMedicalRecord);
    }
   
    handleChange = async (event) => {
    
        await this.setState({
            [event.target.name]: event.target.value
        });
    }
    
    
    onSubmit = (event) => {
        event.preventDefault()
    
        const prescriptionToUpdate = {
            prescription: this.state.currentPrescription.presID,
            quantity : this.state.quantity,
            unitType: this.state.unitType,
            dosage: this.state.dosage,
            duration: this.state.duration,
            lastModified: new Date(),
        }

        this.setState({
            isPosted: true
        })
    
        fetch('/doctor/api/org.healthcare.UpdatePrescription', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(prescriptionToUpdate),
        })
        .catch(error => {
            console.log('Error parsing / posting data', error);
            this.setState({
                isPosted: false
            })
        });

        this.props.messageShow('Updating Prescription, please wait...')

        window.setTimeout(() => {
            this.props.messageHide()

            console.log("Is is posted? " + this.state.isPosted);

            this.state.isPosted ? 
                this.props.messageShow('Medical record updated successfully!') : this.props.messageShow('Error occured, please try again')
            
            window.setTimeout(() => {
            this.props.messageHide()
            }, 3000)
            
            window.history.back();

        }, 1500)
    }


    render() {
        return (
            <div>
                {/* SEO */}
                <Helmet>
                    <title>Prescription / Edit - Doctor</title>
                </Helmet>

                {/* Top menu bar */}
                <DoctorMenu/>

                {/* Page Content */}
                <div>
                    {/* Top actions bar */}
                    <Grid alignCenter={true} style={{ padding: '1em' }}>
                        <GridCell style={{ textAlign: 'left' }}>
                            <Link to={doctorsRoutes.doctorPrescription.path(this.state.associatedMedicalRecord)}>
                                <Button><Icon size={1.2}>arrow_back</Icon> Back</Button>
                            </Link>
                        </GridCell>
                    </Grid>

                    {/* Prescription list */}
                    <Grid alignCenter={true} style={{ padding: '1em' }}>
                        <GridCell>
                            <H4 font="secondary" style={{ marginBottom: '1em', textAlign: 'center' }}>
                                Edit Prescription
                            </H4>
                            {/* Form */}
                            <form onSubmit={this.onSubmit}>
                                <div style={{ width: '25em', margin: '0 auto' }}>
                                {/*}*/}
                                    <h2 style={{ marginTop: '1em', textAlign: 'center' }} fullWidth={true} >
                                        {/* {this.state.currentMedicalRecord.recordID} */}
                                        Prescription
                                    </h2>

                                    Quantity
                                    <Input
                                        type="text"
                                        fullWidth={true}
                                        placeholder="e.g. 60"
                                        required="required"
                                        name="quantity"
                                        autoComplete="off"
                                        value={this.state.quantity}
                                        onChange={this.handleChange}
                                        style={{ marginBottom: '2em' }}
                                    />

                                    Unit Type 
                                    <Input
                                        type="text"
                                        fullWidth={true}
                                        placeholder="TABLET or ML"
                                        name="unitType"
                                        autoComplete="off"
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
                                        autoComplete="off"
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
                                        autoComplete="off"
                                        value={this.state.duration}
                                        onChange={this.handleChange}
                                        style={{ marginBottom: '2em' }}
                                    />

                                </div>

                                {/* Form submit */}
                                <div style={{ marginTop: '2em', textAlign: 'center' }}>
                                    <Button type="submit" theme="secondary" disabled={this.state.isPosted}>
                                        <Icon size={1.2} style={{ color: white }}>check</Icon> Save
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
EditPrescription.propTypes = {
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
})(EditPrescription))
