import React, { Component } from 'react';
import { createPatient } from '../util/APIUtils';
import './NewPatient.css';  
import { Form, Input, Button, notification } from 'antd';
const FormItem = Form.Item;

class NewPatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                text: ''
            },
            age: {
                number:0
            },
            gender:{
                text:''
            },
            symptoms:{
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
        this.handleAgeChange = this.handleAgeChange.bind(this);
        this.handleGenderChange = this.handleGenderChange.bind(this);
        this.handleSymptomsChange = this.handleSymptomsChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const patientData = {
            name: this.state.name.text,
            age: this.state.age.number,
            gender: this.state.gender.text,
            symptoms:this.state.symptoms.text,
            address:this.state.address.text,
            email:this.state.email.text,
            phone:this.state.phone.text
        };
        createPatient(patientData)
        .then(response => {
            notification.success({
                message: 'HMS',
                description: "Patient successfully registered.",
            });
            this.props.history.push("/patients");
        }).catch(error => {
            if(error.status === 401) {
                this.props.handleLogout('/login', 'error', 'You have been logged out. Please login create patient.');    
            } else {
                notification.error({
                    message: 'Patient App',
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

    validateAge = (ageText) => {
        if(ageText === 0) {
            return {
                validateStatus: 'error',
                errorMsg: 'Please enter your Age!'
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }

    handleAgeChange(event) {
        const value = event.target.value;
        this.setState({
            age: {
                number: value,
                ...this.validateAge(value)
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
        if(this.state.age.validateStatus !== 'success') {
            return true;
        } 
        if(this.state.gender.validateStatus !== 'success') {
            return true;
        }
        if(this.state.symptoms.validateStatus !== 'success') {
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
            <div className="new-patient-container">
                <h1 className="page-title">Create Patient</h1>
                <div className="new-patient-content">
                    <Form {...layout} onSubmit={this.handleSubmit}  labelCol={{span: 8,}}
      wrapperCol={{ span: 16,}} >
                        <FormItem validateStatus={this.state.name.validateStatus} label="Name"
                            help={this.state.name.errorMsg} className="patient-form-row">
                               <Input style = {{ fontSize: '16px' }} name="name" placeholder="Name"   
                                value = {this.state.name.text}
                                onChange = {this.handleNameChange} />
                        </FormItem>
                        <FormItem validateStatus={this.state.gender.validateStatus} label ="Gender"
                            help={this.state.gender.errorMsg} className="patient-form-row">
                               <Input style = {{ fontSize: '16px' }} name="name" placeholder="Gender"   
                                value = {this.state.gender.text}
                                onChange = {this.handleGenderChange} />
                        </FormItem>
                        <FormItem validateStatus={this.state.age.validateStatus} label="Age"
                            help={this.state.age.errorMsg} className="patient-form-row">
                               <Input style = {{ fontSize: '16px' }} name="name" placeholder="Age"   
                                value = {this.state.age.number}
                                onChange = {this.handleAgeChange} />
                        </FormItem>
                        <FormItem validateStatus={this.state.symptoms.validateStatus} label="Symptoms"
                            help={this.state.symptoms.errorMsg} className="patient-form-row">
                               <Input style = {{ fontSize: '16px' }} name="name" placeholder="Symptoms"   
                                value = {this.state.symptoms.text}
                                onChange = {this.handleSymptomsChange} />
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
                        <FormItem {...tailLayout} className="patient-form-row">
                            <Button type="primary" 
                                htmlType="submit" 
                                size="large" 
                                disabled={this.isFormInvalid()}
                                className="create-patient-form-button">Create Patient</Button>
                        </FormItem>
                    </Form>
                </div>    
            </div>
        );
    }
}

export default NewPatient;