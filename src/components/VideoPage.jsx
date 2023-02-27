import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Header from "./Header";
import { Grid, Divider, LinearProgress, Box } from "@mui/material";
import VideoPlayer from "./VideoPlayer";
import VideoCard from "./VideoCard";

function VideoPage({ videos, isLoading }) {
  const { pathname } = useLocation();
  const [video, setVideo] = useState();
  const params = useParams();
  const videoId = params.videoId;

  useEffect(() => {
    let videoFetched = videos.find((item) => item._id === videoId);
    setVideo(videoFetched);
  }, [videoId, videos]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  let videosToDisplay = videos.filter((item) => item._id !== videoId);
  return (
    <>
      {isLoading && (
        <Box sx={{ position: "absolute", width: "100%" }}>
          <LinearProgress color="primary" sx={{ height: "2px" }} />
        </Box>
      )}
      <Header />
      {video && (
        <Grid
          container
          spacing={2}
          justifyContent="center"
          sx={{ mt: { sm: 2 } }}>
          <Grid item xs={12} sm={11} lg={10}>
            <VideoPlayer video={video} />
            <Divider
              sx={{ width: "100%", borderColor: "#444D56" }}
              orientation="horizontal"
            />
          </Grid>
          <Grid item xs={12} sm={11.6} lg={10.6}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              m={0}
              width={"100%"}
              p={2}>
              {videosToDisplay.map((item) => {
                return (
                  <Grid
                    key={item._id}
                    item
                    display="flex"
                    justifyContent="center"
                    p={2}
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}>
                    <VideoCard video={item} />
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
}
export default VideoPage;
