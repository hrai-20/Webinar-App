import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  IconButton,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Close,
  Add,
  PeopleAltOutlined,
  VideocamOutlined,
} from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";

const TextLabel = {
  fontSize: { xs: "12px", sm: "13px" },
  lineHeight: "15.73px",
  fontWeight: 600,
};

const HeadingLabel = {
  fontSize: { xs: "14px", sm: "16px" },
  lineHeight: "28px",
  fontWeight: 600,
  display: "flex",
  alignItems: "center",
  mb: "25px",
};

const getTextFieldStyle = (width = "100%") => ({
  width: width,
  height: "44px",
  marginBottom: "25px",
  background: "#F2F4F8",
  borderRadius: "10px",
  "& .MuiOutlinedInput-root": {
    height: "44px",
    borderRadius: "10px",
    "& fieldset": {
      borderWidth: "1px",
    },
  },
  "& .MuiInputBase-input": {
    height: "44px",
    padding: "0 14px",
  },
});

const RequiredStar = {
  color: "#be1818",
  fontSize: "13px",
  fontWeight: 600,
  lineHeight: "15.73px",
};

const WebinarFormModal = ({
  open,
  handleClose,
  handleSave,
  webinarFormData,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    role: "",
    company: "",
    topic: "",
    eventTitle: "",
    eventDate: "",
    eventStartTime: "",
    eventEndTime: "",
    profilePic: null,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (webinarFormData) {
      setFormData({
        id: webinarFormData.id || "",
        name: webinarFormData.name || "",
        role: webinarFormData.role || "",
        company: webinarFormData.company || "",
        topic: webinarFormData.topic || "",
        eventTitle: webinarFormData.eventTitle || "",
        eventDate: webinarFormData.eventDate ? webinarFormData.eventDate : "",
        eventStartTime: webinarFormData.eventStartTime
          ? webinarFormData.eventStartTime
          : "",
        eventEndTime: webinarFormData.eventEndTime
          ? webinarFormData.eventEndTime
          : "",
        profilePic: webinarFormData.profilePic || null,
      });
    }
  }, [webinarFormData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData((prevData) => ({ ...prevData, profilePic: file }));
    }
  };

  const validateFields = () => {
    const requiredFields = [
      "name",
      "role",
      "company",
      "topic",
      "eventTitle",
      "eventDate",
      "eventStartTime",
      "eventEndTime",
    ];

    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${field} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = () => {
    if (validateFields()) {
      const webinarData = {
        ...formData,
        id: formData.id || uuidv4(),
      };
      handleSave(webinarData);
      handleClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullScreen={isMobile}
      sx={{
        "& .MuiPaper-root": {
          borderRadius: isMobile ? 0 : "10px",
        },
      }}
    >
      <DialogTitle>
        <Typography
          variant="h6"
          sx={{ fontSize: { xs: "16px", sm: "18px" }, lineHeight: "28px", fontWeight: 600 }}
        >
          Create webinar
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant="body1" sx={HeadingLabel}>
          <PeopleAltOutlined sx={{ mr: 2.5 }} fontSize="small" /> Instructor
          Details
        </Typography>
        <Box sx={{ ml: { xs: 0, sm: 5 } }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6.2}>
              <Typography sx={TextLabel}>
                Instructor Name<span style={RequiredStar}>*</span>{" "}
              </Typography>
              <TextField
                fullWidth
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Type the instructor name"
                margin="dense"
                variant="outlined"
                sx={getTextFieldStyle()}
                error={!!errors.name}
                helperText={errors.name}
              />
              <Typography sx={TextLabel}>
                Instructor Role<span style={RequiredStar}>*</span>
              </Typography>
              <TextField
                fullWidth
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="Type the instructor role"
                margin="dense"
                variant="outlined"
                sx={getTextFieldStyle()}
                error={!!errors.role}
                helperText={errors.role}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography sx={TextLabel}>Instructor Image</Typography>
              <div style={{ display: "flex", justifyContent: isMobile ? "center" : "flex-start" }}>
                <Box
                  sx={{
                    height: "135px",
                    width: "135px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "#F2F4F8",
                    borderRadius: 1,
                    cursor: "pointer",
                    border: "1.78px dashed #D9DBDC",
                    mt: 1,
                    position: "relative",
                    mr: 1,
                  }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    style={{
                      opacity: 0,
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      cursor: "pointer",
                    }}
                    onChange={handleImageChange}
                  />
                  <Add color="action" fontSize="large" />
                </Box>
                <Box
                  sx={{
                    height: "135px",
                    width: "135px",
                    borderRadius: 1,
                    mt: 1,
                    position: "relative",
                  }}
                >
                  {formData.profilePic ? (
                    <img
                      src={
                        typeof formData.profilePic === "string"
                          ? formData.profilePic
                          : URL.createObjectURL(formData.profilePic)
                      }
                      alt="Instructor"
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "8px",
                      }}
                    />
                  ) : (
                    <></>
                  )}
                </Box>
              </div>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, ml: { xs: 0, sm: 5 }, gap: { xs: 0, sm: 5 } }}>
          <div style={{ display: "block", width: "100%" }}>
            <Typography sx={TextLabel}>
              Instructor Company<span style={RequiredStar}>*</span>{" "}
            </Typography>
            <TextField
              fullWidth
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Type the instructor company"
              margin="dense"
              variant="outlined"
              sx={getTextFieldStyle()}
              error={!!errors.company}
              helperText={errors.company}
            />
          </div>
          <div style={{ display: "block", width: "100%" }}>
            <Typography sx={TextLabel}>
              Topics<span style={RequiredStar}>*</span>{" "}
            </Typography>
            <TextField
              fullWidth
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              placeholder="Type the topics"
              margin="dense"
              variant="outlined"
              sx={getTextFieldStyle()}
              error={!!errors.topic}
              helperText={errors.topic}
            />
          </div>
        </Box>
        <Typography variant="subtitle1" sx={HeadingLabel}>
          <VideocamOutlined sx={{ mr: 3 }} fontSize="small" /> Webinar Details
        </Typography>
        <Box sx={{ ml: { xs: 0, sm: 5 } }}>
          <Typography sx={TextLabel}>
            Webinar Title<span style={RequiredStar}>*</span>
          </Typography>
          <TextField
            name="eventTitle"
            value={formData.eventTitle}
            onChange={handleChange}
            placeholder="Type the webinar title"
            margin="dense"
            variant="outlined"
            sx={getTextFieldStyle()}
            error={!!errors.eventTitle}
            helperText={errors.eventTitle}
          />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Typography sx={TextLabel}>
                Start Date<span style={RequiredStar}>*</span>
              </Typography>
              <TextField
                fullWidth
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                type="date"
                placeholder="Type start date"
                margin="dense"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                sx={getTextFieldStyle()}
                error={!!errors.eventDate}
                helperText={errors.eventDate}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography sx={TextLabel}>
                Start Time<span style={RequiredStar}>*</span>
              </Typography>
              <TextField
                fullWidth
                name="eventStartTime"
                value={formData.eventStartTime}
                onChange={handleChange}
                type="time"
                placeholder="Type start time"
                margin="dense"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                sx={getTextFieldStyle()}
                error={!!errors.eventStartTime}
                helperText={errors.eventStartTime}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography sx={TextLabel}>
                End Time<span style={RequiredStar}>*</span>
              </Typography>
              <TextField
                fullWidth
                name="eventEndTime"
                value={formData.eventEndTime}
                onChange={handleChange}
                type="time"
                placeholder="Type end time"
                margin="dense"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                sx={getTextFieldStyle()}
                error={!!errors.eventEndTime}
                helperText={errors.eventEndTime}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "flex-start", p: 2, flexDirection: isMobile ? "column" : "row" }}>
        <Button
          sx={{
            color: "#fff",
            backgroundColor: "#0E51F1",
            borderRadius: "8px",
            textTransform: "none",
            width: isMobile ? "100%" : "auto",
            mb: isMobile ? 1 : 0,
            "&:hover": {
              backgroundColor: "#0a40c1",
            },
          }}
          onClick={handleFormSubmit}
          variant="contained"
        >
          Create webinar
        </Button>
        <Button
          sx={{
            color: "#0E51F1",
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: 600,
            fontSize: "16px",
            lineHeight: "19.36px",
            width: isMobile ? "100%" : "auto",
          }}
          onClick={handleClose}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WebinarFormModal;