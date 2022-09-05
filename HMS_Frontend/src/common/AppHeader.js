import React, { Component } from 'react';
import {
    Link,
    withRouter
} from 'react-router-dom';
import './AppHeader.css';
import { Layout, Menu, Dropdown, Icon } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
const Header = Layout.Header;
    
class AppHeader extends Component {
    constructor(props) {
        super(props);   
        this.handleMenuClick = this.handleMenuClick.bind(this);   
    }

    handleMenuClick({ key }) {
      if(key === "logout") {
        this.props.onLogout();
      }
    }

    render() {
        let menuItems,menuItemsa;
        if(this.props.currentUser) {
          menuItems = [
                    
                    
                    <Menu.Item key="patient" className="billing-menu">
                    <PatientDropdownMenu 
                      currentUser={this.props.currentUser} 
                      handleMenuClick={this.handleMenuClick}/>
                  </Menu.Item>,
                  <Menu.Item key="doctor" className="billing-menu">
                  <DoctorDropdownMenu 
                    currentUser={this.props.currentUser} 
                    handleMenuClick={this.handleMenuClick}/>
                </Menu.Item>,
                    <Menu.Item key="appointment" className="billing-menu">
                      <AppointmentDropdownMenu 
                        currentUser={this.props.currentUser} 
                        handleMenuClick={this.handleMenuClick}/>
                    </Menu.Item>,
                    <Menu.Item key="billing" className="billing-menu">
                      <BillingDropdownMenu 
                        currentUser={this.props.currentUser} 
                        handleMenuClick={this.handleMenuClick}/>
                    </Menu.Item>,
                    <Menu.Item key="/profile" className="profile-menu">
                        <LogoutDropdownMenu 
                          currentUser={this.props.currentUser} 
                          handleMenuClick={this.handleMenuClick}/>
                    </Menu.Item>
          ]; 
        } else {
          menuItems = [
            <Menu.Item key="/login">
              <Link to="/login">Login</Link>
            </Menu.Item>,
            <Menu.Item key="/signup">
              <Link to="/signup">Signup</Link>
            </Menu.Item>                  
          ];
        }

        return (
            <Header className="app-header">
            <div className="container">
              <div className="app-title" >
                <Link to="/">Hospital Management System</Link>
              </div>
              <Menu
                className="app-menu"
                mode="horizontal"
                selectedKeys={[this.props.location.pathname]}
                style={{ lineHeight: '64px' }} >
                  
                  {menuItems}
              </Menu>
            </div>
          </Header>
        );
    }
}

function LogoutDropdownMenu(props) {
  const dropdownMenu = (
    <Menu onClick={props.handleMenuClick} className="profile-dropdown-menu">
      <Menu.Item key="logout" className="dropdown-item">
      <Link to={`/logout`}>Logout</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown 
      overlay={dropdownMenu} 
      trigger={['click']}
      getPopupContainer = { () => document.getElementsByClassName('profile-menu')[0]}>
      <a className="ant-dropdown-link">Profile
        <Icon type="down" />
      </a>
    </Dropdown>
  );
}

function BillingDropdownMenu(props) {
  const dropdownMenu = (
    <Menu onClick={props.handleMenuClick} className="profile-dropdown-menu">
      <Menu.Item key="newbill" className="dropdown-item">
        <Link to={`/billing/new`}>Create New Bill</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown 
      overlay={dropdownMenu} 
      trigger={['click']}
      getPopupContainer = { () => document.getElementsByClassName('profile-menu')[0]}>
      <a className="ant-dropdown-link">Billing <Icon type="down" />
      </a>
    </Dropdown>
  );
}

function AppointmentDropdownMenu(props) {
  const dropdownMenu = (
    <Menu onClick={props.handleMenuClick} className="profile-dropdown-menu">
      <Menu.Item key="newappointment" className="dropdown-item">
        <Link to={`/appointment/new`}>Create New Appointment</Link>
      </Menu.Item>
      <Menu.Item key="appointments" className="dropdown-item">
        <Link to={`/appointments`}>List Appointments</Link> 
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown 
      overlay={dropdownMenu} 
      trigger={['click']}
      getPopupContainer = { () => document.getElementsByClassName('profile-menu')[0]}>
      <a className="ant-dropdown-link">Appointment <Icon type="down" />
      </a>
    </Dropdown>
  );
}


function DoctorDropdownMenu(props) {
  const dropdownMenu = (
    <Menu onClick={props.handleMenuClick} className="profile-dropdown-menu">
      <Menu.Item key="newdoctor" className="dropdown-item">
        <Link to={`/doctor/new`}>Add new Doctor</Link>
      </Menu.Item>
      <Menu.Item key="doctors" className="dropdown-item">
      <Link to={`/doctors`}>Doctors Available</Link> 
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown 
      overlay={dropdownMenu} 
      trigger={['click']}
      getPopupContainer = { () => document.getElementsByClassName('profile-menu')[0]}>
      <a className="ant-dropdown-link">Doctor <Icon type="down" />
      </a>
    </Dropdown>
  );
}

function PatientDropdownMenu(props) {
  const dropdownMenu = (
    <Menu onClick={props.handleMenuClick} className="profile-dropdown-menu">
      <Menu.Item key="newpatient" className="dropdown-item">
        <Link to={`/patient/new`}>Create New Patient</Link>
      </Menu.Item>
      <Menu.Item key="patients" className="dropdown-item">
        <Link to={`/patients`}>View Patient Details</Link> 
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown 
      overlay={dropdownMenu} 
      trigger={['click']}
      getPopupContainer = { () => document.getElementsByClassName('profile-menu')[0]}>
      <a className="ant-dropdown-link">Patient <Icon type="down" />
      </a>
    </Dropdown>
  );
}


export default withRouter(AppHeader);