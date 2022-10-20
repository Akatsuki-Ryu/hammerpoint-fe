import React from 'react';
import axios from 'axios';

const {REACT_APP_SERVER_URL} = process.env;
export let apioutput;

export function apirequest() {
    console.log('in reqeust');
    let loginRequest;
    // try {
    //     loginRequest = axios.get(
    //         `${REACT_APP_SERVER_URL}/apitest`,
    //         {}
    //     ).then(function (res){
    //         console.log(loginRequest.data);
    //         output =JSON.stringify(loginRequest.data);
    //         return output;
    //     });
    //
    //
    // } catch ({response}) {
    //     console.log(response);
    //     loginRequest = response;
    //     console.log(loginRequest);
    // }

    axios.get(`${REACT_APP_SERVER_URL}/apitest`, {}).then((response) => {
        // console.log('Get response data');
        if (response.data) {
            // cache.set(to, response.data);
            // return res.status(200).json(response.data);
            // console.log(response.data);
            apioutput = JSON.stringify(response.data);
            console.log(apioutput);
            return apioutput;
        }
    }).catch((error) => {
        console.log(error);
        // return res.json(error);
    });

}

// apirequest();
