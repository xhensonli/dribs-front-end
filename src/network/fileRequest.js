import axios from 'axios';
axios.defaults.withCredentials=true;
export function fileRequest(options){
    const instance = axios.create({
        baseURL: 'http://localhost:8080/dribs/',
        headers: {"content-type": "multipart/form-data"}

    });

    instance.interceptors.response.use(res => {

        return res.data;
    }, err => {

    });
    //
    //
    // instance.interceptors.response.use(res => {
    //     return res.data;
    // }, err => {
    //
    // });
    return instance(options);
}