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

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";

// chart Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import {useEffect, useState} from "react";
import axios from "axios";
import Gamestatuscard from "examples/Cards/StatisticsCards/gamestatuscard";
import {playerlist} from "../../assets/userdataset";
import MDBadge from "../../components/MDBadge";
import DefaultInfoCard from "../../examples/Cards/InfoCards/DefaultInfoCard";
import {useLocation} from "react-router-dom";

//timestamp related
import TimeAgo from 'javascript-time-ago'
import ReactTimeAgo from 'react-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'
import Card from "@mui/material/Card";
import MDTypography from "../../components/MDTypography";
import DataTable from "../../examples/Tables/DataTable";

//table data
import gamedata from "layouts/akabox/data/gamedata"
import dmgbarchartdatahandle from "./data/dmgBarChartData";
import rplinechartdatahandle from "./data/rpLineChartData";
import gamedatahandle from "layouts/akabox/data/gamedata";
import {
    avgdmgall, avgdmgmonth, avgdmgweek,
    avgkillall, avgkillmonth, avgkillweek,
    maxdmgall,
    maxdmgmonth,
    maxdmgweek,
    maxkillall,
    maxkillmonth,
    maxkillweek
} from "./data/datainsight";

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)


function onlinestatus(realtimedata) {
    if (realtimedata.isOnline === 0) {
        return (
            <MDBadge badgeContent="Offline" color="error" variant="gradient" size="lg"/>
        );


    } else {
        if (realtimedata.canJoin === 0) {
            if (realtimedata.isInGame === 1) {
                return (
                    <MDBadge badgeContent={realtimedata.currentStateAsText + " as  " + realtimedata.selectedLegend}
                             color="warning"
                             variant="gradient" size="lg"/>
                );
            } else {
                return (
                    <MDBadge badgeContent="Invite Only Lobby" color="warning" variant="gradient" size="lg"/>
                );
            }
        } else {
            if (realtimedata.isInGame === 1) {
                return (
                    <MDBadge badgeContent={realtimedata.currentStateAsText + " as  " + realtimedata.selectedLegend}
                             color="info"
                             variant="gradient" size="lg"/>
                );
            } else {
                return (
                    <MDBadge badgeContent="Open Lobby" color="success" variant="gradient" size="lg"/>
                )
            }
        }


    }
}

function minusdatahandle(datainputval) {
    if (datainputval === "-1") {
        return "N/A";
    } else {
        return datainputval;
    }
}

// value={posts.total.headshots ? (posts.total.headshots.value) : "N/A"}
function exceptiondatahandle(datainputval, subparam) {
    try {
        return datainputval.value;

    } catch (err) {
        // console.log(err);
        return "N/A";
    }

}

function getcurrentprofile(currentprofilename) {
    currentprofilename = currentprofilename[0];
    let currentprofile = playerlist.filter(it => it.profilename === currentprofilename);
    // console.log(currentprofile);
    return currentprofile[0];


}

function timestamptoindex(timestamp) {
    let unixTime = timestamp;
    const dateac = new Date(unixTime);
    // console.log(dateac.toLocaleDateString("en-US"));
    // console.log(dateac.toLocaleTimeString("en-US"));
    unixTime = Math.floor(unixTime / 10000) * 10000;
    console.log(unixTime);
    const dateindex = new Date(unixTime);
    // console.log(dateindex.toLocaleDateString("en-US"));
    // console.log(dateindex.toLocaleTimeString("en-US"));
    // console.log(dateindex);
    return dateindex;

}

const oneweek = 1000 * 60 * 60 * 24 * 7;


function akabox() {

    const {REACT_APP_SERVER_URL} = process.env;
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(0);
    const [posts, setPosts] = useState([]);
    const [gameposts, setgamePosts] = useState([]);
    let currentprofilename = useLocation().pathname.split("/").slice(1);
    let currentprofileobj = getcurrentprofile(currentprofilename);

    let gamepostdata;
    //timestamp
    let dateregular = new Date();
    dateregular = Date.now();


    // timestamptoindex(dateregular);


    //table data
    // const { columns, rows } = gamedata();
    // let rowsdata = undefined;
    // const { columns: pColumns, rows: pRows } = projectsTableData();


    useEffect(() => {
        function loadPost() {

            // Till the data is fetch using API
            // the Loading page will show.
            setLoading(true);

            axios.get(
                `${REACT_APP_SERVER_URL}/getbridgedata/${currentprofileobj.playername}`,
                {}
            ).then((response) => {
                if (response.data) {
                    console.log(response.data);
                    setPosts(response.data);
                    // Closed the loading page
                    setLoading(false);
                    console.log("get bridge request===================================");
                    if (response.data.realtime.isOnline === 0) {//highdemand settings .
                        clearInterval(timer);
                    }
                }
            }).catch((error) => {
                console.log(error);
            })

            axios.get(
                `${REACT_APP_SERVER_URL}/getgamedata/${currentprofileobj.playername}`,
                {}
            ).then((response) => {
                if (response.data) {
                    // console.log(response.data);

                    // Closed the loading page
                    setLoading(false);
                    console.log("get game request===================================");
                    // console.log(response.data);
                    // gamedata(response.data);
                    // setgamePosts(gamedata());
                    // console.log(gameposts);
                    // gamepostdata = gamedata();
                    // console.log(gamepostdata);

                    setgamePosts(response.data);
                }
            }).catch((error) => {
                console.log(error);
            })

        }

        const timer = setInterval(() => loadPost(), 6000);//high demand settings , if profile online , fetch every 10 sec
        clearInterval(timer);

        // setnewprofile(false);
        loadPost();
        return () => {
            clearInterval(timer);
        };

    }, currentprofilename);

    const {sales, tasks} = reportsLineChartData;


//get the path name for multi user purposes
//     console.log( useLocation().pathname.split("/").slice(1));


    return (
        <DashboardLayout>
            <DashboardNavbar/>
            {/*{loading?("loading"):(posts[0].playername)}*/}
            {/*{loading?"loading":posts[0].uid}sss {playeruid}*/}
            {/*{posts[0].uid}*/}
            <MDBox py={0}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={4}>
                        <p style={{textAlign: "right"}}>
                            {posts.realtime ? (onlinestatus(posts.realtime)) :
                                <MDBadge badgeContent="Unknown" color="secondary" variant="gradient" size="lg"/>}
                        </p>
                    </Grid>
                </Grid>
            </MDBox>
            <MDBox py={1}>
                <Grid container spacing={3}>

                    <Grid item xs={12} md={6} lg={4}>

                        <MDBox mb={1.5}>


                            <Gamestatuscard
                                color="secondary"
                                icon={currentprofileobj.profilephoto}
                                title={posts.global ? ("BattlePass Lvl " + minusdatahandle(posts.global.battlepass.level)) : "loading"}
                                count={posts.global ? ("Level " + posts.global.level) : "loading"}
                                percentage={{
                                    color: "success",
                                    amount: "",
                                    label: ""
                                }}
                                boldtext={<span>Last Update: <ReactTimeAgo date={dateregular} locale="en-US"
                                                                           timeStyle="round"/></span>}
                                progressbarval={posts.global ? (posts.global.toNextLevelPercent) : 0}
                            />

                        </MDBox>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <MDBox mb={1.5}>
                            <Gamestatuscard
                                color="secondary"
                                icon={posts.global ? posts.global.rank.rankImg : "loading"}
                                title={posts.global ? posts.global.rank.rankName + " " + posts.global.rank.rankDiv : "loading"}
                                count={posts.global ? posts.global.rank.rankScore : "loading"}
                                percentage={{
                                    color: "success",
                                    amount: "",
                                    label: posts.global ? (posts.global.rank.rankedSeason) : "loading",
                                }}
                            />
                        </MDBox>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <MDBox mb={1.5}>
                            <Gamestatuscard
                                color="secondary"
                                icon={posts.global ? posts.global.arena.rankImg : "loading"}
                                title={posts.global ? posts.global.arena.rankName : "loading"}
                                count={posts.global ? posts.global.arena.rankScore : "loading"}
                                percentage={{
                                    color: "success",
                                    amount: "",
                                    label: posts.global ? (posts.global.arena.rankedSeason) : "loading",
                                }}
                            />
                        </MDBox>
                    </Grid>
                    {/*<Grid item xs={12} md={6} lg={3}>*/}
                    {/*    <MDBox mb={1.5}>*/}

                    {/*    </MDBox>*/}
                    {/*</Grid>*/}
                </Grid>
                <MDBox mt={1.5}>

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6} lg={2}>
                            <DefaultInfoCard
                                icon="military_tech"
                                color="error"
                                title="BR total kills"
                                description=""
                                value={posts.total ? exceptiondatahandle((posts.total.kills)) : "loading"}
                            />

                        </Grid>
                        <Grid item xs={12} md={6} lg={2}>
                            <DefaultInfoCard
                                icon="stars"
                                color="warning"
                                title="BR total damage"
                                description=""
                                value={posts.total ? exceptiondatahandle((posts.total.damage)) : "loading"}
                            />

                        </Grid>

                        <Grid item xs={12} md={6} lg={2}>
                            <DefaultInfoCard
                                icon="military_tech"
                                color="error"
                                title="Arena total kills"
                                description=""
                                value={posts.total ?
                                    ((exceptiondatahandle(posts.total.arenas_kills) === "N/A") ?
                                            exceptiondatahandle(posts.total.ar_kills) : exceptiondatahandle(posts.total.arenas_kills)
                                    )
                                    : "loading"}
                            />

                        </Grid>
                        <Grid item xs={12} md={6} lg={2}>
                            <DefaultInfoCard
                                icon="stars"
                                color="warning"
                                title="AR total damage"
                                description=""
                                value={posts.total ? exceptiondatahandle((posts.total.arenas_damage)) : "loading"}
                            />

                        </Grid>
                        <Grid item xs={12} md={6} lg={2}>
                            <DefaultInfoCard
                                icon="redeem"
                                color="secondary"
                                title="BR special Kill "
                                description=""
                                value={posts.total ? exceptiondatahandle(posts.total.specialEvent_kills) : "loading"}
                            />

                        </Grid>
                        <Grid item xs={12} md={6} lg={2}>
                            <DefaultInfoCard
                                icon="record_voice_over"
                                color="info"
                                title="BR headshots"
                                description=""
                                value={posts.total ? exceptiondatahandle((posts.total.headshots)) : "loading"}
                            />

                        </Grid>
                    </Grid>
                </MDBox>
                <MDBox mt={5.5}>

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6} lg={4}>

                            <MDBox mb={3}>
                                {gameposts[0] !== undefined ?
                                    <ReportsBarChart
                                        color="primary"
                                        title="damage"
                                        description="record your damage value throughout games"
                                        date="updated 4 min ago"
                                        chart={dmgbarchartdatahandle(gameposts)}
                                    /> : "Loading"}
                            </MDBox>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <MDBox mb={3}>
                                {gameposts[0] !== undefined ?
                                    <ReportsLineChart
                                        color="warning"
                                        title="ranked game rp changes"
                                        description={
                                            <>
                                                (<strong>+15%</strong>) increase in today
                                            </>
                                        }
                                        date="updated 4 min ago"
                                        chart={rplinechartdatahandle(gameposts)}
                                    /> : "Loading"}
                            </MDBox>
                        </Grid>

                        <Grid item xs={12} md={6} lg={2}>
                            <MDTypography variant="h3" color="info" textGradient textTransform="capitalize">
                                highest
                            </MDTypography>
                            <MDTypography variant="h5" fontWeight="bold" textTransform="capitalize">
                                kill Alltime: &emsp;{maxkillall}
                            </MDTypography>
                            <MDTypography variant="h5" fontWeight="bold" textTransform="capitalize">
                                kill Lastweek:&emsp;{maxkillweek}
                            </MDTypography>
                            <MDTypography variant="h5" fontWeight="bold" textTransform="capitalize">
                                kill Lastmonth: &emsp;{maxkillmonth}
                            </MDTypography>
                            <MDTypography variant="h5" fontWeight="bold" textTransform="capitalize">
                                --
                            </MDTypography>
                            <MDTypography variant="h5" fontWeight="bold" textTransform="capitalize">
                                DMG Alltime: {maxdmgall}
                            </MDTypography>
                            <MDTypography variant="h5" fontWeight="bold" textTransform="capitalize">
                                DMG Lastweek: {maxdmgweek}
                            </MDTypography>
                            <MDTypography variant="h5" fontWeight="bold" textTransform="capitalize">
                                DMG Lastmonth: {maxdmgmonth}
                            </MDTypography>


                            {/*    <MDBox mb={3}>*/}
                            {/*        <ReportsLineChart*/}
                            {/*            color="dark"*/}
                            {/*            title="ranked arena rp changes"*/}
                            {/*            description="ranked arena rp changes"*/}
                            {/*            date="just updated"*/}
                            {/*            chart={tasks}*/}
                            {/*        />*/}
                            {/*    </MDBox>*/}
                        </Grid>
                        <Grid item xs={12} md={6} lg={2}>

                            <MDTypography variant="h3" color="info" textGradient textTransform="capitalize">
                                average
                            </MDTypography>
                            <MDTypography variant="h5" fontWeight="bold" textTransform="capitalize">
                                kill Alltime: &emsp;{avgkillall}
                            </MDTypography>
                            <MDTypography variant="h5" fontWeight="bold" textTransform="capitalize">
                                kill Lastweek: &emsp;{avgkillweek}
                            </MDTypography>
                            <MDTypography variant="h5" fontWeight="bold" textTransform="capitalize">
                                kill Lastmonth: &emsp;{avgkillmonth}
                            </MDTypography>
                            <MDTypography variant="h5" fontWeight="bold" textTransform="capitalize">
                                --
                            </MDTypography>
                            <MDTypography variant="h5" fontWeight="bold" textTransform="capitalize">
                                DMG Alltime: {avgdmgall}
                            </MDTypography>
                            <MDTypography variant="h5" fontWeight="bold" textTransform="capitalize">
                                DMG Lastweek: {avgdmgweek}
                            </MDTypography>
                            <MDTypography variant="h5" fontWeight="bold" textTransform="capitalize">
                                DMG Lastmonth: {avgdmgmonth}
                            </MDTypography>
                        </Grid>
                    </Grid>
                </MDBox>
                <MDBox mt={-2.5}>
                    <MDBox pt={6} pb={3}>
                        <Grid container spacing={6}>
                            <Grid item xs={12}>
                                <Card>
                                    <MDBox
                                        mx={2}
                                        mt={-3}
                                        py={3}
                                        px={2}
                                        variant="gradient"
                                        bgColor="info"
                                        borderRadius="lg"
                                        coloredShadow="info"
                                    >
                                        <MDTypography variant="h6" color="white">
                                            History Game statics
                                        </MDTypography>
                                    </MDBox>
                                    <MDBox pt={3}>
                                        {gameposts[0] !== undefined ?

                                            <DataTable
                                                table={gamedatahandle(gameposts)}
                                                isSorted={true}
                                                entriesPerPage={false}
                                                showTotalEntries={true}
                                                noEndBorder
                                            /> : ""}
                                        {/*<DataTable*/}
                                        {/*    table={table}*/}
                                        {/*    isSorted={false}*/}
                                        {/*    entriesPerPage={false}*/}
                                        {/*    showTotalEntries={false}*/}
                                        {/*    noEndBorder*/}
                                        {/*/>*/}
                                    </MDBox>
                                </Card>
                            </Grid>
                            {/*<Grid item xs={12}>*/}
                            {/*    <Card>*/}
                            {/*        <MDBox*/}
                            {/*            mx={2}*/}
                            {/*            mt={-3}*/}
                            {/*            py={3}*/}
                            {/*            px={2}*/}
                            {/*            variant="gradient"*/}
                            {/*            bgColor="info"*/}
                            {/*            borderRadius="lg"*/}
                            {/*            coloredShadow="info"*/}
                            {/*        >*/}
                            {/*            <MDTypography variant="h6" color="white">*/}
                            {/*                Projects Table*/}
                            {/*            </MDTypography>*/}
                            {/*        </MDBox>*/}
                            {/*        <MDBox pt={3}>*/}
                            {/*            <DataTable*/}
                            {/*                table={{ columns: pColumns, rows: pRows }}*/}
                            {/*                isSorted={false}*/}
                            {/*                entriesPerPage={false}*/}
                            {/*                showTotalEntries={false}*/}
                            {/*                noEndBorder*/}
                            {/*            />*/}
                            {/*        </MDBox>*/}
                            {/*    </Card>*/}
                            {/*</Grid>*/}
                        </Grid>
                    </MDBox>
                    {/*<Grid container spacing={3}>*/}
                    {/*    <Grid item xs={12} md={6} lg={8}>*/}
                    {/*        <Projects/>*/}
                    {/*    </Grid>*/}
                    {/*    <Grid item xs={12} md={6} lg={4}>*/}
                    {/*        <OrdersOverview/>*/}
                    {/*    </Grid>*/}
                    {/*</Grid>*/}
                </MDBox>
            </MDBox>
            <Footer/>
        </DashboardLayout>
    );
}

export default akabox;
