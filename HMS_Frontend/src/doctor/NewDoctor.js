import React, { Component } from 'react';
import { createDoctor } from '../util/APIUtils';
import './NewDoctor.css';  
import { Form, Input, Button, Icon, Select, Col, notification } from 'antd';
const FormItem = Form.Item;

class NewDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                text: ''
            },
            fee: {
                number:0
            },
            gender:{
                text:''
            },
            department:{
                text:''
            },
            address:{
                text:''
            },
            email:{
                text:''
            },
            phone:{
                text:''
            }
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleFeeChange = this.handleFeeChange.bind(this);
        this.handleGenderChange = this.handleGenderChange.bind(this);
        this.handleDepartmentChange = this.handleDepartmentChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const doctorData = {
            name: this.state.name.text,
            fee: this.state.fee.number,
            gender: this.state.gender.text,
            department:this.state.department.text,
            address:this.state.address.text,
            email:this.state.email.text,
            phone:this.state.phone.text
        };  

        createDoctor(doctorData)
        .then(response => {
            notification.success({
                message: 'HMS',
                description: "Doctor successfully registered.",
            });
            this.props.history.push("/doctors");
        }).catch(error => {
            if(error.status === 401) {
                this.props.handleLogout('/login', 'error', 'You have been logged out. Please login create Doctor.');    
            } else {
                notification.error({
                    message: 'Doctor App',
                    description: error.message || 'Sorry! Something went wrong. Please try again!'
                });              
            }
        });
    }

    validateName = (nameText) => {
        if(nameText.length === 0) {
            return {
                validateStatus: 'error',
                errorMsg: 'Please enter your name!'
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }

    handleNameChange(event) {
        const value = event.target.value;
        this.setState({
            name: {
                text: value,
                ...this.validateName(value)
            }
        });
    }

    validateFee = (feeText) => {
        if(feeText === 0) {
            return {
                validateStatus: 'error',
                errorMsg: 'Please enter Fee!'
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }

    handleFeeChange(event) {
        const value = event.target.value;
        this.setState({
            fee: {
                number: value,
                ...this.validateFee(value)
            }
        });
    }

    
    validateGender = (genderText) => {
        if(genderText.length === 0) {
            return {
                validateStatus: 'error',
                errorMsg: 'Please enter your Gender!'
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }

    handleGenderChange(event) {
        const value = event.target.value;
        this.setState({
            gender: {
                text: value,
                ...this.validateGender(value)
            }
        });
    }

    
    validateDepartment = (text) => {
        if(text.length === 0) {
            return {
                validateStatus: 'error',
                errorMsg: 'Please enter Department!'
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }

    handleDepartmentChange(event) {
        const value = event.target.value;
        this.setState({
            department: {
                text: value,
                ...this.validateDepartment(value)
            }
        });
    }


    validateAddress = (text) => {
        if(text.length === 0) {
            return {
                validateStatus: 'error',
                errorMsg: 'Please enter Address!'
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }

    handleAddressChange(event) {
        const value = event.target.value;
        this.setState({
            address: {
                text: value,
                ...this.validateAddress(value)
            }
        });
    }

    validateEmail = (text) => {
        if(text.length === 0) {
            return {
                validateStatus: 'error',
                errorMsg: 'Please enter Email!'
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }

    handleEmailChange(event) {
        const value = event.target.value;
        this.setState({
            email: {
                text: value,
                ...this.validateEmail(value)
            }
        });
    }

    validatePhone = (text) => {
        if(text.length === 0) {
            return {
                validateStatus: 'error',
                errorMsg: 'Please enter Phone!'
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }

    handlePhoneChange(event) {
        const value = event.target.value;
        this.setState({
            phone: {
                text: value,
                ...this.validatePhone(value)
            }
        });
    }

    isFormInvalid() {
        if(this.state.name.validateStatus !== 'success') {
            return true;
        }
        if(this.state.fee.validateStatus !== 'success') {
            return true;
        } 
        if(this.state.gender.validateStatus !== 'success') {
            return true;
        }
        if(this.state.department.validateStatus !== 'success') {
            return true;
        }
        if(this.state.address.validateStatus !== 'success') {
            return true;
        }
        if(this.state.email.validateStatus !== 'success') {
            return true;
        }
        if(this.state.phone.validateStatus !== 'success') {
            return true;
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
            <div className="new-doctor-container">
                <h1 className="page-title">Create Doctor</h1>
                <div className="new-doctor-content">
                    <Form {...layout} onSubmit={this.handleSubmit} className="create-doctor-form">
                        <FormItem validateStatus={this.state.name.validateStatus}  label="Name"
                            help={this.state.name.errorMsg} className="doctor-form-row">
                               <Input style = {{ fontSize: '16px' }} name="name" placeholder="Name"   
                                value = {this.state.name.text}
                                onChange = {this.handleNameChange} />
                        </FormItem>
                        <FormItem validateStatus={this.state.gender.validateStatus}  label="Gender"
                            help={this.state.gender.errorMsg} className="doctor-form-row">
                               <Input style = {{ fontSize: '16px' }} name="name" placeholder="Gender"   
                                value = {this.state.gender.text}
                                onChange = {this.handleGenderChange} />
                        </FormItem>
                        <FormItem validateStatus={this.state.fee.validateStatus}  label="Fee"
                            help={this.state.fee.errorMsg} className="doctor-form-row">
                               <Input style = {{ fontSize: '16px' }} name="name" placeholder="Fee"   
                                value = {this.state.fee.number}
                                onChange = {this.handleFeeChange} />
                        </FormItem>
                        <FormItem validateStatus={this.state.department.validateStatus} label="Department"
                            help={this.state.department.errorMsg} className="patient-form-row">
                               <Input style = {{ fontSize: '16px' }} name="name" placeholder="Department"   
                                value = {this.state.department.text}
                                onChange = {this.handleDepartmentChange} />
                        </FormItem>
                        <FormItem validateStatus={this.state.address.validateStatus} label="Address"
                            help={this.state.address.errorMsg} className="patient-form-row">
                               <Input style = {{ fontSize: '16px' }} name="name" placeholder="Address"   
                                value = {this.state.address.text}
                                onChange = {this.handleAddressChange} />
                        </FormItem>
                        <FormItem validateStatus={this.state.email.validateStatus} label="Email"
                            help={this.state.email.errorMsg} className="patient-form-row">
                               <Input style = {{ fontSize: '16px' }} name="name" placeholder="Email"   
                                value = {this.state.email.text}
                                onChange = {this.handleEmailChange} />
                        </FormItem>
                        <FormItem validateStatus={this.state.phone.validateStatus} label="Phone Number"
                            help={this.state.phone.errorMsg} className="patient-form-row">
                               <Input style = {{ fontSize: '16px' }} name="name" placeholder="Phone Number"   
                                value = {this.state.phone.text}
                                onChange = {this.handlePhoneChange} />
                        </FormItem>
                        <FormItem {...tailLayout}  className="doctor-form-row">
                            <Button type="primary" 
                                htmlType="submit" 
                                size="large" 
                                disabled={this.isFormInvalid()}
                                className="create-doctor-form-button">Create Doctor</Button>
                        </FormItem>
                    </Form>
                </div>    
            </div>
        );
    }
}

export default NewDoctor;