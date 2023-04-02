import axios from "axios";

export const instance = axios.create({
  baseURL: 'https://sf-final-project-be.herokuapp.com/api/',
  timeout: 1000,
  headers: {
    'Content-type': 'application/json',
  }
});

export const instanceAuth = axios.create({
  baseURL: 'https://sf-final-project-be.herokuapp.com/api/',
  timeout: 1000,
  headers: {
    'Content-type': 'application/json',
    'Authorization': 'Bearer ' + window.localStorage.getItem('token')
  },
})