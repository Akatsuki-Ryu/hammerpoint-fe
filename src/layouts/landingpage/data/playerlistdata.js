/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
 =========================================================
 * Material Dashboard 2 React - v2.1.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/material-dashboard-react
 * Copyright 2022 Creative Tim (https://www.creative-tim.com)

 Coded by www.creative-tim.com

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import SimpleDateTime from "react-simple-timestamp-to-date";
import ReactTimeAgo from "react-time-ago";

let playerlisttablerowsdata = [];

function playerstatus(online, ingame) {
    if (online === 1 || online === "1") {
        if (ingame === 0 || ingame === "0") {
            return (<MDBadge badgeContent="Online" color="success" variant="gradient" size="lg"/>);
        } else if (ingame === 1 || ingame === "1") {
            return (<MDBadge badgeContent="InMatch" color="info" variant="gradient" size="lg"/>);
        }

    } else if (online === 0 || online === "0") {
        return (<MDBadge badgeContent="Offline" color="error" variant="gradient" size="lg"/>);
    }
}

function playerhighrequeststatus(online, highdemandlistflag) {
    if (highdemandlistflag === 1 || highdemandlistflag === "1") {
        return (<MDBadge badgeContent="High Demand List" color="success" variant="gradient" size="lg"/>);
    } else if (highdemandlistflag === 0 || highdemandlistflag === "0") {
        if (online === 1 || online === "1") {
            return (<MDBadge badgeContent="No credit for Highdemand" color="error" variant="gradient" size="lg"/>);
        } else if (online === 0 || online === "0") {
            return (<MDBadge badgeContent="Regular List" color="secondary" variant="gradient" size="lg"/>);
        }

    }

}

function lastseenstatus(highrequesttimestamp) {

    if (highrequesttimestamp === "0") {
        return (<MDBadge badgeContent="Unknown" color="secondary" variant="gradient" size="lg"/>);
    } else {
        highrequesttimestamp = parseInt(highrequesttimestamp);
        return (
            <span><SimpleDateTime dateSeparator="-" timeSeparator=":">{highrequesttimestamp / 1000}</SimpleDateTime>
                <br/>        Last Seen: <ReactTimeAgo date={highrequesttimestamp} locale="en-US"
                                                      timeStyle="round"/></span>);

    }
}


export default function playerlistdata(playerdata) {

    const Playerobj = (image, name, email) => (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
            <MDAvatar src={image} name={name} size="sm"/>
            <MDBox ml={2} lineHeight={1}>
                <MDTypography display="block" variant="button" fontWeight="medium">
                    {name}
                </MDTypography>
                <MDTypography variant="caption">{email}</MDTypography>
            </MDBox>
        </MDBox>
    );

    const Job = ({title, description}) => (
        <MDBox lineHeight={1} textAlign="left">
            <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
                {title}
            </MDTypography>
            <MDTypography variant="caption">{description}</MDTypography>
        </MDBox>
    );

    playerlisttablerowsdata = [];
    let playerentity = {};
    try {
        for (let i = 0; i < playerdata.length; i++) {
            if (playerdata[i].archived !== "1" && playerdata[i].archived !== 1) {

                playerentity = {};
                playerentity.player = Playerobj(playerdata[i].profilephoto, playerdata[i].profilename, playerdata[i].playername);
                playerentity.status = playerstatus(playerdata[i].online, playerdata[i].ingame);
                playerentity.highrequestlist = playerhighrequeststatus(playerdata[i].online, playerdata[i].highrequestlist);
                playerentity.lastseen = lastseenstatus(playerdata[i].highrequesttimestamp)

                playerlisttablerowsdata.push(playerentity);
            }
        }
        return {
            columns: [
                {Header: "Player", accessor: "player", align: "left"},
                {Header: "Status", accessor: "status", align: "right"},
                {Header: "High Request", accessor: "highrequestlist", align: "left"},
                {Header: "last seen", accessor: "lastseen", align: "center"},
            ],

            rows: playerlisttablerowsdata
        }

    } catch (e) {
        // console.log(e);
    }


    return {
        columns: [
            {Header: "Player", accessor: "player", align: "left"},
            {Header: "Status", accessor: "status", align: "right"},
            {Header: "High Request", accessor: "highrequestlist", align: "left"},
            {Header: "last seen", accessor: "lastseen", align: "center"},
        ],

        rows: []


    };
}
