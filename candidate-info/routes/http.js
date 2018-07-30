import axios from 'axios';

const $http = axios.create({
  // baseURL: 'http://172.18.137.176:3000',
  baseURL: 'http://localhost:3000',
  timeout: 10000
});

$http.all = axios.all;
export default $http;


// baseURL: 'http://172.18.137.176:3000'
