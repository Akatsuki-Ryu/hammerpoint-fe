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
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/landingpage/data/playerlistdata";
import projectsTableData from "layouts/tables/data/projectsTableData";
import {useEffect, useState} from "react";
import axios from "axios";
import serverstatusdatahandle from "./data/serverstatusTableData";
import Statusentitylist from "./components/statusentitylist";
import Invoices from "../billing/components/Invoices";

export function serverstatuscomp() {


    const {REACT_APP_SERVER_URL} = process.env;
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        function loadPost() {

            // Till the data is fetch using API
            // the Loading page will show.
            setLoading(true);

            axios.get(
                `${REACT_APP_SERVER_URL}/getserverstatus`,
                {}
            ).then((response) => {
                // console.log('Get response data');
                // console.log(response.data);
                if (response.data) {
                    // cache.set(to, response.data);
                    // return res.status(200).json(response.data);
                    // console.log(response.data);
                    // apioutput = JSON.stringify(response.data);
                    // console.log(apioutput);
                    setPosts(response.data);


                }
            }).catch((error) => {
                console.log(error);
                // return res.json(error);
            })


            // After fetching data stored it in posts state.
            // setPosts(response.data);

            // Closed the loading page
            setLoading(false);
        }

        // Call the function
        loadPost();
    }, []);

    // console.log(posts);

    const {columns, rows} = authorsTableData();
    const {columns: pColumns, rows: pRows} = projectsTableData();

    return (


                    <Grid container spacing={3}>
                        <Grid item xs={12} lg={6}>
                            <Statusentitylist serverdata={posts} contentswitch="Server"/>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Statusentitylist serverdata={posts} contentswitch="Selfcore"/>
                        </Grid>
                    </Grid>






    );


}

function serverstatus() {
    return (
        <DashboardLayout>
            <DashboardNavbar/>
            <MDBox mt={8}>
                <MDBox mb={3}>
            {serverstatuscomp()}

            {/*{posts !== [] ? JSON.stringify(posts) : ""}*/}
                </MDBox>
            </MDBox>
            <Footer/>
        </DashboardLayout>
    );
}

export default serverstatus;
