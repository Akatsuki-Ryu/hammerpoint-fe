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
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import {apioutput, apirequest} from "../../services/apirequest";
import {useEffect, useState} from "react";
import axios from "axios";
import Gamestatuscard from "examples/Cards/StatisticsCards/gamestatuscard";
import {playerlist} from "../../assets/userdataset";
import MDBadge from "../../components/MDBadge";
import DefaultInfoCard from "../../examples/Cards/InfoCards/DefaultInfoCard";

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


function akabox() {

    const {REACT_APP_SERVER_URL} = process.env;
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    let playeruid;

    useEffect(() => {
        function loadPost() {

            // Till the data is fetch using API
            // the Loading page will show.
            setLoading(true);

            axios.get(
                `${REACT_APP_SERVER_URL}/apicallbridge/akabox218`,
                {}
            ).then((response) => {
                if (response.data) {
                    console.log(response.data);
                    setPosts(response.data);

                }
            }).catch((error) => {
                console.log(error);
            })
            // Closed the loading page
            setLoading(false);
        }

        // Call the function
        loadPost();
    }, []);

    const {sales, tasks} = reportsLineChartData;

    //find the playerlist
    let playername = "akabox218";
    let rta = playerlist.filter(it => it.playername === playername);

    // console.log(posts.global);
    if (posts.global) {
        console.log(posts.total);
    }


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
                                icon={rta[0].profilephoto}
                                title={posts.global ? posts.global.name : "loading"}
                                count={posts.global ? ("Level " + posts.global.level) : "loading"}
                                percentage={{
                                    color: "success",
                                    amount: "",
                                    label: posts.global ? ("BattlePass Lvl " + posts.global.battlepass.level) : "loading",
                                }}
                            />
                        </MDBox>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <MDBox mb={1.5}>
                            <Gamestatuscard
                                color="secondary"
                                icon={posts.global ? posts.global.rank.rankImg : "loading"}
                                title={posts.global ? posts.global.rank.rankName : "loading"}
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
                                value= {posts.total ? (posts.total.kills.value) : "loading"}
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
                                value={posts.total ? (posts.total.headshots.value) : "loading"}
                            />

                        </Grid>
                        <Grid item xs={12} md={6} lg={2}>
                            <DefaultInfoCard
                                icon="military_tech"
                                color="error"
                                title="Arena total kills"
                                description=""
                                value={posts.total ? (posts.total.ar_kills.value) : "loading"}
                            />

                        </Grid>
                        <Grid item xs={12} md={6} lg={2}>
                            <DefaultInfoCard
                                icon="stars"
                                color="warning"
                                title="AR total damage"
                                description=""
                                value={posts.total ? (posts.total.arenas_damage.value) : "loading"}
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
                <MDBox mt={4.5}>

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
