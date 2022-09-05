import React, { Component } from 'react';
import { getAppointmentDetails } from '../util/APIUtils';
import Appointment from './Appointment';
import { withRouter } from 'react-router-dom';
import './AppointmentList.css';
import { Button, Form, Input } from 'antd';
import FormItem from 'antd/lib/form/FormItem';

class AppointmentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patientId: {
                text: ''
            },
            appointment: {}
        };
        this.handlePatientIdChange = this.handlePatientIdChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validatePatientId = (text) => {
        if(text.length === 0) {
            return {
                validateStatus: 'error',
                errorMsg: 'Please enter patient Id!'
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }

    handlePatientIdChange(event) {
        const value = event.target.value;
        this.setState({
            patientId: {
                text: value,
                ...this.validatePatientId(value)
            }
        });
        
    }

    
    handleSubmit(event) {
        event.preventDefault(); 
        console.log(this.state);
        const patientId = this.state.patientId.text;
        getAppointmentDetails(patientId)
        .then(response => {
            if(!(response.id == null)) {
                this.setState({
                    appointment: response
                });
            } else {
                this.setState({
                    patientId: {
                        text: '',
                        validateStatus: 'error',
                        errorMsg: 'No Appointments found for the patientId'
                    }
                });
            }
        }).catch(error => {
            this.setState({
                patientId: {
                    text: '',
                    ...this.validatePatientId(patientId)
                }
            });
        });
        
    }

    
    isFormInvalid() {
        if(this.state.patientId.validateStatus !== 'success') {
            return true;
        }
    }

    componentDidUpdate(nextProps) {
        if(this.props.isAuthenticated !== nextProps.isAuthenticated) {
            // Reset State
            this.setState({
                appointments: [],
                isLoading: false
            });    
            this.loadAppointmentList();
        }
    }


    render() {
        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
          };
          const tailLayout = {
            wrapperCol: { offset: 8, span: 16 },
          };

        return (
            <div className="appointments-container">
                <h3>View Patient Appointment Details</h3>
                <div className="new-appointment-content">
                    <Form {...layout} onSubmit={this.handleSubmit} className="create-appointment-form">
                        <FormItem validateStatus={this.state.patientId.validateStatus}  label="Patient Id"
                            help={this.state.patientId.errorMsg} className="appointment-form-row">
                        <Input style = {{ fontSize: '16px' }} name="name" placeholder="Patient Id"   
                                value = {this.state.patientId.text}
                                onChange = {this.handlePatientIdChange} />
                        </FormItem>
                        
                        <FormItem {...tailLayout}  className="appointment-form-row">
                            <Button type="primary" 
                                htmlType="submit" 
                                size="large" 
                                disabled={this.isFormInvalid()}
                                className="create-appointment-form-button">View Appointment Details</Button>
                        </FormItem>
                    </Form>
                </div> 
                <div className="new-appointment-container">
                    <Form {...layout} className="create-appointment-form">
                    <FormItem  label="Patient Id" className="appointment-form-row">
                        <Input style = {{ fontSize: '16px',color:'#000' }} name="name" 
                                value = {this.state.appointment.patientId} disabled />
                        </FormItem>
                        <FormItem label="Patient Name" className="appointment-form-row">
                               <Input style = {{ fontSize: '16px',color:'#000' }} name="name"  
                                value = {this.state.appointment.patientName} disabled />
                        </FormItem>
                        <FormItem label="Doctor Id" className="appointment-form-row">
                               <Input style = {{ fontSize: '16px',color:'#000' }} name="doctorId"  
                                value = {this.state.appointment.doctorId} disabled/>
                        </FormItem>
                        <FormItem label="Doctor Name" className="appointment-form-row">
                               <Input style = {{ fontSize: '16px',color:'#000' }} name="doctorName"  
                                value = {this.state.appointment.doctorName} disabled />
                        </FormItem>
                        <FormItem label="Symptoms" className="patient-form-row">
                               <Input style = {{ fontSize: '16px',color:'#000' }} name="symptoms"   
                                value = {this.state.appointment.symptoms} disabled />
                        </FormItem>
                        
                        <FormItem label="Appointment Date" className="patient-form-row">
                                <Input style = {{ fontSize: '16px',color:'#000' }} name="date" disabled   
                                value = {this.state.appointment.appointmentDate} />
                        </FormItem>
                    </Form>
                </div>   
            </div>
        );
    }
}

export default withRouter(AppointmentList);