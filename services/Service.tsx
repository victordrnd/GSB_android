import axios, { AxiosInstance } from 'axios';
import io  from 'socket.io-client/dist/socket.io';
import environment from '../environments/environment';

class Service {

    static instance : AxiosInstance;
    static token : string;
    static socket;

    static getInstance() : AxiosInstance{
        if(Service.instance == undefined){
            Service.instance = axios;
            Service.instance.interceptors.request.use((config) => {
                if(Service.token){
                    config.headers.Authorization = "Bearer " + Service.token
                }
                return config;
            });
        }

        return Service.instance;
    }

    static getSocket(){
        if(Service.socket == undefined){
            Service.socket = io(environment.socketServer);
            console.log(Service.socket);
            console.log('socket generated');
        }
        return Service.socket;
    }

    private constructor() {
    }
  
}

export default Service;