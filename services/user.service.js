import axios from "axios";
import jwt_decode from "jwt-decode";
import Router from 'next/router'

function login(email, password) {
  axios({
    method: "post",
    url: "http://127.0.0.1:3333/authenticate",
    data: { email: email, password: password }, 
    headers: { "Content-Type": 'application/json', 'Access-Control-Allow-Origin': '*' },
  })
    .then(function (response) {
      //handle success
      const obj = response.data
      if (!(obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype)) {
        // set session data
        var token = response.data.auth_token;
        var decoded_token = jwt_decode(token);
        localStorage.setItem('token', response.data.auth_token) 
        localStorage.setItem('first_name', decoded_token.first_name)
        localStorage.setItem('last_name', decoded_token.last_name)
        localStorage.setItem('role', decoded_token.role)
        loginRedirect();
      } else {
        localStorage.clear();
      }
    })
    .catch(function (response) {
      //handle error
      console.log('-- catch response:', response);
    });
  
}

function loginRedirect() {
  Router.push('/user');
}

function logout() {
  // remove user from local storage, publish null to user subscribers and redirect to login page
  localStorage.removeItem('user');

  Router.push('/login');
}

export const userService = {
  login,
  logout
};