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

export default function rplinechartdatahandle (gamedata){
  let sourcedata = [];
  try {
    sourcedata = gamedatahandle(gamedata).rows;
    // console.log(sourcedata);
  } catch (err) {
    console.log("gamedata not avaliable for chart");
    // console.log(err);
  }



  try {
    let chartdata = [];
    let labeldata = [];
    let maxsearchlength = 40;
    if (tablerowsdata.length < 40) {
      maxsearchlength = 20;
    }
    for (let i = 0; i < maxsearchlength; i++) {
      labeldata[i] = i + 1;
      chartdata[maxsearchlength - 1 - i] = tablerowsdata[i].BRScore;

    }


    return {
      labels: labeldata,
      datasets: {label: "BRScore", data: chartdata}
    };
  } catch (err) {
    // console.log(err);
    return {
      labels: ["not enough data "],
      datasets: {label: "BRScore", data: ["loading"]}
    };

  }


}
