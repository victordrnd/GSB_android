import axios, { AxiosInstance } from 'axios';
import environment from '../environments/environment';
import Service from './Service';


class FraisService {

    http: AxiosInstance = Service.getInstance();
    constructor() {
        this.http = Service.getInstance();
    }


    async getMyFrais() : Promise<any> {
        this.http.get(`${environment.apiUrl}/frais/my`)
            .then(res => {
                return res.data.result
            })
            .catch(error => {
                console.info(error.response.data)
            })
    }

    async create(obj) : Promise<any>{
        this.http.post(`${environment.apiUrl}/frais/create`, obj)
            .then(res => {
                return res.data.result
            })
            .catch(error => {
                console.info(error.response.data)                
            })
    }

    async getMyFraisByDate(callback) : Promise<any>{
        this.http.get(`${environment.apiUrl}/frais/my/count`)
            .then(res => {
                callback(res.data.result)
            })
            .catch(error =>{
                console.info(error.response)                
            });
    }




}

export default new FraisService();