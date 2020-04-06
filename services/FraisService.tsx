import axios, { AxiosInstance } from 'axios';
import environment from '../environments/environment';
import Service from './Service';
import { BehaviorSubject } from 'rxjs';


class FraisService {

    http: AxiosInstance = Service.getInstance();
    socket
    constructor() {
        this.http = Service.getInstance();
        
    }


    public listFraisSubject = new BehaviorSubject<any>(false);
    public listFrais = this.listFraisSubject.asObservable();
    

    async getMyFrais(callback): Promise<any> {
        this.http.get(`${environment.apiUrl}/frais/my`)
            .then(res => {
                this.listFraisSubject.next(res.data.result);
                callback(res.data.result)
            })
            .catch(error => {
                console.info(error.response.data)
            })
    }

    async create(obj, callback): Promise<any> {
        this.http.post(`${environment.apiUrl}/frais/create`, obj)
        .then(res => {
                Service.getSocket().emit('frais.create', {});
                callback(res.data.result);
            })
            .catch(error => {
                console.info(error.response.data)
            })
    }

    async getMyFraisByDate(callback): Promise<any> {
        this.http.get(`${environment.apiUrl}/frais/my/count`)
            .then(res => {
                callback(res.data.result)
            })
            .catch(error => {
                console.info(error.response.data)
            });
    }



    async updateFrais(frais, callback) {
        this.http.post(`${environment.apiUrl}/frais/my/update`, frais)
            .then(res => {
                callback(res.data.result)
            })
            .catch(error => {
                console.info(error.response)
            });
    }

    async deleteMyFrais(id, callback) {
        this.http.get(`${environment.apiUrl}/frais/my/delete/${id}`)
            .then(res => {
                callback(res.data.result)
            })
            .catch(error => {
                console.log(error.response.data)
            });
    }




}

export default new FraisService();