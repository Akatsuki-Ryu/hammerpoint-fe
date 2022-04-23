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
import gamedatahandle, {tablerowsdata} from "./gamedata";

export default function dmgbarchartdatahandle (gamedata){
    let sourcedata = [];
    try {
        sourcedata = gamedatahandle(gamedata).rows;
        console.log(sourcedata);
    } catch (err) {
        console.log("gamedata not avaliable for chart");
        // console.log(err);
    }



    try {
        let chartdata = [];
        let labeldata = [];
        for (let i = 0; i < 20; i++) {
            labeldata[i] = i + 1;
            chartdata[19 - i] = tablerowsdata[i].gamedatadmg;

        }


        return {
            labels: labeldata,
            datasets: {label: "Sales", data: chartdata}
        };
    } catch (err) {
        // console.log(err);
        return {
            labels: ["not enough data "],
            datasets: {label: "DMG", data: ["loading"]}
        };

    }


}
