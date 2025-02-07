import { AxiosGlobal } from "../../shared/axios";
import{ AxiosPromise} from "axios";
import configs from "../../../configs";
import { store } from "../../../store/store";



export class UserLiveApis extends AxiosGlobal{
    
    loginUser(data:any): AxiosPromise<any> {
        return this.axios.post(`${configs.contextCustomer}/${configs.apiList.LOGIN}`, data,
            {
                headers: {
                  "Content-Type": "application/json",
                },
              }
        );
    }


    registerUser(data:any): AxiosPromise<any> {
        return this.axios.post(`${configs.contextCustomer}/${configs.apiList.REGISTER}`, data);
    } 

    verifyMail(data: any): AxiosPromise<any> {
        return this.axios.post(`${configs.contextCustomer}/auth/verify-account`, data);
    }

    resendVerificationCode(data: any): AxiosPromise<any> {
        return this.axios.post(`${configs.contextCustomer}/auth/resend-code`, data);
    }

    // forgotPassword(data:any): AxiosPromise<any> {
    //     return this.axios.post(`${configs.contextCustomer}/forgot`, data);
    // }

    // resetPassword(data:any): AxiosPromise<any> {
    //     return this.axios.post(`${configs.contextCustomer}/reset`, data);
    // }

    login(store_code:any, data:any): AxiosPromise<any> {
        return this.axios.post(`${configs.contextCustomer}/${store_code}/auth/login`, data,{
            headers: { "Content-Type": "aplication/json","Accept":"aplication/json","Authorization":`Bearer ${store.getState().data.login.value.token}`,"Access-Control-Allow-Origin":"*" },
          });
    }


    createStore(data:any): AxiosPromise<any> {
        return this.axios.post(`${configs.contextCustomer}/store/create`, data,{
            headers: { "Content-Type": "aplication/json","Accept":"aplication/json","Authorization":`Bearer ${store.getState().data.login.value.token}`,"Access-Control-Allow-Origin":"*" },
          });
    }

    getStore(): AxiosPromise<Array<any>> {
        return this.axios.get(`${configs.contextCustomer}/store/allStores`, {
            headers: { "Content-Type": "aplication/json", "Accept": "aplication/json", "Authorization": `Bearer ${store.getState().data.login.value.token}`, "Access-Control-Allow-Origin": "*" },
        });
    }

    getSingleStore(identifier:any): AxiosPromise<Array<any>> {
        return this.axios.get(`${configs.contextCustomer}/store/${identifier}/getOne`, {
            headers: { "Content-Type": "aplication/json", "Accept": "aplication/json", "Authorization": `Bearer ${store.getState().data.login.value.token}`, "Access-Control-Allow-Origin": "*" },
        });
    }

    updateStore(store_id:any, data:any): AxiosPromise<Array<any>> {
        return this.axios.put(`${configs.contextCustomer}/store/${store_id}/update`,  data,{
            headers: { "Content-Type": "aplication/json", "Accept": "aplication/json", "Authorization": `Bearer ${store.getState().data.login.value.token}`, "Access-Control-Allow-Origin": "*" },
        });
    }

    deleteStore(id: any): AxiosPromise<Array<any>> {
        return this.axios.delete(`${configs.contextCustomer}/store/${id}/remove`, {
            headers: { "Content-Type": "aplication/json", "Accept": "aplication/json", "Authorization": `Bearer ${store.getState().data.login.value.token}`, "Access-Control-Allow-Origin": "*" },
        });
    }
    
    createCategory(storeCode:any, data:any): AxiosPromise<any> {
        return this.axios.post(`${configs.contextCustomer}/${storeCode}/categories/createOne`, data,{
            headers: { "Content-Type": "aplication/json","Accept":"aplication/json","Authorization":`Bearer ${store.getState().data.login.value.token}`,"Access-Control-Allow-Origin":"*" },
          });
    }

    getCategory(storeCode:any): AxiosPromise<Array<any>> {
        return this.axios.get(`${configs.contextCustomer}/${storeCode}/categories/getAll`, {
            headers: { "Content-Type": "aplication/json", "Accept": "aplication/json", "Authorization": `Bearer ${store.getState().data.login.value.token}`, "Access-Control-Allow-Origin": "*" },
        });
    }

    getSingleCategory(store_code:any, category_id:any): AxiosPromise<Array<any>> {
        return this.axios.get(`${configs.contextCustomer}/${store_code}/categories/${category_id}/getOne`, {
            headers: { "Content-Type": "aplication/json", "Accept": "aplication/json", "Authorization": `Bearer ${store.getState().data.login.value.token}`, "Access-Control-Allow-Origin": "*" },
        });
    }

    createProduct(storeCode:any, data:any): AxiosPromise<any> {
        return this.axios.post(`${configs.contextCustomer}/${storeCode}/products`, data,{
            headers: { "Content-Type": "aplication/json", "Accept":"aplication/json","Authorization":`Bearer ${store.getState().data.login.value.token}`,"Access-Control-Allow-Origin":"*" },
          });
    }
 
    getProduct(storeCode:any, params ={}): AxiosPromise<Array<any>> {
        return this.axios.get(`${configs.contextCustomer}/${storeCode}/products/getAll`, {
            headers: { "Content-Type": "aplication/json", "Accept": "aplication/json", "Authorization": `Bearer ${store.getState().data.login.value.token}`, "Access-Control-Allow-Origin": "*" },
            params,
        });
    }

    getCategoryProduct(storeCode:any, category_id:any, params ={}): AxiosPromise<Array<any>> {
        return this.axios.get(`${configs.contextCustomer}/${storeCode}/products/category/${category_id}`, {
            headers: { "Content-Type": "aplication/json", "Accept": "aplication/json", "Authorization": `Bearer ${store.getState().data.login.value.token}`, "Access-Control-Allow-Origin": "*" },
            params,
        });
    }
    getSingleProduct(store_code:any, product_id:any): AxiosPromise<Array<any>> {
        return this.axios.get(`${configs.contextCustomer}/${store_code}/products/${product_id}/getOne`, {
            headers: { "Content-Type": "aplication/json", "Accept": "aplication/json", "Authorization": `Bearer ${store.getState().data.login.value.token}`, "Access-Control-Allow-Origin": "*" },
        });
    }

    fetchStoreData(store_code:any): AxiosPromise<Array<any>> {
        return this.axios.get(`${configs.contextCustomer}/${store_code}/store-data`, {
            headers: { "Content-Type": "aplication/json", "Accept": "aplication/json", "Authorization": `Bearer ${store.getState().data.login.value.token}`, "Access-Control-Allow-Origin": "*" },
        });
    }

    logout(store_code:any, data:any): AxiosPromise<any> {
        return this.axios.post(`${configs.contextCustomer}/${store_code}/auth/logout`, data,{
            headers: { "Content-Type": "aplication/json","Accept":"aplication/json","Authorization":`Bearer ${store.getState().data.login.value.token}`,"Access-Control-Allow-Origin":"*" },
          });
    }
    
    // getAllHouses(cursor:any): AxiosPromise<Array<any>> {
    //     return this.axios.get(`${configs.context}/${configs.apiList.HOSTELS}/${configs.apiList.GET_ALL_HOSTEL}?cursor=${cursor}`,{
    //         headers: { "Content-Type": "aplication/json","Accept":"aplication/json","Authorization":`Bearer ${store.getState().data.login.value.token}`,"Access-Control-Allow-Origin":"*" },
    //       });
    // }


    // getAllUsers(cursor:any): AxiosPromise<Array<any>> {
    //     return this.axios.get(`${configs.context}/${configs.apiList.GET_ALL_USERS}?cursor=${cursor}`,{
    //         headers: { "Content-Type": "aplication/json","Accept":"aplication/json","Authorization":`Bearer ${store.getState().data.login.value.token}`,"Access-Control-Allow-Origin":"*" },
    //       });
    // }



    //  loginUser(data:any): AxiosPromise<any> {
    //      return this.axios.post(`${configs.context}/login`, data,{
    //         headers: { "Content-Type": "aplication/json","Accept":"aplication/json","Authorization":'Bearer 2|X4dvppS3EugstZmfvKwPbf4jBF7Y70OYvKGjdFnQ',"Access-Control-Allow-Origin":"*" },
    //       });
    // }


}