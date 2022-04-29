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
import Card from "@mui/material/Card";
import MDTypography from "../../components/MDTypography";
import DataTable from "../../examples/Tables/DataTable";
import projectsTableData from "../tables/data/projectsTableData";
import playerlistdata from "../tables/data/playerlistdata";
import serverstatus, {serverstatuscomp} from "../serverstatus";

function landingpage() {

    const { columns: pColumns, rows: pRows } = projectsTableData();

    const {REACT_APP_SERVER_URL} = process.env;
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        function loadPost() {

            // Till the data is fetch using API
            // the Loading page will show.
            setLoading(true);

            axios.get(
                `${REACT_APP_SERVER_URL}/getplayers`,
                {}
            ).then((response) => {
                // console.log('Get response data');
                // console.log(response.data);
                if (response.data) {
                    // cache.set(to, response.data);
                    // return res.status(200).json(response.data);
                    console.log(response.data);
                    // apioutput = JSON.stringify(response.data);
                    // console.log(apioutput);
                    setPosts(response.data);



                    // Closed the loading page
                    setLoading(false);
                }
            }).catch((error) => {
                console.log(error);
                // return res.json(error);
            })


            // After fetching data stored it in posts state.
            // setPosts(response.data);


        }

        // Call the function
        loadPost();
    }, []);

    const {sales, tasks} = reportsLineChartData;
    console.log(posts);


    return (
        <DashboardLayout>
            {/*{loading ? (*/}
            {/*        <h4>Loading...</h4>) :*/}
            {/*    (posts.map((item) =>*/}
            {/*        // Presently we only fetch*/}
            {/*        // title from the API*/}
            {/*        // eslint-disable-next-line react/jsx-key*/}
            {/*        <h4>{item.playername}</h4>))*/}
            {/*}sss*/}
            <DashboardNavbar/>

            {/*{posts!==[] ? JSON.stringify(posts):""}*/}

            <MDBox pt={6} pb={3} >
                <Grid container spacing={3} >
                    <Grid item xs={12} lg={6}>
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
                                    Players on board
                                </MDTypography>
                            </MDBox>
                            <MDBox pt={3}>
                                <DataTable
                                    table={playerlistdata(posts)}
                                    isSorted={false}
                                    entriesPerPage={false}
                                    showTotalEntries={false}
                                    noEndBorder
                                />
                            </MDBox>
                        </Card>

                    </Grid>
                    <Grid item xs={12} lg={6} >

                        {serverstatuscomp()}
                    </Grid>


                </Grid>
            </MDBox>
            sdfs

            <Footer/>
        </DashboardLayout>
    );
}

export default landingpage;
