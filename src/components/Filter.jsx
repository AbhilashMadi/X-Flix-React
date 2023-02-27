import React from "react";
import { Stack, Button, Select, FormControl, MenuItem } from "@mui/material";
import "../css/Components/Filter.css";

function Filter({
  genresList,
  updateGenreList,
  didGenresChanged,
  ageGroup,
  setAgeGroup,
  didAgeGroupChanged,
  sortBy,
  setSortBy,
  didSortByChanged,
}) {
  const handleClickForGenre = (e) => {
    didGenresChanged.current = true;
    if (e.target.id === "All" && genresList.length !== 0) {
      updateGenreList([]);
    } else if (genresList.includes(e.target.id)) {
      let arr = genresList.filter((item) => e.target.id !== item);
      updateGenreList(arr);
    } else if (e.target.id !== "All") {
      updateGenreList([...genresList, e.target.id]);
    }
  };

  const handleClickForAge = (e) => {
    didAgeGroupChanged.current = true;
    if (e.target.id === "Any" && ageGroup.length !== 0) {
      setAgeGroup("");
    } else if (e.target.id !== "Any") {
      setAgeGroup(e.target.id);
    }
  };

  const handleOnChangeSort = (e) => {
    didSortByChanged.current = true;
    setSortBy(e.target.value);
  };

  let geners = [
    { value: "All", text: "All Genre" },
    { value: "Education", text: "Education" },
    { value: "Sports", text: "Sports" },
    { value: "Comedy", text: "Comedy" },
    { value: "Lifestyle", text: "Lifestyle" },
  ];
  let age = [
    { value: "Any", text: "Any age group" },
    { value: "7+", text: "7+" },
    { value: "12+", text: "12+" },
    { value: "16+", text: "16+" },
    { value: "18+", text: "18+" },
  ];

  const selectItems = [
    { value: "releaseDate", text: "Release Date" },
    { value: "viewCount", text: "View Count" },
  ];

  return (
    <Stack className="filter-panel" p={2} spacing={2}>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}>
        <Stack direction="row" className="filter-list">
          {geners.map((item, index) => {
            return (
              <Button
                variant={
                  item.value === "All"
                    ? genresList.length === 0
                      ? "contained"
                      : "outlined"
                    : genresList.includes(item.value)
                    ? "contained"
                    : "outlined"
                }
                onClick={handleClickForGenre}
                key={index}
                id={item.value}
                color="secondary"
                sx={{
                  lineHeight: { xs: 1, md: 1.5 },
                  textTransform: "none",
                  flexShrink: 0,
                  ml: 1.5,
                  mr: 1.5,
                  mb: 1.5,
                  pl: 2,
                  pr: 2,
                  borderRadius: 8,
                }}>
                {item.text}
              </Button>
            );
          })}
        </Stack>
        <FormControl size="small">
          <Select
            color="secondary"
            size="small"
            value={sortBy}
            onChange={handleOnChangeSort}
            sx={{
              fontSize: 14,
              mb: 1.5,
              height: { xs: "2rem", md: "2.5rem" },
              border: "1px solid #444D56",
              pr: 1.5,
              flexShrink: 0,
            }}>
            {selectItems.map((item, index) => {
              return (
                <MenuItem sx={{ fontSize: 14 }} key={index} value={item.value}>
                  {item.text}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Stack>

      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}>
        <Stack direction="row" className="filter-list">
          {age.map((item, index) => {
            return (
              <Button
                variant={
                  ageGroup.length === 0
                    ? item.value === "Any"
                      ? "contained"
                      : "outlined"
                    : ageGroup === item.value
                    ? "contained"
                    : "outlined"
                }
                color="secondary"
                onClick={handleClickForAge}
                id={item.value}
                key={index}
                sx={{
                  lineHeight: { xs: 1, md: 1.5 },
                  textTransform: "none",
                  flexShrink: 0,
                  ml: 1.5,
                  mr: 1.5,
                  mb: 1.5,
                  pl: 2,
                  pr: 2,
                  borderRadius: 8,
                }}>
                {item.text}
              </Button>
            );
          })}
        </Stack>
      </Stack>
    </Stack>
  );
}
export default Filter;
