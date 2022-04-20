import React from "react";
import PropTypes from "prop-types";
import axios from "axios";


const {REACT_APP_SERVER_URL} = process.env;

export async function apirequest() {
    console.log("in reqeust");
    let loginRequest;
    try {
        loginRequest =await axios.get(
            `${REACT_APP_SERVER_URL}/apitest`,
            {}
        );
        console.log(loginRequest.data);

    } catch ({response}) {
        console.log(response);
        loginRequest = response;
        console.log(loginRequest);
    }


}

apirequest();
