import axios, { AxiosInstance } from 'axios';
import UserService from './UserService';


class Service {

    http: AxiosInstance;
    constructor() {
        axios.interceptors.request.use((config) => {
            config.headers = {"Authorization" : "Bearer " + UserService.getToken()}
            return config;
        });
    }
}

export default new Service();