import React, { useState } from "react";
import {
  Box,
  Stack,
  InputBase,
  IconButton,
  Divider,
  Button,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { Link } from "react-router-dom";
import logo from "../assets/xflix-logo.png";
import UploadDialog from "./UploadDialog";
import "../css/Components/Header.css";

function Header({ search, setSearch, didUserSearch }) {
  const [isDialogOpened, setIsDialogOpened] = useState(false);

  const handleOnOpen = () => {
    setIsDialogOpened(true);
  };

  const handleOnchangeForSearch = (e) => {
    didUserSearch.current = true;
    setSearch(e.target.value);
  };

  const handleOnClose = () => {
    setIsDialogOpened(false);
  };

  return (
    <>
      <Box className="header">
        <Box className="header-title">
          <Link to="/">
            <img className="xflix-icon" src={logo} alt="Xflix Icon" className="logo"></img>
          </Link>
        </Box>
        {didUserSearch && (
          <Box className="search-bar" sx={{ height: 40, m: 0.5 }}>
            <Stack direction="row">
              <InputBase
                onChange={handleOnchangeForSearch}
                value={search}
                sx={{
                  ml: 1,
                  color: "#909090",
                  p: 0.5,
                  width: { sm: 200, md: 400 },
                }}
                placeholder="Search..."
              />
              <Divider
                sx={{ height: 26, mt: 0.8, borderColor: "#444D56" }}
                orientation="vertical"
              />
              <IconButton
                type="button"
                sx={{ p: "10px", color: "#808080" }}
                aria-label="search">
                <SearchIcon />
              </IconButton>
            </Stack>
          </Box>
        )}
        <Box className="upload-button" sx={{ ml: 1 }}>
          <Button
            onClick={handleOnOpen}
            variant="contained"
            color="primary"
            size="small">
            {" "}
            <FileUploadOutlinedIcon />{" "}
            <Typography
              variant="button"
              sx={{ display: { xs: "none", sm: "block" }, ml: 0.5 }}>
              Upload
            </Typography>
          </Button>
        </Box>
      </Box>
      {isDialogOpened && (
        <UploadDialog open={isDialogOpened} handleClose={handleOnClose} />
      )}
    </>
  );
}
export default Header;
