import { API_BASE_URL, ACCESS_TOKEN } from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function getAllPatients() {
    return request({
        url: API_BASE_URL + "/patient",
        method: 'GET'
    });
}

export function createPatient(patientData) {
    return request({
        url: API_BASE_URL + "/patient",
        method: 'POST',
        body: JSON.stringify(patientData)         
    });
}

export function getAllDoctors() {
    return request({
        url: API_BASE_URL + "/doctor",
        method: 'GET'
    });
}

export function createDoctor(doctorData) {
    return request({
        url: API_BASE_URL + "/doctor",
        method: 'POST',
        body: JSON.stringify(doctorData)         
    });
}

export function getAllAppointments() {
    return request({
        url: API_BASE_URL + "/appointment",
        method: 'GET'
    });
}

export function createAppointment(appointmentData) {
    return request({
        url: API_BASE_URL + "/appointment",
        method: 'POST',
        body: JSON.stringify(appointmentData)         
    });
}

export function createBilling(billData) {
    return request({
        url: API_BASE_URL + "/billing",
        method: 'POST',
        body: JSON.stringify(billData)         
    });
}

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/signin",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function checkUsernameAvailability(username) {
    return request({
        url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
        method: 'GET'
    });
}

export function getDoctorName(id) {
    return request({
        url: API_BASE_URL + "/doctor/" + id,
        method: 'GET'
    });
}

export function getPatientName(id) {
    return request({
        url: API_BASE_URL + "/patient/" + id,
        method: 'GET'
    });
}

export function getAppointmentDetails(id) {
    return request({
        url: API_BASE_URL + "/appointment/patient/" + id,
        method: 'GET'
    });
}

export function checkAppointmentAvailability(date,doctorId){
    return request({
        url: API_BASE_URL + "/appointment/checkAvailability?date=" + date+'&doctorId='+doctorId,
        method: 'GET'
    });
}

export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}
