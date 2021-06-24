import Axios from 'axios';

export const ApiService = Axios.create({
    baseURL: 'https://financas-api-poc.herokuapp.com/api',
    timeout: 30000
})
