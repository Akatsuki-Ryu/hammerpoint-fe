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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "../../../../components/MDBadge";

function statusentity({catagory, region, status, responsetime, timestamp, noGutter}) {
    return (
        <MDBox
            component="li"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            py={1}
            pr={1}
            mb={noGutter ? 0 : 1}
        >
            <MDBox lineHeight={1.125}>
                <MDTypography display="block" variant="button" fontWeight="medium">
                    {catagory} - {region}
                </MDTypography>
                <MDTypography variant="caption" fontWeight="regular" color="text">
                    {timestamp}
                </MDTypography>
            </MDBox>
            <MDBox display="flex" alignItems="center">
                <MDTypography variant="button" fontWeight="regular" color="text">
                    {responsetime}
                </MDTypography>
                <MDBox display="flex" alignItems="center" lineHeight={1} ml={3} sx={{cursor: "pointer"}}>
                    {status === "UP" ?
                        <MDBadge badgeContent="UP" color="success" variant="gradient" size="lg"/>
                        : (status === "SLOW" ?
                            <MDBadge badgeContent="SLOW" color="warning" variant="gradient" size="lg"/>
                            : <MDBadge badgeContent="ISSUE" color="error" variant="gradient" size="lg"/>)}

                    {/*<Icon fontSize="small">picture_as_pdf</Icon>*/}
                    {/*<MDTypography variant="button" fontWeight="bold">*/}
                    {/*  &nbsp;PDF*/}
                    {/*</MDTypography>*/}
                </MDBox>
            </MDBox>
        </MDBox>
    );
}

// Setting default values for the props of Invoice
statusentity.defaultProps = {
    noGutter: false,
};

// // Typechecking props for the Invoice
// statusentity.propTypes = {
//     date: PropTypes.string.isRequired,
//     id: PropTypes.string.isRequired,
//     price: PropTypes.string.isRequired,
//     noGutter: PropTypes.bool,
// };

export default statusentity;
