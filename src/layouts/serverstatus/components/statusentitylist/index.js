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
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Billing page components
import Invoice from "layouts/billing/components/Invoice";
import Statusentity from "../statusentity";

function statusentitylist({serverdata, contentswitch}) {

    //purefy the dataset to remove unusual characters
    let datapurified = JSON.stringify(serverdata);
    datapurified = datapurified.replace(/-/g, '');
    datapurified = JSON.parse(datapurified);


    if (contentswitch === "server") {


        try {
            // console.log(datapurified);

            return (
                <Card sx={{height: "100%"}}>
                    <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
                        <MDTypography variant="h6" fontWeight="medium">
                            Server status
                        </MDTypography>
                        <MDButton variant="outlined" color="info" size="small">
                            view all
                        </MDButton>
                    </MDBox>
                    <MDBox p={2}>
                        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
                            <Statusentity catagory="Origin" region="EU-west"
                                          timestamp={datapurified.Origin_login.EUWest.QueryTimestamp}
                                          responsetime={datapurified.Origin_login.EUWest.ResponseTime + " ms"}
                                          status={datapurified.Origin_login.EUWest.Status}/>
                            <Statusentity catagory="Origin" region="EU-east"
                                          timestamp={datapurified.Origin_login.EUEast.QueryTimestamp}
                                          responsetime={datapurified.Origin_login.EUEast.ResponseTime + " ms"}
                                          status={datapurified.Origin_login.EUEast.Status}/>
                            <Statusentity catagory="EA accounts" region="EU-west"
                                          timestamp={datapurified.EA_accounts.EUWest.QueryTimestamp}
                                          responsetime={datapurified.EA_accounts.EUWest.ResponseTime + " ms"}
                                          status={datapurified.EA_accounts.EUWest.Status}/>
                            <Statusentity catagory="EA accounts" region="EU-east"
                                          timestamp={datapurified.EA_accounts.EUEast.QueryTimestamp}
                                          responsetime={datapurified.EA_accounts.EUEast.ResponseTime + " ms"}
                                          status={datapurified.EA_accounts.EUEast.Status}/>
                        </MDBox>
                    </MDBox>
                </Card>
            );
        } catch (e) {
            return "loading";

        }
    }else if (contentswitch ==="selfcore") {
        try {
            console.log(datapurified);

            return (
                <Card sx={{height: "100%"}}>
                    <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
                        <MDTypography variant="h6" fontWeight="medium">
                            Server status
                        </MDTypography>
                        <MDButton variant="outlined" color="info" size="small">
                            view all
                        </MDButton>
                    </MDBox>
                    <MDBox p={2}>
                        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
                            <Statusentity catagory="OriginAPI" region=""
                                          timestamp={datapurified.selfCoreTest.OriginAPI.QueryTimestamp}
                                          responsetime={datapurified.selfCoreTest.OriginAPI.ResponseTime + " ms"}
                                          status={datapurified.selfCoreTest.OriginAPI.Status}/>
                            <Statusentity catagory="StatusAPI" region=""
                                          timestamp={datapurified.selfCoreTest.StatsAPI.QueryTimestamp}
                                          responsetime={datapurified.selfCoreTest.StatsAPI.ResponseTime + " ms"}
                                          status={datapurified.selfCoreTest.StatsAPI.Status}/>
                            <Statusentity catagory="Over FLow 1" region=""
                                          timestamp={datapurified.selfCoreTest['Overflow#1'].QueryTimestamp}
                                          responsetime={datapurified.selfCoreTest['Overflow#1'].ResponseTime + " ms"}
                                          status={datapurified.selfCoreTest['Overflow#1'].Status}/>
                            <Statusentity catagory="Over FLow 2" region=""
                                          timestamp={datapurified.selfCoreTest['Overflow#2'].QueryTimestamp}
                                          responsetime={datapurified.selfCoreTest['Overflow#2'].ResponseTime + " ms"}
                                          status={datapurified.selfCoreTest['Overflow#2'].Status}/>
                        </MDBox>
                    </MDBox>
                </Card>
            );
        } catch (e) {
            return "loading";

        }


    }
}

export default statusentitylist;
