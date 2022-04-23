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

export default function gamedata(gamedata) {
    let tablerowsdata = [];
    console.log("ingamedata func");

    let gameentity = {
        "uid": "000",
        "name": "000",
        "legendPlayed": "legend",
        "gameMode": "BATTLE_ROYALE",
        "gameLengthSecs": 1221,
        "gameStartTimestamp": 1650571042,
        "gameEndTimestamp": 1650572263,
        "gameData": [{"key": "kills", "value": 0, "name": "BR Kills"}, {
            "key": "damage",
            "value": 150,
            "name": "BR Damage"
        }, {"key": {"NOT_IMPLEMENTED_YET_2047429420": 0}, "value": 0, "name": null}],
        "estimatedLevelProgress": 4500,
        "BRScoreChange": 24,
        "BRScore": 5276,
        "ArenasScoreChange": 0,
        "ArenasScore": 0,
        "cosmetics": {
            "pose": "Incoming",
            "skin": "Daemon Hunter",
            "frame": "Fight With Honor",
            "intro": "None",
            "poseRarity": "Common",
            "skinRarity": "Epic",
            "frameRarity": "Epic",
            "introRarity": "None"
        },
        "possiblePlacement": [{"placement": "14+", "assists": 6}, {"placement": 5, "assists": 2}, {
            "placement": 3,
            "assists": 1
        }, {"placement": 2, "assists": 0}],
        "gamedatakill": 1,
        "gamedatadmg": 1,
        "possibleplacementassist": 1,
        "possibleplacement": "3"


    };
    // console.log(JSON.stringify(gamedata[13]));


    try {
        console.log("try gamedata");
        console.log(gamedata[0]);
        // tablerowsdata = gamedata;


        for (let i = 0; i < gamedata.length; i++) {
            gameentity = {};
            // console.log(gamedata[i].gameStartTimestamp);


            gameentity.uid = gamedata[i].uid;
            gameentity.name = gamedata[i].name;
            // console.log(gamedata[i].gameStartTimestamp);

            let date = gamedata[i].gameStartTimestamp;

            gameentity.gameStartTimestamp = <SimpleDateTime dateSeparator="-" timeSeparator=":">{date}</SimpleDateTime>

            if (gamedata[i].gameLengthSecs === -1) {
                gameentity.gameLengthSecs = "Too short";
            } else {
                let minutes = Math.floor(gamedata[i].gameLengthSecs / 60);
                let seconds = gamedata[i].gameLengthSecs - minutes * 60;

                gameentity.gameLengthSecs = minutes + " min " + seconds + " sec";
            }

            gameentity.legendPlayed = gamedata[i].legendPlayed;
            gameentity.gameMode = gamedata[i].gameMode;

            try {
                let rta = gamedata[i].gameData.filter(it => it.key === "kills");
                gameentity.gamedatakill = rta[0].value;
            } catch (err) {
                // console.log(err);
                gameentity.gamedatakill = "N/A";
            }

            try {
                let rta = gamedata[i].gameData.filter(it => it.key === "damage");
                gameentity.gamedatadmg = rta[0].value;
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
        console.log(tablerowsdata);


        return {
            columns: [
                {Header: "time", accessor: "gameStartTimestamp", align: "center"},
                {Header: "length", accessor: "gameLengthSecs", align: "center"},
                {Header: "MODE", accessor: "gameMode", align: "center"},
                {Header: "legendPlayed", accessor: "legendPlayed", align: "center"},
                {Header: "BRScore", accessor: "BRScore", align: "center"},
                {Header: "BRScoreChange", accessor: "BRScoreChange", align: "center"},
                {Header: "kill", accessor: "gamedatakill", align: "center"},
                {Header: "DMG", accessor: "gamedatadmg", align: "center"},
                {Header: "assist", accessor: "possibleplacementassist", align: "center"},
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
