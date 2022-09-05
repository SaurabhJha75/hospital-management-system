import React, { Component } from 'react';
import './Appointment.css';
import { Table, Tag, Space } from 'antd';

class Appointment extends Component {
    
    render() {
        const appointmentChoices = [];  
        const columns = [
          
          {
            title: 'AppointmentId',
            dataIndex: 'id',
            key: 'id',
          },{
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: 'Gender',
              dataIndex: 'gender',
              key: 'gender',
            },
            {
              title: 'Department',
              dataIndex: 'department',
              key: 'department',
            },
            {
              title: 'Address',
              dataIndex: 'address',
              key: 'address',
            },
            {
              title: 'Email',
              dataIndex: 'email',
              key: 'email',
            },
            {
              title: 'Phone',
              dataIndex: 'phone',
              key: 'phone',
            },
            {
              title: 'Fee',
              dataIndex: 'fee',
              key: 'fee',
            },
          ];

        return (
            <Table columns={columns} dataSource={this.props.appointment} />
        );
    }
}

export default Appointment;