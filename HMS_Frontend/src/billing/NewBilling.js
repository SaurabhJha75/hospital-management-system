import React, { Component } from 'react';
import { createBilling ,getDoctorName,getPatientName} from '../util/APIUtils';
import './NewBilling.css';  
import { Form, Input, Button, Icon, Select, Col, notification, DatePicker } from 'antd';
import moment from 'moment';
const FormItem = Form.Item;
const children = [];

class NewBilling extends Component {
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
            prescriptionFee:{
                number:0
            },
            otherFee:{
                number:0
            },
            totalFee:{
                number:0
            }
        };
        this.handlePatientIdChange = this.handlePatientIdChange.bind(this);
        this.handlePatientNameChange = this.handlePatientNameChange.bind(this);
        this.handleDoctorIdChange = this.handleDoctorIdChange.bind(this);
        this.handleDoctorNameChange = this.handleDoctorNameChange.bind(this);
        this.handlePrescriptionFeeChange = this.handlePrescriptionFeeChange.bind(this);
        this.handleOtherFeeChange = this.handleOtherFeeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
        this.calculate= this.calculate.bind(this);
    }


    handleSubmit(event) {
        event.preventDefault();
        const billingData = {
            patientId: this.state.patientId.text,
            patientName: this.state.patientName.text,
            doctorId: this.state.doctorId.text,
            doctorName: this.state.doctorName.text,
            registrationFee:this.state.prescriptionFee.number,
            otherFee:this.state.otherFee.number,
            total:this.state.totalFee.number
        };  

        createBilling(billingData)
        .then(response => {
            notification.success({
                message: 'HMS',
                description: "Billing completed successfully.",
            });
            this.props.history.push("/");
        }).catch(error => {
            if(error.status === 401) {
                this.props.handleLogout('/login', 'error', 'You have been logged out. Please login to create Bill.');    
            } else {
                notification.error({
                    message: 'Billing App',
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
                    },
                    prescriptionFee:{
                        number:response.fee,
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


    validatePrescriptionFee = (text) => {
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

    handlePrescriptionFeeChange(event) {
        const value = event.target.value;
        this.setState({
            prescriptionFee: {
                number: value,
                ...this.validatePrescriptionFee(value)
            }
        });
        console.log(this.state);
    }

    validateOtherFee = (text) => {
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

    handleOtherFeeChange(event) {
        const value = event.target.value;
        this.setState({
            otherFee: {
                number: value,
                ...this.validateOtherFee(value)
            }
        });
        console.log(this.state);
    }

    isFormInvalid() {
        if(this.state.patientId.validateStatus !== 'success') {
            return true;
        }
        if(this.state.doctorId.validateStatus !== 'success') {
            return true;
        }
        if(this.state.prescriptionFee.validateStatus !== 'success') {
            return true;
        }
        if(this.state.otherFee.validateStatus !== 'success') {
            return true;
        }
    }

    calculate(){
        const prescriptionFee = this.state.prescriptionFee.number;
        const otherFee = this.state.otherFee.number;
        console.log(prescriptionFee+otherFee);
        this.setState({
            totalFee: {
                number: Number(prescriptionFee)+Number(otherFee),
            }
        });
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
                <h1 className="page-title">Billing Form</h1>
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
                               <Input style = {{ fontSize: '16px' ,color:'#000',background:'#ddd'}} name="name" placeholder="Patient Name"   
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
                               <Input style = {{ fontSize: '16px' ,color:'#000',background:'#ddd'}} name="doctorName" placeholder="Doctor Name"   
                                value = {this.state.doctorName.text} disabled
                                onChange = {this.handleDoctorNameChange} />
                        </FormItem>
                        <FormItem validateStatus={this.state.prescriptionFee.validateStatus} label="Prescription Fee (In Rs.)"
                            help={this.state.prescriptionFee.errorMsg} className="patient-form-row">
                               <Input style = {{ fontSize: '16px' }} name="symptoms" placeholder="Prescription Fee"   
                                value = {this.state.prescriptionFee.number}
                                onChange = {this.handlePrescriptionFeeChange} />
                        </FormItem>
                        
                        <FormItem validateStatus={this.state.otherFee.validateStatus} label="Other Fee (In Rs.)"
                            help={this.state.otherFee.errorMsg} className="patient-form-row">
                                 <Input style = {{ fontSize: '16px' }} name="symptoms" placeholder="Other Fee"   
                                value = {this.state.otherFee.number}
                                onChange = {this.handleOtherFeeChange} />
                        </FormItem>
                        <FormItem {...tailLayout}  className="appointment-form-row">
                            <Button type="primary" 
                                htmlType="button" 
                                size="small"
                                onClick={this.calculate}
                                className="create-appointment-form-button">Calculate</Button>
                        </FormItem>
                        <FormItem validateStatus={this.state.totalFee.validateStatus} label="Total Fee (In Rs.)"
                            help={this.state.totalFee.errorMsg} className="patient-form-row">
                                 <Input style = {{ fontSize: '16px' ,color:'#000',background:'#ddd'}} name="symptoms"  disabled
                                value = {this.state.totalFee.number} />
                        </FormItem>
                        <FormItem {...tailLayout}  className="appointment-form-row">
                            <Button type="primary" 
                                htmlType="submit" 
                                size="large" 
                                disabled={this.isFormInvalid()}
                                className="create-appointment-form-button">Pay</Button>
                        </FormItem>
                    </Form>
                </div>    
            </div>
        );
    }
}

export default NewBilling;