import React, { useEffect, useRef, useState } from "react";
import { Stack, Grid, LinearProgress, Box } from "@mui/material";
import Header from "./Header";
import VideoCard from "./VideoCard";
import Filter from "./Filter";
import endPoint from "../config";

function LandingPage({ videos, isLoading, fetchVideos }) {
  let [genres, setGenres] = useState([]);
  let [ageGroup, setAgeGroup] = useState("");
  let [sortBy, setSortBy] = useState("releaseDate");
  let [search, setSearch] = useState("");
  let [timer, setTimer] = useState(null);

  let didUserSearch = useRef(false);
  let didGenresChanged = useRef(false);
  let didAgeGroupChanged = useRef(false);
  let didSortByChanged = useRef(false);

  const deBouncing = (fun) => {
    if (timer) {
      clearTimeout(timer);
    }
    let newTimer = setTimeout(fun, 500);
    setTimer(newTimer);
  };

  const getUpdatedURL = () => {
    let url = `${endPoint}?`;
    if (search) {
      url = `${url}title=${search}&`;
    }
    if (genres.length !== 0) {
      url = `${url}genres=${genres.join(",")}&`;
    }
    if (ageGroup) {
      url = `${url}contentRating=${encodeURIComponent(ageGroup)}&`;
    }
    if (sortBy !== "releaseDate") {
      url = `${url}sortBy=${sortBy}`;
    }
    return url;
  };

  useEffect(() => {
    if (
      didGenresChanged.current ||
      didAgeGroupChanged.current ||
      didSortByChanged.current
    ) {
      let url = getUpdatedURL();
      fetchVideos(url);
      didGenresChanged.current = false;
      didAgeGroupChanged.current = false;
      didSortByChanged.current = false;
    }
  }, [genres, ageGroup, sortBy]);

  useEffect(() => {
    if (didUserSearch.current) {
      let url = getUpdatedURL();
      deBouncing(() => fetchVideos(url));
      didUserSearch.current = false;
    }
  }, [search]);

  return (
    <>
      {isLoading && (
        <Box sx={{ position: "absolute", width: "100%" }}>
          <LinearProgress color="primary" sx={{ height: "2px" }} />
        </Box>
      )}
      <Stack direction="column" justifyContent="flex-start">
        <Header
          search={search}
          setSearch={setSearch}
          didUserSearch={didUserSearch}
        />
        <Filter
          genresList={genres}
          updateGenreList={setGenres}
          didGenresChanged={didGenresChanged}
          ageGroup={ageGroup}
          setAgeGroup={setAgeGroup}
          didAgeGroupChanged={didAgeGroupChanged}
          sortBy={sortBy}
          setSortBy={setSortBy}
          didSortByChanged={didSortByChanged}
        />
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          m={0}
          width={"100%"}
          p={2}>
          {videos.map((item) => {
            return (
              <Grid
                key={item._id}
                item
                display="flex"
                justifyContent="center"
                p={2}
                xs={11}
                sm={6}
                md={4}
                lg={3}>
                <VideoCard video={item} />
              </Grid>
            );
          })}
        </Grid>
      </Stack>
    </>
  );
}
export default LandingPage;
