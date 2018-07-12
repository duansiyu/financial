import Storage from './Storage';
import {ActionUrl} from './ActionUrl';

let HOST = ActionUrl.HOST;
let URL =  ActionUrl.DEFAULT_OPT_ADDRESS;     //默认action
let moneyUrl = ActionUrl.ACTIVATION_ADDRESS;
let Service = {
    //post默认formdata提交
    post : async(data, successCallback,failCallback)=>{
        let user = await Storage.getItem('USER');
        if(data.hasOwnProperty("uid")) {
            data.append("pageType","reactAPP");
        }else{
            data.append("pageType","reactAPP");
            data.append("uid",user?user.UID:'');
        }

        var fetchOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data;boundary=6ff46e0b6b5148d984f148b6542e5a5d'
            },
            body:data
        };

        fetch(URL, fetchOptions)
        .then((response) => response.json())
        .then((responseData) => {
            successCallback(responseData);
        })
        .catch((error) => {
            failCallback(error);
        }).done();
    },

    //post默认formdata提交（自带提交action）
    postWithAction : async(action,data, successCallback,failCallback)=>{
        let user = await Storage.getItem('USER');
        if(data.hasOwnProperty("uid")) {
            data.append("pageType","reactAPP");
        }else{
            data.append("pageType","reactAPP");
            data.append("uid",user?user.UID:'');
        }

        var fetchOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data;boundary=6ff46e0b6b5148d984f148b6542e5a5d'
            },
            body:data
        };

        fetch(HOST+action, fetchOptions)
        .then((response) => response.json())
        .then((responseData) => {
            successCallback(responseData);
        })
        .catch((error) => {
            failCallback(error);
        }).done();
    },

    //get默认formdata提交
    get : (data, successCallback,failCallback)=>{
        data.append("pageType","reactAPP");

        var fetchOptions = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data;boundary=6ff46e0b6b5148d984f148b6542e5a5d'
            },
            body:data
        };

        fetch(URL, fetchOptions)
            .then((response) => response.json())
            .then((responseData) => {
                successCallback(responseData);
            })
            .catch((error) => {
                failCallback(error);
            }).done();
    },

    //get默认formdata提交（自带提交action）
    getWithAction : (action,data, successCallback,failCallback)=>{
        data.append("pageType","reactAPP");

        var fetchOptions = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data;boundary=6ff46e0b6b5148d984f148b6542e5a5d'
            },
            body:data
        };

        fetch(HOST+action, fetchOptions)
            .then((response) => response.json())
            .then((responseData) => {
                successCallback(responseData);
            })
            .catch((error) => {
                failCallback(error);
            }).done();
    },

    //使用默认action
    postJson : async (data,successCallback,failCallback) => {
        let user = await Storage.getItem('USER');
        let data_gloabl = data.hasOwnProperty("uid")?{
                pageType:"reactAPP",
                uid:user?user.UID:''
            }:{
                pageType:"reactAPP"
            };
        let postData = Object.assign(data,data_gloabl);
        fetch(URL,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(postData)
        })
            .then((response) => response.json())
            .then((responseData) => {
                successCallback(responseData);
            })
            .catch((error) => {
                failCallback(error);
            });
    },
    //自带提交action
    postJsonWithAction : async (action,data,successCallback,failCallback) => {
        let user = await Storage.getItem('USER');
        let data_gloabl = data.hasOwnProperty("uid")?{
                pageType:"reactAPP",
                uid:user?user.UID:''
            }:{
                pageType:"reactAPP"
            };
        let postData = Object.assign(data,data_gloabl);
        fetch(HOST+action,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(postData)
        })
            .then((response) => response.json())
            .then((responseData) => {
                successCallback(responseData);
            })
            .catch((error) => {
                failCallback(error);
            });
    },

    //使用默认action
  getJson:(data,successCallback,failCallback) =>{
    let data_gloabl = {
      pageType:"reactAPP"
    };
    let postData = Object.assign(data,data_gloabl);
    fetch(URL,{
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((responseData) => {
        successCallback(responseData);
    })
    .catch((error) => {
        failCallback(error);
    });
  },
    //自带提交action
    getJsonWithAction:(action,data,successCallback,failCallback) =>{
        let data_gloabl = {
            pageType:"reactAPP"
        };
        let postData = Object.assign(data,data_gloabl);
        fetch(HOST+action ,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((responseData) => {
                successCallback(responseData);
            })
            .catch((error) => {
                failCallback(error);
            });
    },

    post1 : async(data, successCallback,failCallback)=>{
        let user = await Storage.getItem('USER');
        if(data.hasOwnProperty("uid")) {
            data.append("pageType","reactAPP");
        }else{
            data.append("pageType","reactAPP");
            data.append("uid",user?user.UID:'');
        }

        var fetchOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data;boundary=6ff46e0b6b5148d984f148b6542e5a5d'
            },
            body:data
        };

        fetch(moneyUrl, fetchOptions)
        .then((response) => response.json())
        .then((responseData) => {
            successCallback(responseData);
        })
        .catch((error) => {
            failCallback(error);
        }).done();
    },
}

//方便外部调用
Service.HOST=HOST;
Service.URL=URL;

export default Service;
