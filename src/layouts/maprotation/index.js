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
import Divider from "@mui/material/Divider";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";
import Maprotationheader from "./components/Header";

// Data
import profilesListData from "layouts/profile/data/profilesListData";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import homeDecor4 from "assets/images/home-decor-4.jpeg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import {useEffect, useState} from "react";
import axios from "axios";
import Statusentitylist from "../serverstatus/components/statusentitylist";
import Mapinfocard from "./components/mapinfocard";

function rendermapinfocard(posts, whichmap) {
    if (whichmap === "current") {
        try {
            console.log(posts.current);
            return (
                <div>
                    <Mapinfocard
                        title="Current Map"
                        description={posts.current.map}
                        info={{
                            start: posts.current.readableDate_start,
                            end: posts.current.readableDate_end,
                            duration: posts.current.DurationInMinutes + " minutes",
                            remaining: posts.current.remainingMins + " minutes",
                        }}
                        social={[
                            {
                                link: "https://www.facebook.com/",
                                icon: <FacebookIcon/>,
                                color: "facebook",
                            },
                            {
                                link: "https://twitter.com/",
                                icon: <TwitterIcon/>,
                                color: "twitter",
                            },
                            {
                                link: "https://www.instagram.com/",
                                icon: <InstagramIcon/>,
                                color: "instagram",
                            },
                        ]}
                        action={{route: "", tooltip: "Edit Profile"}}
                        shadow={true}
                    />
                </div>

            )
        } catch (e) {
            return "No data";

        }
    } else if (whichmap === "next") {
        try {
            console.log(posts.current);
            return (
                <div>
                    <Mapinfocard
                        title="Next Map"
                        description={posts.next.map}
                        info={{
                            start: posts.next.readableDate_start,
                            end: posts.next.readableDate_end,
                            duration: posts.next.DurationInMinutes + " minutes",
                        }}
                        social={[
                            {
                                link: "https://www.facebook.com/",
                                icon: <FacebookIcon/>,
                                color: "facebook",
                            },
                            {
                                link: "https://twitter.com/",
                                icon: <TwitterIcon/>,
                                color: "twitter",
                            },
                            {
                                link: "https://www.instagram.com/",
                                icon: <InstagramIcon/>,
                                color: "instagram",
                            },
                        ]}
                        action={{route: "", tooltip: "Edit Profile"}}
                        shadow={true}
                    />
                </div>

            )
        } catch (e) {
            return "No data";

        }
    } else {
        return "no data";
    }

}


function Maprotation() {

    const {REACT_APP_SERVER_URL} = process.env;
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        function loadPost() {

            // Till the data is fetch using API
            // the Loading page will show.
            setLoading(true);

            axios.get(
                `${REACT_APP_SERVER_URL}/getmaprotation`,
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

    console.log(posts);
    console.log(posts !== []);
    return (
        <DashboardLayout>
            <DashboardNavbar/>
            <MDBox mb={2}/>
            <Maprotationheader mapaddr={posts.current?posts.current.asset:0} >
                {/*{posts !== [] ? JSON.stringify(posts) : ""}*/}
                {/*<Grid container spacing={3}>*/}
                {/*    <Grid item xs={12} lg={4}>*/}
                {/*        <Statusentitylist serverdata={posts} contentswitch="Server"/>*/}
                {/*    </Grid>*/}
                {/*    <Grid item xs={12} lg={4}>*/}
                {/*        <Statusentitylist serverdata={posts} contentswitch="Selfcore"/>*/}
                {/*    </Grid>*/}
                {/*</Grid>*/}

                <MDBox mt={5} mb={3}>
                    <Grid container spacing={1}>

                        {!loading ?
                                <Grid item xs={12} md={6} lg={4}>
                                    {/*<Divider orientation="vertical" sx={{ml: -2, mr: 1}}/>*/}
                                    {rendermapinfocard(posts, "current")}
                                    {/*<Divider orientation="vertical" sx={{mx: 0}}/>*/}
                                </Grid>

                            : ""}
                        {!loading ?
                            <Grid item xs={12} md={6} lg={4}>
                                {/*<Divider orientation="vertical" sx={{ml: -2, mr: 1}}/>*/}
                                {rendermapinfocard(posts, "next")}
                                {/*<Divider orientation="vertical" sx={{mx: 0}}/>*/}
                            </Grid>

                            : ""}
                        {/*<Grid item xs={12} xl={4}>*/}
                        {/*    <ProfilesList title="conversations" profiles={profilesListData} shadow={false}/>*/}
                        {/*</Grid>*/}
                    </Grid>
                </MDBox>
                {/*<MDBox pt={2} px={2} lineHeight={1.25}>*/}
                {/*    <MDTypography variant="h6" fontWeight="medium">*/}
                {/*        Projects*/}
                {/*    </MDTypography>*/}
                {/*    <MDBox mb={1}>*/}
                {/*        <MDTypography variant="button" color="text">*/}
                {/*            Architects design houses*/}
                {/*        </MDTypography>*/}
                {/*    </MDBox>*/}
                {/*</MDBox>*/}
                {/*<MDBox p={2}>*/}
                {/*    <Grid container spacing={6}>*/}
                {/*        <Grid item xs={12} md={6} xl={3}>*/}
                {/*            <DefaultProjectCard*/}
                {/*                image={homeDecor1}*/}
                {/*                label="project #2"*/}
                {/*                title="modern"*/}
                {/*                description="As Uber works through a huge amount of internal management turmoil."*/}
                {/*                action={{*/}
                {/*                    type: "internal",*/}
                {/*                    route: "/pages/profile/profile-overview",*/}
                {/*                    color: "info",*/}
                {/*                    label: "view project",*/}
                {/*                }}*/}
                {/*                authors={[*/}
                {/*                    {image: team1, name: "Elena Morison"},*/}
                {/*                    {image: team2, name: "Ryan Milly"},*/}
                {/*                    {image: team3, name: "Nick Daniel"},*/}
                {/*                    {image: team4, name: "Peterson"},*/}
                {/*                ]}*/}
                {/*            />*/}
                {/*        </Grid>*/}
                {/*        <Grid item xs={12} md={6} xl={3}>*/}
                {/*            <DefaultProjectCard*/}
                {/*                image={homeDecor2}*/}
                {/*                label="project #1"*/}
                {/*                title="scandinavian"*/}
                {/*                description="Music is something that everyone has their own specific opinion about."*/}
                {/*                action={{*/}
                {/*                    type: "internal",*/}
                {/*                    route: "/pages/profile/profile-overview",*/}
                {/*                    color: "info",*/}
                {/*                    label: "view project",*/}
                {/*                }}*/}
                {/*                authors={[*/}
                {/*                    {image: team3, name: "Nick Daniel"},*/}
                {/*                    {image: team4, name: "Peterson"},*/}
                {/*                    {image: team1, name: "Elena Morison"},*/}
                {/*                    {image: team2, name: "Ryan Milly"},*/}
                {/*                ]}*/}
                {/*            />*/}
                {/*        </Grid>*/}
                {/*        <Grid item xs={12} md={6} xl={3}>*/}
                {/*            <DefaultProjectCard*/}
                {/*                image={homeDecor3}*/}
                {/*                label="project #3"*/}
                {/*                title="minimalist"*/}
                {/*                description="Different people have different taste, and various types of music."*/}
                {/*                action={{*/}
                {/*                    type: "internal",*/}
                {/*                    route: "/pages/profile/profile-overview",*/}
                {/*                    color: "info",*/}
                {/*                    label: "view project",*/}
                {/*                }}*/}
                {/*                authors={[*/}
                {/*                    {image: team4, name: "Peterson"},*/}
                {/*                    {image: team3, name: "Nick Daniel"},*/}
                {/*                    {image: team2, name: "Ryan Milly"},*/}
                {/*                    {image: team1, name: "Elena Morison"},*/}
                {/*                ]}*/}
                {/*            />*/}
                {/*        </Grid>*/}
                {/*        <Grid item xs={12} md={6} xl={3}>*/}
                {/*            <DefaultProjectCard*/}
                {/*                image={homeDecor4}*/}
                {/*                label="project #4"*/}
                {/*                title="gothic"*/}
                {/*                description="Why would anyone pick blue over pink? Pink is obviously a better color."*/}
                {/*                action={{*/}
                {/*                    type: "internal",*/}
                {/*                    route: "/pages/profile/profile-overview",*/}
                {/*                    color: "info",*/}
                {/*                    label: "view project",*/}
                {/*                }}*/}
                {/*                authors={[*/}
                {/*                    {image: team4, name: "Peterson"},*/}
                {/*                    {image: team3, name: "Nick Daniel"},*/}
                {/*                    {image: team2, name: "Ryan Milly"},*/}
                {/*                    {image: team1, name: "Elena Morison"},*/}
                {/*                ]}*/}
                {/*            />*/}
                {/*        </Grid>*/}
                {/*    </Grid>*/}
                {/*</MDBox>*/}
            </Maprotationheader>
            <Footer/>
        </DashboardLayout>
    );
}

export default Maprotation;
