export let maxdmgweek = 0;
export let maxdmgmonth = 0;
export let maxdmgall = 0;
export let avgdmgweek = 0;
export let avgdmgmonth = 0;
export let avgdmgall = 0;
export let totaldmgall = 0;


export let maxkillweek = 0;
export let maxkillmonth = 0;
export let maxkillall = 0;
export let avgkillweek = 0;
export let avgkillmonth = 0;
export let avgkillall = 0;
export let totalkillall = 0;


const oneweek = 1000 * 60 * 60 * 24 * 7;
const onemonth = 1000 * 60 * 60 * 24 * 30;
const timenow = Date.now();


export function getdmginsight(tablerowsdata) {
    maxdmgweek = 0;
    maxdmgmonth = 0;
    maxdmgall = 0;
    avgdmgweek = 0;
    avgdmgmonth = 0;
    avgdmgall = 0;

    console.log("this is the dmg insight==============================");
    let dmgsum = 0;
    let samplevol = 0;


    for (let i = 0; i < tablerowsdata.length; i++) {
        if (tablerowsdata[i].gamedatadmg === "N/A") {
            i++;
        } else {
            // console.log(timenow);
            // console.log(tablerowsdata[i].gameStartTimestamp*1000);
            if (timenow - tablerowsdata[i].gameStartTimestamp * 1000 < oneweek) {
                maxdmgweek = maxdmgall;
                avgdmgweek = dmgsum / samplevol;
                avgdmgweek = Math.round(avgdmgweek * 10) / 10;


            }
            if (timenow - tablerowsdata[i].gameStartTimestamp * 1000 < onemonth) {
                maxdmgmonth = maxdmgall;
                avgdmgmonth = dmgsum / samplevol;
                avgdmgmonth = Math.round(avgdmgmonth * 10) / 10;


            }

            dmgsum = dmgsum + tablerowsdata[i].gamedatadmg;
            if (tablerowsdata[i].gamedatadmg > maxdmgall) {// make the max dmg over all
                maxdmgall = tablerowsdata[i].gamedatadmg;
            }
            samplevol++;
        }
    }
    totaldmgall = dmgsum;
    avgdmgall = dmgsum / samplevol;
    avgdmgall = Math.round(avgdmgall * 10) / 10;
    console.log(maxdmgall);
    console.log(avgdmgall);
    console.log("maxdmgweek, avgdmgweek");
    console.log(maxdmgweek, avgdmgweek);
    console.log("maxdmgmonth, avgdmgmonth");
    console.log(maxdmgmonth, avgdmgmonth);

}

export function getkillsinsight(tablerowsdata) {
    maxkillweek = 0;
    maxkillmonth = 0;
    maxkillall = 0;
    avgkillweek = 0;
    avgkillmonth = 0;
    avgkillall = 0;
    console.log("this is the kills insight==============================");
    console.log(tablerowsdata);
    let killsum = 0;
    let samplevol = 0;


    for (let i = 0; i < tablerowsdata.length; i++) {
        if (tablerowsdata[i].gamedatakill === "N/A") {
            i++;
        } else {
            // console.log(timenow);
            // console.log(tablerowsdata[i].gameStartTimestamp*1000);
            if (timenow - tablerowsdata[i].gameStartTimestamp * 1000 < oneweek) {
                maxkillweek = maxkillall;
                avgkillweek = killsum / samplevol;
                avgkillweek = Math.round(avgkillweek * 10) / 10;


            }
            if (timenow - tablerowsdata[i].gameStartTimestamp * 1000 < onemonth) {
                maxkillmonth = maxkillall;
                avgkillmonth = killsum / samplevol;
                avgkillmonth = Math.round(avgkillmonth * 10) / 10;


            }

            killsum = killsum + tablerowsdata[i].gamedatakill;
            if (tablerowsdata[i].gamedatakill > maxkillall) {// make the max dmg over all
                maxkillall = tablerowsdata[i].gamedatakill;
            }
            samplevol++;
        }
    }
    totalkillall = killsum;
    avgkillall = killsum / samplevol;
    avgkillall = Math.round(avgkillall * 10) / 10;
    console.log(maxkillall);
    console.log(avgkillall);
    console.log("maxkillweek, avgkillweek");
    console.log(maxkillweek, avgkillweek);
    console.log("maxkillmonth, avgkillmonth");
    console.log(maxkillmonth, avgkillmonth);

}
