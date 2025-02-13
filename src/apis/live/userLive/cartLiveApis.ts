import { AxiosGlobal } from "../../shared/axios";
import{ AxiosPromise} from "axios";
import configs from "../../../configs";
import { store } from "../../../store/store";



export class CartLiveApis extends AxiosGlobal{
    
    createCart(store_code:any, data: any): AxiosPromise<Array<any>> {
        return this.axios.post(`${configs.contextCustomer}/${store_code}/cart/add`, data, {
            headers: { "Content-Type": "aplication/json", "Accept": "aplication/json", "Authorization": `Bearer ${store.getState().data.login.value.token}`, "Access-Control-Allow-Origin": "*" },
        });
    }

    reduceCart(store_code:any,productId:any): AxiosPromise<Array<any>> {
        return this.axios.post(`${configs.contextCustomer}/${store_code}/cart/reduce/${productId}`, {
            headers: { "Content-Type": "aplication/json", "Accept": "aplication/json", "Authorization": `Bearer ${store.getState().data.login.value.token}`, "Access-Control-Allow-Origin": "*" },
        });
    }

    getCart(store_code:any): AxiosPromise<Array<any>> {
        return this.axios.get(`${configs.contextCustomer}/${store_code}/cart/items`, {
            headers: { "Content-Type": "aplication/json", "Accept": "aplication/json", "Authorization": `Bearer ${store.getState().data.login.value.token}`, "Access-Control-Allow-Origin": "*" },
        });
    }

    deleteCart(store_code:any, product_id:any): AxiosPromise<Array<any>> {
        return this.axios.delete(`${configs.contextCustomer}/${store_code}/cart/remove/${product_id}`, {
            headers: { "Content-Type": "aplication/json", "Accept": "aplication/json", "Authorization": `Bearer ${store.getState().data.login.value.token}`, "Access-Control-Allow-Origin": "*" },
        });
    }

    makePayment(store_code:any, data: any): AxiosPromise<Array<any>> {
        return this.axios.post(`${configs.contextCustomer}/${store_code}/checkout/makePayment`, data, {
            headers: { "Content-Type": "aplication/json", "Accept": "aplication/json", "Authorization": `Bearer ${store.getState().data.login.value.token}`, "Access-Control-Allow-Origin": "*" },
        });
    }

    addAddress(store_code:any, data: any): AxiosPromise<Array<any>> {
        return this.axios.post(`${configs.contextCustomer}/${store_code}/addresses`, data, {
            headers: { "Content-Type": "aplication/json", "Accept": "aplication/json", "Authorization": `Bearer ${store.getState().data.login.value.token}`, "Access-Control-Allow-Origin": "*" },
        });
    }

    getAllAddress(store_code:any): AxiosPromise<Array<any>> {
        return this.axios.get(`${configs.contextCustomer}/${store_code}/addresses/getAll`, {
            headers: { "Content-Type": "aplication/json", "Accept": "aplication/json", "Authorization": `Bearer ${store.getState().data.login.value.token}`, "Access-Control-Allow-Origin": "*" },
        });
    }

    getSelectedCurrency(store_code:any): AxiosPromise<Array<any>> {
        return this.axios.get(`${configs.contextCustomer}/${store_code}/profile/selected-currency`, {
            headers: { "Content-Type": "aplication/json", "Accept": "aplication/json", "Authorization": `Bearer ${store.getState().data.login.value.token}`, "Access-Control-Allow-Origin": "*" },
        });
    }

    updateCurrency(store_code:any, data: any): AxiosPromise<Array<any>> {
        return this.axios.post(`${configs.contextCustomer}/${store_code}/profile/update-currency`, data, {
            headers: { "Content-Type": "aplication/json", "Accept": "aplication/json", "Authorization": `Bearer ${store.getState().data.login.value.token}`, "Access-Control-Allow-Origin": "*" },
        });
    }
    getCallback(store_code:any, order_id:any,payment_method:any, status: any, ref:any, transactionId:any): AxiosPromise<Array<any>> {
        return this.axios.get(`${configs.contextCustomer}/${store_code}/checkout/payment/callback?order_id=${order_id}&payment_method=${payment_method}&status=${status}&transaction_ref=${ref}&transaction_id=${transactionId}`, {
            headers: { "Content-Type": "aplication/json", 'mode': 'no-cors', "Accept": "aplication/json", "Authorization": `Bearer ${store.getState().data.login.value.token}`, "Access-Control-Allow-Origin": "*" },
        });
    } 

}