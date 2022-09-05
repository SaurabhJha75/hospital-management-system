import React, { Component } from 'react';
import { getAllDoctors } from '../util/APIUtils';
import Doctor from './Doctor';
import { withRouter } from 'react-router-dom';
import './DoctorList.css';

class DoctorList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctors: []
        };
        this.loadDoctorList = this.loadDoctorList.bind(this);
    }

    loadDoctorList() {
        let promise;
        promise = getAllDoctors();
        if(!promise) {
            return;
        }
        this.setState({
            isLoading: true
        });
        promise            
        .then(response => {
            console.log(response);
            const doctors = this.state.doctors.slice();
            this.setState({
                doctors: doctors.concat(response),
                isLoading: false
            })
        }).catch(error => {
            this.setState({
                isLoading: false
            })
        });  
        
    }

    componentDidMount() {
        this.loadDoctorList();
    }

    componentDidUpdate(nextProps) {
        if(this.props.isAuthenticated !== nextProps.isAuthenticated) {
            // Reset State
            this.setState({
                doctors: [],
                isLoading: false
            });    
            this.loadDoctorList();
        }
    }


    render() {
        return (
            <div className="doctors-container">
                <h3>Doctor List</h3>
                <Doctor doctor={this.state.doctors} />
                {
                    !this.state.isLoading && this.state.doctors.length === 0 ? (
                        <div className="no-doctors-found">
                            <span>No Doctors Found.</span>
                        </div>    
                    ): null
                }              
                
            </div>
        );
    }
}

export default withRouter(DoctorList);