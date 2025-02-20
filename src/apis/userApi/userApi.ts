import { AxiosPromise } from "axios";
import configs from "../../configs";

import { UserLiveApis } from "../live/userLive/userLiveApis";



export class UserApis {
    private static authLiveApis: UserLiveApis = new UserLiveApis();
    
    static login(data: any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.authLiveApis.loginUser(data);
        }
    }  

    static register(storeCode:any, data: any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.authLiveApis.registerUser(storeCode, data);
        }
    }  

    static verifyMail(storeCode:any, data:any): AxiosPromise<Array<any>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.authLiveApis.verifyMail(storeCode, data);
        }
    } 

    static resendVerificationCode(pageNo:any): AxiosPromise<Array<any>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.authLiveApis.resendVerificationCode(pageNo);
        }
    } 

    // static forgotPassword(data: any): AxiosPromise<any> {
    //     if (configs.type === "LOCAL") {
    //         return {} as AxiosPromise;
    //     } else {
    //         return this.authLiveApis.forgotPassword(data);
    //     }
    // }

    // static resetPassword(data: any): AxiosPromise<any> {
    //     if (configs.type === "LOCAL") {
    //         return {} as AxiosPromise;
    //     } else {
    //         return this.authLiveApis.resetPassword(data);
    //     }
    // }

    static loginCustomer(store_code:any, data: any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.authLiveApis.login(store_code,data);
        }
    }

    static getProfile(storeCode:any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.authLiveApis.getProfile(storeCode);
        }
    } 

    static updateProfile(storeCode:any, data:any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.authLiveApis.updateProfile(storeCode, data);
        }
    } 

    static createStore(data: any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.authLiveApis.createStore(data);
        }
    }

    static getStore(): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.authLiveApis.getStore();
        }
    } 

    static getSingleStore(identifier:any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.authLiveApis.getSingleStore(identifier);
        }
    } 

    static updateStore(store_id:any, data:any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.authLiveApis.updateStore(store_id, data);
        }
    } 

    static deleteStore(id:any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.authLiveApis.deleteStore(id);
        }
    } 

    static createCategory(storeCode:any, data: any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.authLiveApis.createCategory(storeCode,data);
        }
    }

    static getCategory(storeCode:any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.authLiveApis.getCategory(storeCode);
        }
    } 

    static getSingleCategory(store_code:any, category_id:any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.authLiveApis.getSingleCategory(store_code, category_id);
        }
    } 

    static createProduct(storeCode:any, data: any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.authLiveApis.createProduct(storeCode,data);
        }
    }

    static addToWishlist(storeCode:any, data: any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.authLiveApis.addToWishlist(storeCode,data);
        }
    }

    static getAllWishlist(storeCode:any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.authLiveApis.getAllWishlist(storeCode);
        }
    } 

    static removeWishlist(storeCode:any, product_id:any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.authLiveApis.removeWishlist(storeCode, product_id);
        }
    } 

    static getProduct(storeCode:any,data:any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.authLiveApis.getProduct(storeCode,data);
        }
    } 

    static getCategoryProduct(storeCode:any, category_id:any, data:any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.authLiveApis.getCategoryProduct(storeCode, category_id, data);
        }
    } 

    static getSingleProduct(store_code:any, category_id:any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.authLiveApis.getSingleProduct(store_code, category_id);
        }
    } 

    static getOrder(storeCode:any, data:any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.authLiveApis.getOrder(storeCode, data);
        }
    } 

    static getTransaction(storeCode:any, data:any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.authLiveApis.getTransaction(storeCode, data);
        }
    } 

    static fetchStoreData(store_code:any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.authLiveApis.fetchStoreData(store_code);
        }
    } 

    static logout(store_code:any, data: any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.authLiveApis.logout(store_code,data);
        }
    }


}