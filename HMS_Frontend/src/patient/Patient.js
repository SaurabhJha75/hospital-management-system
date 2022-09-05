import React, { Component } from 'react';
import './Patient.css';
import { Table, Tag, Space } from 'antd';

class Patient extends Component {
    
    render() {
        const columns = [
            {
                title: 'Patient Id',
                dataIndex: 'id',
                key: 'id',
              },
              {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: 'Age',
              dataIndex: 'age',
              key: 'age',
            },
            {
              title: 'Gender',
              dataIndex: 'gender',
              key: 'gender',
            },
            {
              title: 'Symptoms',
              dataIndex: 'symptoms',
              key: 'symptoms',
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
            }
          ];

        return (
            <Table columns={columns} dataSource={this.props.patient} rowKey="id"/>
        );
    }
}

export default Patient;