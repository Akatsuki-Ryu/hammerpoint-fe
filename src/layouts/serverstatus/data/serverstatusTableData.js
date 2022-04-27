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
import ReactTimeAgo from "react-time-ago";

import SimpleDateTime from 'react-simple-timestamp-to-date';
export let tablerowsdata = [];

export default function serverstatusdatahandle(serverdata,catagory) {
  tablerowsdata = [];

  let serverdataentity = {
    "catagory": {
      "region": {
        "Status": "UP",
        "HTTPCode": 200,
        "ResponseTime": 10,
        "QueryTimestamp": 0
      },
    }
  };
  // console.log(JSON.stringify(gamedata[13]));


  try {
    console.log("try serverdata 0");
    // console.log(serverdata);
    // tablerowsdata = gamedata;

    serverdataentity.catagory.region

    for (let i = 0; i < serverdata.length; i++) {
      serverdataentity = {};
      // console.log(gamedata[i].gameStartTimestamp);



      gameentity.uid = gamedata[i].uid;
      gameentity.name = gamedata[i].name;
      // console.log(gamedata[i].gameStartTimestamp);

      let date = gamedata[i].gameStartTimestamp;

      gameentity.gameStartTimestamp = date;
      gameentity.gameStartTimedisp = <SimpleDateTime dateSeparator="-" timeSeparator=":">{date}</SimpleDateTime>

      if (gamedata[i].gameLengthSecs === -1) {
        gameentity.gameLengthdisp = "Too short";
      } else {
        let minutes = Math.floor(gamedata[i].gameLengthSecs / 60);
        let seconds = gamedata[i].gameLengthSecs - minutes * 60;

        gameentity.gameLengthSecs = gamedata[i].gameLengthSecs;
        gameentity.gameLengthdisp = minutes + " min " + seconds + " sec";
      }

      gameentity.legendPlayed = gamedata[i].legendPlayed;
      gameentity.gameMode = gamedata[i].gameMode;

      try {
        let rta = gamedata[i].gameData.filter(it => it.key === "kills");
        if (rta.length === 0) {
          rta = gamedata[i].gameData.filter(it => it.key === "specialEvent_kills");
          gameentity.gamedatakill = rta[0].value;
        } else {
          gameentity.gamedatakill = rta[0].value;
        }


      } catch (err) {
        // console.log(err);
        gameentity.gamedatakill = "N/A";
      }

      try {
        let rta = gamedata[i].gameData.filter(it => it.key === "damage");
        if (rta.length === 0) {
          rta = gamedata[i].gameData.filter(it => it.key === "specialEvent_damage");
          gameentity.gamedatadmg = rta[0].value;
        } else {
          gameentity.gamedatadmg = rta[0].value;
        }
      } catch (err) {
        // console.log(err);
        gameentity.gamedatadmg = "N/A";
      }

      gameentity.BRScoreChange = gamedata[i].BRScoreChange;
      gameentity.BRScore = gamedata[i].BRScore;

      try {

        if (gamedata[i].possiblePlacement === false) {
          gameentity.possibleplacement = "N/A";
          gameentity.possibleplacementassist = "N/A";
        } else {
          let possibleplacementarray = gamedata[i].possiblePlacement;
          possibleplacementarray = possibleplacementarray[gamedata[i].possiblePlacement.length - 1];

          gameentity.possibleplacement = possibleplacementarray.placement;
          gameentity.possibleplacementassist =possibleplacementarray.assists;
        }

      } catch (err) {
        // console.log(err);
        gameentity.possibleplacement = "N/A";
        gameentity.possibleplacementassist = "N/A";
      }

      // console.log("game data");
      // console.log(gamedata);
      // console.log("before push");
      // console.log(tablerowsdata);
      tablerowsdata.push(gameentity);
      // console.log("after push the tablerowdata");
      // console.log(tablerowsdata);
      // console.log(i);
      // console.log(gamedata[i]);

    }
    // console.log(tablerowsdata);


    return {
      columns: [
        {Header: "time", accessor: "gameStartTimedisp", align: "center"},
        {Header: "length", accessor: "gameLengthdisp", align: "center"},
        {Header: "MODE", accessor: "gameMode", align: "center"},
        {Header: "legendPlayed", accessor: "legendPlayed", align: "center"},
        {Header: "BRScore", accessor: "BRScore", align: "center"},
        {Header: "BRScoreChange", accessor: "BRScoreChange", align: "center"},
        {Header: "kill", accessor: "gamedatakill", align: "center"},
        {Header: "assist", accessor: "possibleplacementassist", align: "center"},
        {Header: "DMG", accessor: "gamedatadmg", align: "center"},
        {Header: "position", accessor: "possibleplacement", align: "center"},
      ],

      rows: tablerowsdata
    };

  } catch (err) {
    console.log(err);
  }


  return {//this is not in use
    columns: [
      {Header: "uid", accessor: "uid", width: "45%", align: "left"},
      {Header: "function", accessor: "function", align: "left"},
      {Header: "status", accessor: "status", align: "center"},
      {Header: "employed", accessor: "employed", align: "center"},
      {Header: "action", accessor: "action", align: "center"},
    ],

    rows: []
  };

}
