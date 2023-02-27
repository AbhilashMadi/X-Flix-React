import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
} from "@mui/material";
import axios from "axios";
import endPoint from "../config";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

export default function UploadDialog({ open, handleClose }) {
  let [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState({
    videoLink: "",
    title: "",
    genre: "",
    contentRating: "",
    releaseDate: "",
    previewImage: "",
  });
  const onChangeHandler = (e) => {
    const {name,value} = e.target;
    setData({...data,[name]:value})
  };

  const handleUpload = async () => {
    try {
      setIsUploading(true);
      let res = await axios.post(endPoint, data);
      console.log(res);
      handleClose();
      enqueueSnackbar(`Uploaded Successfully`, { variant: "success" });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Upload Video</DialogTitle>
      <DialogContent
        sx={{
          scrollbarWidth: "thin",
          display: "flex",
          gap: 2,
          flexDirection: "column",
          paddingTop: "10px !important",
        }}>
        <DialogContentText></DialogContentText>
        <TextField
          onChange={onChangeHandler}
          value={data.videoLink}
          autoFocus
          margin="dense"
          name="videoLink"
          label="Video Link"
          type="text"
          fullWidth
          variant="outlined"
          helperText="This link will be used to derive the video"
        />
        <TextField
          onChange={onChangeHandler}
          value={data.previewImage}
          margin="dense"
          name="previewImage"
          label="Thumbnail Image Link"
          type="text"
          fullWidth
          variant="outlined"
          helperText="This link will be used to preview the thumbnail image"
        />
        <TextField
          onChange={onChangeHandler}
          value={data.title}
          margin="dense"
          name="title"
          label="Title"
          type="text"
          fullWidth
          variant="outlined"
          helperText="The title will be representative text for the video"
        />
        <FormControl sx={{ width: "100%" }} size="Medium" margin="dense">
          <InputLabel id="genre">Genre</InputLabel>
          <Select
            name="genre"
            value={data.genre}
            label="Genre"
            type="text"
            fullWidth
            variant="outlined"
            onChange={onChangeHandler}>
            <MenuItem name="genre" value="Education">
              Education
            </MenuItem>
            <MenuItem name="genre" value="Sports">
              Sports
            </MenuItem>
            <MenuItem name="genre" value="Comedy">
              Comedy
            </MenuItem>
            <MenuItem name="genre" value="Lifestyle">
              Lifestyle
            </MenuItem>
          </Select>
          <FormHelperText>
            Genre will help in categorizing your videos
          </FormHelperText>
        </FormControl>

        <FormControl sx={{ width: "100%" }} size="Medium" margin="dense">
          <InputLabel id="contentRating">
            Suitable age group for the video
          </InputLabel>
          <Select
            name="contentRating"
            value={data.contentRating}
            label="Suitable age group for the video"
            type="text"
            fullWidth
            variant="outlined"
            onChange={onChangeHandler}>
            <MenuItem name="contentRating" value="7+">
              7+
            </MenuItem>
            <MenuItem name="contentRating" value="12+">
              12+
            </MenuItem>
            <MenuItem name="contentRating" value="16+">
              16+
            </MenuItem>
            <MenuItem name="contentRating" value="18+">
              18+
            </MenuItem>
          </Select>
          <FormHelperText>
            This will be used to filter videos on age group suitability
          </FormHelperText>
        </FormControl>

        <TextField
          onChange={onChangeHandler}
          value={data.releaseDate}
          InputLabelProps={{ shrink: true }}
          margin="dense"
          name="releaseDate"
          label="Release Date"
          type="date"
          fullWidth
          variant="outlined"
          helperText="The will be used to sort videos"
        />
      </DialogContent>
      <DialogActions style={{display:"flex",justifyContent:"space-between",marginBottom:"20px", marginInline:"20px"}}>
        <Button
          variant="contained"
          onClick={handleUpload}
          disabled={isUploading ? true : false}>
          {isUploading ? "Uploading" : "Upload"}
        </Button>
        <Button
          color="secondary"
          onClick={() => {
            navigate("/");
            handleClose();
          }}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
