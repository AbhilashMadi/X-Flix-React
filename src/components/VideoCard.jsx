import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";
import { Stack, Divider } from "@mui/material";

function VideoCard({ video }) {

const getReleaseDateText = (releaseDate) => {
  const ONE_DAY = 24 * 60 * 60 * 1000; // in milliseconds
  const releaseDateObj = new Date(releaseDate);
  const currentDateObj = new Date();
  const diffInDays = Math.round(
    Math.abs((currentDateObj - releaseDateObj) / ONE_DAY)
  );

  if (diffInDays >= 365) {
    const diffInYears = Math.floor(diffInDays / 365);
    return `${diffInYears} ${diffInYears > 1 ? "years" : "year"} ago`;
  } else if (diffInDays >= 30) {
    const diffInMonths = Math.floor(diffInDays / 30);
    return `${diffInMonths} ${diffInMonths > 1 ? "months" : "month"} ago`;
  } else if (diffInDays >= 10) {
    return `${diffInDays} ${diffInDays > 1 ? "days" : "day"} ago`;
  } else if (diffInDays >= 1) {
    return "Less than 10 days ago";
  } else {
    return "Today";
  }
}
  return (
    <Link to={`/video/${video._id}`}>
      <Card sx={{ width: "100%", height: "100%", backgroundColor: "#181818" }}>
        <CardActionArea sx={{ height: "100%" }}>
          <CardMedia
            height={150}
            component="img"
            image={video.previewImage}
            alt={video.title}
          />
          <CardContent
            sx={{ height: "100%", backgroundColor: "#202020", p: 2 }}>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              color="#fff"
              sx={{
                fontSize: "14.5px",
                fontWeight: "600",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}>
              {video.title}
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              justifyContent="flex-start">
              <Typography variant="body2" color="#999999">
                {video.genre}
              </Typography>
              <Divider
                sx={{ height: 16, borderColor: "#999999" }}
                orientation="vertical"
              />
              <Typography variant="body2" color="#999999">
                {getReleaseDateText(video.releaseDate)}
              </Typography>
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
export default VideoCard;
