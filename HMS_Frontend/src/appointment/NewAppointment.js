import React, { Component } from 'react';
import { createAppointment ,checkAppointmentAvailability,getDoctorName,getPatientName} from '../util/APIUtils';
import './NewAppointment.css';  
import { Form, Input, Button, Icon, Select, Col, notification, DatePicker } from 'antd';
import moment from 'moment';
const FormItem = Form.Item;
const children = [];

class NewAppointment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patientId: {
                text: ''
            },
            patientName: {
                text:''
            },
            doctorId:{
                text:''
            },
            doctorName:{
                text:''
            },
            symptoms:{
                text:''
            },
            date:{
                text:''
            }
        };
        this.handlePatientIdChange = this.handlePatientIdChange.bind(this);
        this.handlePatientNameChange = this.handlePatientNameChange.bind(this);
        this.handleDoctorIdChange = this.handleDoctorIdChange.bind(this);
        this.handleDoctorNameChange = this.handleDoctorNameChange.bind(this);
        this.handleSymptomsChange = this.handleSymptomsChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
    }


    handleSubmit(event) {
        event.preventDefault();
        const appointmentData = {
            patientId: this.state.patientId.text,
            patientName: this.state.patientName.text,
            doctorId: this.state.doctorId.text,
            doctorName: this.state.doctorName.text,
            symptoms:this.state.symptoms.text,
            appointmentDate:this.state.date.text
        };  

        createAppointment(appointmentData)
        .then(response => {
            notification.success({
                message: 'HMS',
                description: "Appointment successfully registered.",
            });
            this.props.history.push("/appointments");
        }).catch(error => {
            if(error.status === 401) {
                this.props.handleLogout('/login', 'error', 'You have been logged out. Please login create Appointment.');    
            } else {
                notification.error({
                    message: 'Appointment App',
                    description: error.message || 'Sorry! Something went wrong. Please try again!'
                });              
            }
        });
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
        getPatientName(value)
        .then(response => {
            if(!(response.id == null)) {
                this.setState({
                    patientName: {
                        text: response.name,
                        validateStatus: 'success',
                        errorMsg: ''
                    },
                    symptoms: {
                        text: response.symptoms,
                        validateStatus: 'success',
                        errorMsg: ''
                    }
                });
            } else {
                this.setState({
                    patientName: {
                        text: '',
                        validateStatus: 'error',
                        errorMsg: 'Please enter valid patient Id!'
                    }
                });
            }
        }).catch(error => {
            this.setState({
                patientName: {
                    text: '',
                    ...this.validatePatientName(value)
                }
            });
        });
    }

    validatePatientName = (text) => {
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

    handlePatientNameChange(event) {
        const value = event.target.value;
        this.setState({
            patientName: {
                text: value,
                ...this.validatePatientName(value)
            }
        });
    }

    validateDoctorId = (text) => {
        if(text === 0) {
            return {
                validateStatus: 'error',
                errorMsg: 'Please enter DoctorId!'
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }

    handleDoctorIdChange(event) {
        const value = event.target.value;
        this.setState({
            doctorId: {
                text: value,
                ...this.validateDoctorId(value)
            }
        });
        getDoctorName(value)
        .then(response => {
            if(!(response.id == null)) {
                this.setState({
                    doctorName: {
                        text: response.name,
                        validateStatus: 'success',
                        errorMsg: null
                    }
                });
            } else {
                this.setState({
                    doctorName: {
                        text: '',
                        validateStatus: 'error',
                        errorMsg: 'Please enter valid Doctor Id'
                    }
                });
            }
        }).catch(error => {
            this.setState({
                doctorName: {
                    text: '',
                    validateStatus: 'success',
                    errorMsg: null
                }
            });
        });
    }

    
    validateDoctorName = (text) => {
        if(text === 0) {
            return {
                validateStatus: 'error',
                errorMsg: 'Please enter DoctorId!'
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }

    handleDoctorNameChange(event) {
        const value = event.target.value;
        this.setState({
            doctorName: {
                text: value,
                ...this.validateDoctorName(value)
            }
        });
    }


    validateSymptoms = (text) => {
        if(text.length === 0) {
            return {
                validateStatus: 'error',
                errorMsg: 'Please enter Symptoms!'
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }

    handleSymptomsChange(event) {
        const value = event.target.value;
        this.setState({
            symptoms: {
                text: value,
                ...this.validateSymptoms(value)
            }
        });
        console.log(this.state);
    }

    validateDate = (text) => {
        if(text.length === 0) {
            return {
                validateStatus: 'error',
                errorMsg: 'Please enter Date!'
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }

    handleDateChange(event,dateString) {
        console.log(dateString);
      //  const value = event.target.value;
        this.setState({
            date: {
                text: dateString,
                ...this.validateDate(dateString)
            }
        });

        const dateValue = this.state.date.text;
        const doctorValue = this.state.doctorId.text;
        console.log(this.state);
        checkAppointmentAvailability(dateString,doctorValue)
        .then(response => {
            if(response.available) {
                this.setState({
                    date: {
                        text: dateString,
                        validateStatus: 'success',
                        errorMsg: null
                    }
                });
            } else {
                this.setState({
                    date: {
                        text: '',
                        validateStatus: 'error',
                        errorMsg: 'Doctor is not available for this date'
                    }
                });
            }
        }).catch(error => {
            this.setState({
                date: {
                    text: '',
                    validateStatus: 'success',
                    errorMsg: null
                }
            });
        });
    }

    isFormInvalid() {
        if(this.state.patientId.validateStatus !== 'success') {
            return true;
        }
        if(this.state.doctorId.validateStatus !== 'success') {
            return true;
        }
        if(this.state.symptoms.validateStatus !== 'success') {
            return true;
        }
        if(this.state.date.validateStatus !== 'success') {
            return true;
        }
    }

    handleChange(value){
        console.log(`Selected: ${value}`);
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
            <div className="new-appointment-container">
                <h1 className="page-title">Create Appointment</h1>
                <div className="new-appointment-content">
                    <Form {...layout} onSubmit={this.handleSubmit} className="create-appointment-form">
                        <FormItem validateStatus={this.state.patientId.validateStatus}  label="Patient Id"
                            help={this.state.patientId.errorMsg} className="appointment-form-row">
                        <Input style = {{ fontSize: '16px' }} name="name" placeholder="Patient Id"   
                                value = {this.state.patientId.text}
                                onChange = {this.handlePatientIdChange} />
                        </FormItem>
                        <FormItem validateStatus={this.state.patientName.validateStatus}  label="Patient Name"
                            help={this.state.patientName.errorMsg} className="appointment-form-row">
                               <Input style = {{ fontSize: '16px' }} name="name" placeholder="Patient Name"   
                                value = {this.state.patientName.text} disabled
                                onChange = {this.handlePatientNameChange} />
                        </FormItem>
                        <FormItem validateStatus={this.state.doctorId.validateStatus}  label="Doctor Id"
                            help={this.state.doctorId.errorMsg} className="appointment-form-row">
                               <Input style = {{ fontSize: '16px' }} name="doctorId" placeholder="Doctor Id"   
                                value = {this.state.doctorId.text}
                                onChange = {this.handleDoctorIdChange} />
                        </FormItem>
                        <FormItem validateStatus={this.state.doctorName.validateStatus}  label="Doctor Name"
                            help={this.state.doctorName.errorMsg} className="appointment-form-row">
                               <Input style = {{ fontSize: '16px' }} name="doctorName" placeholder="Doctor Name"   
                                value = {this.state.doctorName.text} disabled
                                onChange = {this.handleDoctorNameChange} />
                        </FormItem>
                        <FormItem validateStatus={this.state.symptoms.validateStatus} label="Symptoms"
                            help={this.state.symptoms.errorMsg} className="patient-form-row">
                               <Input style = {{ fontSize: '16px' }} name="symptoms" placeholder="Symptoms"   
                                value = {this.state.symptoms.text}
                                onChange = {this.handleSymptomsChange} />
                        </FormItem>
                        
                        <FormItem validateStatus={this.state.date.validateStatus} label="Appointment Date"
                            help={this.state.date.errorMsg} className="patient-form-row">
                               
                                <DatePicker defaultValue={moment('2022-01-15', 'YYYY-MM-DD')} name="date" onChange={this.handleDateChange} />
                                <Input style = {{ fontSize: '16px',display:'none' }} name="dateString" disabled   
                                value = {this.state.date.text} />
                        </FormItem>
                        <FormItem {...tailLayout}  className="appointment-form-row">
                            <Button type="primary" 
                                htmlType="submit" 
                                size="large" 
                                disabled={this.isFormInvalid()}
                                className="create-appointment-form-button">Create Appointment</Button>
                        </FormItem>
                    </Form>
                </div>    
            </div>
        );
    }
}

export default NewAppointment;