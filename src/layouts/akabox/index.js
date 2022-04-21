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

// Data
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

function onlinestatus(onlinestatusval, lobbystatusval,selectedlegendval) {
    if (onlinestatusval === "online") {
        if (lobbystatusval === "open") {
            return (
                <MDBadge badgeContent="online" color="success" variant="gradient" size="sm"/>
            );
        } else {
            return (
                <MDBadge badgeContent={"in-match as  "+selectedlegendval} color="info" variant="gradient" size="sm"/>
            );
        }

    } else {
        return (
            <MDBadge badgeContent="offline" color="error" variant="gradient" size="sm"/>
        )
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
function exceptiondatahandle(datainputval,subparam) {
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




function akabox() {

    const {REACT_APP_SERVER_URL} = process.env;
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [newprofile, setnewprofile] = useState(false);
    let currentprofilename = useLocation().pathname.split("/").slice(1);
    let currentprofileobj = getcurrentprofile(currentprofilename);
    // console.log(currentprofileobj);


    useEffect(() => {
        function loadPost() {

            // Till the data is fetch using API
            // the Loading page will show.
            setLoading(true);

            axios.get(
                `${REACT_APP_SERVER_URL}/apicallbridge/${currentprofileobj.playername}`,
                {}
            ).then((response) => {
                if (response.data) {
                    // console.log(response.data);
                    setPosts(response.data);
                    // Closed the loading page
                    setLoading(false);
                    console.log("get request");
                }
            }).catch((error) => {
                console.log(error);
            })

        }

        setnewprofile(true);
        // Call the function
        loadPost();
        // setnewprofile(false);

    }, []);

    const {sales, tasks} = reportsLineChartData;



//get the path name for multi user purposes
//     console.log( useLocation().pathname.split("/").slice(1));


    return (
        <DashboardLayout>
            <DashboardNavbar/>
            {/*{loading?("loading"):(posts[0].playername)}*/}
            {/*{loading?"loading":posts[0].uid}sss {playeruid}*/}
            {/*{posts[0].uid}*/}
            <MDBox py={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={4}>
                        <MDBox mb={1.5}>
                            <p style={{textAlign: "right"}}>
                                {posts.realtime ? (onlinestatus(posts.realtime.currentState, posts.realtime.lobbyState,posts.realtime.selectedLegend)) :
                                    <MDBadge badgeContent="Unknown" color="secondary" variant="gradient" size="sm"/>}
                            </p>

                            <Gamestatuscard
                                color="secondary"
                                icon={currentprofileobj.profilephoto}
                                title={posts.global ? posts.global.name : "loading"}
                                count={posts.global ? ("Level " + posts.global.level) : "loading"}
                                percentage={{
                                    color: "success",
                                    amount: "",
                                    label: posts.global ? ("BattlePass Lvl " + minusdatahandle(posts.global.battlepass.level)) : "loading",
                                }}
                            />
                        </MDBox>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <MDBox mb={1.5}>
                            <Gamestatuscard
                                color="secondary"
                                icon={posts.global ? posts.global.rank.rankImg : "loading"}
                                title={posts.global ? posts.global.rank.rankName +" "+posts.global.rank.rankDiv: "loading"}
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
                                value= {posts.total ? exceptiondatahandle((posts.total.kills)) : "loading"}
                            />

                        </Grid>
                        <Grid item xs={12} md={6} lg={2}>
                            <DefaultInfoCard
                                icon="stars"
                                color="warning"
                                title="BR total damage"
                                description=""
                                value={posts.total ? (posts.total.damage.value) : "loading"}
                            />

                        </Grid>
                        <Grid item xs={12} md={6} lg={2}>
                            <DefaultInfoCard
                                icon="record_voice_over"
                                color="info"
                                title="BR headshots"
                                description=""
                                value={posts.total ? exceptiondatahandle((posts.total.headshots)) : "N/A"}
                            />

                        </Grid>
                        <Grid item xs={12} md={6} lg={2}>
                            <DefaultInfoCard
                                icon="military_tech"
                                color="error"
                                title="Arena total kills"
                                description=""
                                value={posts.total ?
                                    ((exceptiondatahandle( posts.total.arenas_kills )==="N/A")?
                                        exceptiondatahandle (posts.total.ar_kills) :   exceptiondatahandle( posts.total.arenas_kills )
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
                                value={posts.total ? (posts.total.specialEvent_kills.value) : "loading"}
                            />

                        </Grid>
                    </Grid>
                </MDBox>
                <MDBox mt={5.5}>

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6} lg={4}>

                            <MDBox mb={3}>
                                <ReportsBarChart
                                    color="primary"
                                    title="damage"
                                    description="record your damage value throughout games"
                                    date="updated 4 min ago"
                                    chart={reportsBarChartData}
                                />
                            </MDBox>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <MDBox mb={3}>
                                <ReportsLineChart
                                    color="warning"
                                    title="ranked game rp changes"
                                    description={
                                        <>
                                            (<strong>+15%</strong>) increase in today
                                        </>
                                    }
                                    date="updated 4 min ago"
                                    chart={sales}
                                />
                            </MDBox>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <MDBox mb={3}>
                                <ReportsLineChart
                                    color="dark"
                                    title="ranked arena rp changes"
                                    description="ranked arena rp changes"
                                    date="just updated"
                                    chart={tasks}
                                />
                            </MDBox>
                        </Grid>
                    </Grid>
                </MDBox>
                <MDBox>
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
