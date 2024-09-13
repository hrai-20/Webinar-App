import React from "react";

import { Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const ColorButton = styled(Button)({
  color: "#fff",
  backgroundColor: "#0E51F1",
  borderRadius: "8px",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#0a40c1",
  },
});

const HeaderContainer = styled("div")({
  padding: "30px 0px",
  maxWidth: "90vw",
  margin: "auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const Header = ({ setOpenWebinarForm, setWebinarFormData }) => {
  return (
    <HeaderContainer>
      <Typography variant="h6" component="h6">
        Webinar
      </Typography>
      <ColorButton
        variant="contained"
        onClick={() => {
          setOpenWebinarForm(true);
          setWebinarFormData({});
        }}
      >
        Add Webinar
      </ColorButton>
    </HeaderContainer>
  );
};

export default Header;
