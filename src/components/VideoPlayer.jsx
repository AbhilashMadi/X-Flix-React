import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import endPoint from "../config";
import axios from "axios";
import "../css/Components/VideoPlayer.css";

function VideoPlayer({ video }) {
  let [selectedVote, setSelectedVote] = useState("");

  useEffect(() => {
    (async () => {
      let url = `${endPoint}/${video._id}/views`;
      await axios.patch(url);
    })();
  }, []);

  const handleOnVote = async () => {
    let url = `${endPoint}/${video._id}/votes`;
    await axios.patch(url);
  };

  return (
    <Card sx={{ width: "100%", borderRadius: "6px", boxShadow: 0 }}>
      <CardMedia
        component="iframe"
        src={`https://${video.videoLink}?autoplay=1&mute=1`}
        sx={{
          border: 0,
          width: "100%",
          height: { xs: "16rem", sm: "25rem", md: "30rem", lg: "35rem" },
        }}
      />
      <CardContent sx={{ backgroundColor: "#181818" }}>
        <Typography sx={{ fontSize: "1.5rem" }}>{video.title}</Typography>
        <Stack
          direction="row"
          spacing={1}
          justifyContent="space-between"
          alignItems="center">
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="flex-start">
            <Typography sx={{ fontSize: "0.9rem", color: "#797979" }}>
              {video.genre}
            </Typography>
            <Divider
              sx={{ height: 20, mt: 0.8, borderColor: "#797979" }}
              orientation="vertical"
            />
            <Typography sx={{ fontSize: "0.9rem", color: "#797979" }}>
              {video.contentRating} rating
            </Typography>
          </Stack>
          <Stack
            direction="row"
            spacing={1}
            sx={{ border: "1px solid #444D56", borderRadius: "50px" }}
            justifyContent="center"
            alignItems="center">
            <Button
              onClick={handleOnVote}
              variant="text"
              color="secondary"
              sx={{ borderRadius: "50px" }}
              startIcon={
                <ThumbUpAltIcon
                  onClick={() => {
                    if (selectedVote !== "up") setSelectedVote("up");
                  }}
                  sx={{ color: selectedVote === "up" ? "#fff" : "#797979" }}
                />
              }>
              {" "}
              {video.votes?.upVotes}{" "}
            </Button>
            <Divider
              sx={{ height: 26, borderColor: "#444D56", fontWeight: 600 }}
              orientation="vertical"
            />
            <Button
              onClick={handleOnVote}
              variant="text"
              color="secondary"
              sx={{ borderRadius: "50px" }}
              startIcon={
                <ThumbDownAltIcon
                  onClick={() => {
                    if (selectedVote !== "down") setSelectedVote("down");
                  }}
                  sx={{ color: selectedVote === "down" ? "#fff" : "#797979" }}
                />
              }>
              {" "}
              {video.votes?.downVotes}{" "}
            </Button>
          </Stack>
        </Stack>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="flex-start">
          <Typography sx={{ fontSize: "0.8rem", color: "#797979" }}>
            {video.viewCount} views
          </Typography>
          <div className="dot"> </div>
          <Typography sx={{ fontSize: "0.8rem", color: "#797979" }}>
            {video.releaseDate}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
export default VideoPlayer;
