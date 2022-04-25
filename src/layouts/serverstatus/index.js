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
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import {useEffect, useState} from "react";
import axios from "axios";
import reportsLineChartData from "../dashboard/data/reportsLineChartData";

function serverstatus() {

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

  const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {posts!==[] ? JSON.stringify(posts):""}
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
                  Authors Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {/*<DataTable*/}
                {/*  table={{ columns, rows }}*/}
                {/*  isSorted={false}*/}
                {/*  entriesPerPage={false}*/}
                {/*  showTotalEntries={false}*/}
                {/*  noEndBorder*/}
                {/*/>*/}
              </MDBox>
            </Card>
          </Grid>
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
                  Projects Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {/*<DataTable*/}
                {/*  table={{ columns: pColumns, rows: pRows }}*/}
                {/*  isSorted={false}*/}
                {/*  entriesPerPage={false}*/}
                {/*  showTotalEntries={false}*/}
                {/*  noEndBorder*/}
                {/*/>*/}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default serverstatus;
