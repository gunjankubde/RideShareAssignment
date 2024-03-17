import axios from 'axios';

export function getUserData() {
    return axios.get('http://localhost:8000/user/get/')
        .then(res => {
            if (res.data) {
                console.log('getUserData ' + JSON.stringify(res.data), res.data);
                return res.data;
            }
            else return null;
        })
        .catch(err => {
            console.log(JSON.stringify(err));
            return null;
        })
}

export function saveUserData(user) {
    console.log('Data trying to send ', JSON.stringify(user));
    axios.post('http://127.0.0.1:8000/user/add/', user)
        .then(res => {
            console.log('Data From BackEnd ' + JSON.stringify(res));
            console.log('Data From BackEnd ' + JSON.stringify(res.data));
        })
        .catch(err => {
            console.log(JSON.stringify(err));
        });
}

export function getFeedbacks() {
    return axios.get('http://localhost:8000/user/getFeedbacks/')
        .then(res => {
            if (res.data) {
                console.log('getUserData ' + JSON.stringify(res.data), res.data);
                return res.data;
            }
            else return null;
        })
        .catch(err => {
            console.log(JSON.stringify(err));
            return null;
        })
}

export function saveFeedBack(feedback) {
    console.log('Data trying to send ', JSON.stringify(feedback));
    axios.post('http://127.0.0.1:8000/user/addFeedback/', feedback)
        .then(res => {
            console.log('Data From BackEnd ' + JSON.stringify(res));
            console.log('Data From BackEnd ' + JSON.stringify(res.data));
        })
        .catch(err => {
            console.log(JSON.stringify(err));
        });
}