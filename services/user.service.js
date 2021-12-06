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
      console.log('-- header: ', response.headers)
      const obj = response.data
      if (!(obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype)) {
        // set session data
        console.log('-- Successful user fetch')
        var token = response.data.auth_token;
        var decoded_token = jwt_decode(token);
        localStorage.setItem('token', response.data.auth_token) 
        localStorage.setItem('first_name', decoded_token.first_name)
        localStorage.setItem('last_name', decoded_token.last_name)
        localStorage.setItem('role', decoded_token.role)
        localStorage.setItem('authorized', true)
        console.log('-- set local storage auth to true')
        // successfulLoginRedirect();
        // failureLoginRedirect();
        Router.push('login', null, { shallow: true })

      } else {
        console.log('-- Un-successful user fetch')
        localStorage.clear();
        localStorage.setItem('authorized', false)

        Router.push('login', null, { shallow: true })
      }
    })
    .catch(function (response) {
      //handle error
      localStorage.setItem('authorized', false)
      console.log('-- catch response:', response);
    });
  
}

function successfulLoginRedirect() {
  Router.push('/user');
}

function failureLoginRedirect() {
  Router.push('/login');
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