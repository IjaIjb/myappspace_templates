import { AxiosPromise } from "axios";
import configs from "../../configs";
import { CartLiveApis } from "../live/userLive/cartLiveApis";



export class CartApis {
    private static cartApis: CartLiveApis = new CartLiveApis();
    
    static createCart(storeCode:any, data:any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.cartApis.createCart(storeCode, data);
        }
    } 

    static reduceCart(storeCode:any,productId:any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.cartApis.reduceCart(storeCode, productId);
        }
    } 

    static getCart(storeCode:any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.cartApis.getCart(storeCode);
        }
    } 

    static deleteCart(store_code:any, product_id:any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.cartApis.deleteCart(store_code, product_id);
        }
    } 

    static makePayment(storeCode:any, data:any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.cartApis.makePayment(storeCode, data);
        }
    } 

    static getCallback(store_code:any, order_id:any, transactionId:any, status: any, ref:any): AxiosPromise<Array<any>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.cartApis.getCallback(store_code, order_id, transactionId, status, ref);
        }
    } 
    static addAddress(storeCode:any, data:any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.cartApis.addAddress(storeCode, data);
        }
    } 

    static getAllAddress(storeCode:any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.cartApis.getAllAddress(storeCode);
        }
    }

    static getSelectedCurrency(storeCode:any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.cartApis.getSelectedCurrency(storeCode);
        }
    }

}