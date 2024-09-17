import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Button,
  styled,
} from "@mui/material";

const CardColor = (ind) => {
  const colorArray = [
    "#741de3",
    "#e72174",
    "#08a79e",
    "#0e51f1",
    "#ffb023",
    "#088761",
  ];
  return colorArray[ind % 6];
};

const StyledCard = styled(Card)({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  border: "1px solid #E3E7EC",
  borderRadius: 16,
  boxShadow: "0 20px 46px -24px rgba(14,16,19,0.12)",
  overflow: "hidden",
});

const HeaderBox = styled(Box)(({ theme, ind }) => ({
  backgroundColor: CardColor(ind),
  color: "white",
  padding: "25px 20px",
  borderRadius: 16,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin:"20px 20px 0 20px"
}));

const StyledAvatar = styled(Avatar)({
  width: 76,
  height: 76,
  borderRadius: 10,
});

const DeleteButton = styled(Button)({
  backgroundColor: "#f9e8e8",
  color: "#d14040",
  textTransform: "none",
  borderRadius: 24,
  fontWeight: 600,
  fontSize: "14px",
  lineHeight: "24px",
  "&:hover": {
    backgroundColor: "#ffcdd2",
  },
});

const EditButton = styled(Button)({
  color: "#0e51f1",
  textTransform: "none",
  borderRadius: 24,
  fontWeight: 600,
  fontSize: "12.86px",
  lineHeight: "15.57px",
});

const WebinarCard = ({
  cardDetail,
  ind,
  setOnDeleteCard,
  setOpenWebinarForm,
  setWebinarFormData,
}) => {
  function formatEventDateTime(eventDate, eventStartTime, eventEndTime) {
    const date = new Date(eventDate + "T" + eventStartTime);
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayOfWeek = daysOfWeek[date.getDay()];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = months[date.getMonth()];
    const dayOfMonth = date.getDate();
    const formatTime = (time) => {
      const [hours, minutes] = time.split(":");
      const hour = parseInt(hours, 10);
      const ampm = hour >= 12 ? "PM" : "AM";
      const formattedHour = hour % 12 || 12;
      return `${formattedHour}:${minutes} ${ampm}`;
    };
    const startTime = formatTime(eventStartTime);
    const endTime = formatTime(eventEndTime);
    return `${dayOfWeek} • ${month} ${dayOfMonth}, ${startTime} - ${endTime}`;
  }

  return (
    <StyledCard>
      <HeaderBox ind={ind}>
        <Box>
          <Typography
            variant="h6"
            component="h2"
            sx={{
              fontSize: "18px",
              lineHeight: "28px",
              fontWeight: 600,
              textAlign: "left",
            }}
          >
            {cardDetail.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: "14px",
              lineHeight: "24px",
              fontWeight: 600,
              textAlign: "left",
            }}
          >
            {cardDetail.role}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: "14px",
              lineHeight: "24px",
              fontWeight: 600,
              textAlign: "left",
            }}
          >
            {cardDetail.company}
          </Typography>
        </Box>
        <StyledAvatar
          src={
            typeof cardDetail.profilePic === "string"
              ? cardDetail.profilePic
              : cardDetail.profilePic
              ? URL.createObjectURL(cardDetail.profilePic)
              : "/api/placeholder/60/60"
          }
          alt={cardDetail.name}
        />
      </HeaderBox>
      <CardContent
        sx={{
          paddingLeft: "20px",
          paddingRight: "20px",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="body2"
          color={CardColor(ind)}
          sx={{
            fontSize: "14px",
            lineHeight: "24px",
            fontWeight: 600,
            textAlign: "left",
          }}
        >
          {cardDetail.topic}
        </Typography>
        <Typography
          variant="h6"
          component="h3"
          color="#0E1013"
          sx={{
            fontSize: "18px",
            lineHeight: "28px",
            fontWeight: 600,
            textAlign: "left",
          }}
        >
          {cardDetail.eventTitle}
        </Typography>
        <Typography
          variant="body2"
          color="#2E333B"
          sx={{
            fontSize: "14px",
            lineHeight: "24px",
            fontWeight: 400,
            mb: 3,
            textAlign: "left",
          }}
        >
          {formatEventDateTime(
            cardDetail.eventDate,
            cardDetail.eventStartTime,
            cardDetail.eventEndTime
          )}
        </Typography>
        <Box
          sx={{
            display: "flex",
            marginTop: "auto",
            justifyContent: "flex-start",
            gap: 2,
          }}
        >
          <DeleteButton
            variant="contained"
            disableElevation
            onClick={() => {
              setOnDeleteCard(cardDetail.id);
            }}
          >
            Delete
          </DeleteButton>
          <EditButton
            onClick={() => {
              setOpenWebinarForm(true);
              setWebinarFormData(cardDetail);
            }}
          >
            Edit
          </EditButton>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default WebinarCard;
