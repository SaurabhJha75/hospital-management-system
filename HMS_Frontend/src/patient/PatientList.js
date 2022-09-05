import React, { Component } from 'react';
import { getAllPatients } from '../util/APIUtils';
import Patient from './Patient';
import { withRouter } from 'react-router-dom';
import './PatientList.css';

class PatientList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patients: []
        };
        this.loadPatientList = this.loadPatientList.bind(this);
    }

    loadPatientList() {
        let promise;

        promise = getAllPatients();

        if(!promise) {
            return;
        }

        this.setState({
            isLoading: true
        });

        promise            
        .then(response => {
            console.log(response);
            const patients = this.state.patients.slice();

            this.setState({
                patients: patients.concat(response),
                isLoading: false
            })
        }).catch(error => {
            this.setState({
                isLoading: false
            })
        });  
        
    }

    componentDidMount() {
        this.loadPatientList();
    }

    componentDidUpdate(nextProps) {
        if(this.props.isAuthenticated !== nextProps.isAuthenticated) {
            // Reset State
            this.setState({
                patients: [],
                isLoading: false
            });    
            this.loadPatientList();
        }
    }



    render() {
        return (
            <div className="patients-container">
                <h3>Patient List</h3>
                <Patient patient={this.state.patients} />
                {
                    !this.state.isLoading && this.state.patients.length === 0 ? (
                        <div className="no-patients-found">
                            <span>No Patients Found.</span>
                        </div>    
                    ): null
                }              
                
            </div>
        );
    }
}

export default withRouter(PatientList);