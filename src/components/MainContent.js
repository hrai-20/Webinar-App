import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  InputAdornment,
  Box,
  IconButton,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import WebinarCard from "./WebinarCard";

const PartitionLine = styled("div")({
  width: "100%",
  height: "1px",
  backgroundColor: "#E3E7EC",
  marginBottom: "24px",
});

const Container = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "24px",
});

const SearchBar = styled(TextField)(({ theme }) => ({
  width: "350px",
  "& .MuiInputBase-root": {
    height: "48px",
  },
  "& .MuiInputLabel-root": {
    transform: "translate(40px, 14px) scale(1)",
    transition: theme.transitions.create(["transform", "font-size"], {
      duration: theme.transitions.duration.shorter,
      easing: theme.transitions.easing.easeOut,
    }),
  },
  "& .MuiInputLabel-root.Mui-focused, & .MuiInputLabel-root.MuiInputLabel-shrink": {
    transform: "translate(14px, -6px) scale(0.75)",
    backgroundColor: "white",
    padding: "0 4px",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
  },
  "& .MuiInputAdornment-root": {
    marginRight: "10px",
  },
}));

const DropdownMenu = styled(FormControl)({
  width: "150px",
  "& .MuiInputBase-root": {
    height: "48px",
  },
  "& .MuiInputLabel-root": {
    transform: "translate(14px, 14px) scale(1)",
    "&.Mui-focused, &.MuiInputLabel-shrink": {
      transform: "translate(14px, -6px) scale(0.75)",
    },
  },
  "& .MuiSelect-select": {
    display: "flex",
    alignItems: "center",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
  },
});

const CardGrid = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
  justifyContent: "flex-start",
  margin: "0 auto",
  width: "100%",
  padding: "0 0px 40px 0px",
  boxSizing: "border-box",
}));

const CardWrapper = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  flexBasis: "calc(33.333% - 20px)",
  maxWidth: "calc(33.333% - 20px)",
  "&:nth-of-type(3n)": {
    marginRight: 0,
  },
  [theme.breakpoints.down("md")]: {
    flexBasis: "calc(50% - 10px)",
    maxWidth: "calc(50% - 10px)",
    "&:nth-of-type(2n)": {
      marginRight: 0,
    },
  },
  [theme.breakpoints.down("sm")]: {
    flexBasis: "100%",
    maxWidth: "100%",
    marginRight: 0,
  },
}));

const MainContent = ({
  eventData,
  setEventData,
  setWebinarFormData,
  setOpenWebinarForm,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [filteredEvent, setFilteredEvent] = useState(eventData);

  const uniqueTopics = [...new Set(eventData.map((event) => event.topic))];

  useEffect(() => {
    const filtered = eventData.filter((event) => {
      const matchesSearch = event.eventTitle
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesTopic =
        selectedTopic === "" || event.topic === selectedTopic;
      return matchesSearch && matchesTopic;
    });
    setFilteredEvent(filtered);
  }, [searchQuery, selectedTopic, eventData]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleOptionChange = (event) => {
    setSelectedTopic(event.target.value);
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
  };

  const handleClear = () => {
    setSelectedTopic("");
  };

  const setOnDeleteCard = (id) => {
    const updatedEventData = eventData.filter((event) => event.id !== id);
    setEventData(updatedEventData);
  };

  return (
    <div style={{ margin: "0 20px" }}>
      <PartitionLine />
      <Container>
        <SearchBar
          label="Search for Webinar"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={handleSearchFocus}
          onBlur={handleSearchBlur}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          InputLabelProps={{
            shrink: isSearchFocused || searchQuery.length > 0,
          }}
        />
        <DropdownMenu variant="outlined">
          <InputLabel>Topic</InputLabel>
          <Select
            value={selectedTopic}
            onChange={handleOptionChange}
            label="Topic"
            endAdornment={
              selectedTopic ? (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClear}
                    edge="end"
                    size="small"
                    sx={{ mr: 2 }}
                  >
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ) : null
            }
          >
            {uniqueTopics.map((topic, index) => (
              <MenuItem key={index} value={topic}>
                {topic}
              </MenuItem>
            ))}
          </Select>
        </DropdownMenu>
      </Container>
      <CardGrid>
        {filteredEvent.map((event, ind) => (
          <CardWrapper key={event.id}>
            <WebinarCard
              cardDetail={event}
              ind={ind}
              setOnDeleteCard={setOnDeleteCard}
              setOpenWebinarForm={setOpenWebinarForm}
              setWebinarFormData={setWebinarFormData}
            />
          </CardWrapper>
        ))}
      </CardGrid>
    </div>
  );
};

export default MainContent;
