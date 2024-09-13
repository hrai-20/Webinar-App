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

const PartitionLine = styled("hr")({
  border: "none",
  borderTop: "2px solid #ccc",
});

const Container = styled("div")({
  padding: "20px 0",
  display: "flex",
  justifyContent: "space-between",
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
  width: "200px",
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

const MainContent = ({
  eventData,
  setEventData,
  setWebinarFormData,
  setOpenWebinarForm,
}) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedTopic, setSelectedTopic] = React.useState("");
  const [isSearchFocused, setIsSearchFocused] = React.useState(false);
  const [filteredEvent, setFilteredEvent] = useState(eventData);
  const [onDeleteCard, setOnDeleteCard] = useState();
  const uniqueTopics = [...new Set(eventData.map((item) => item.topic))];

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

  const handleClear = (event) => {
    event.stopPropagation();
    setSelectedTopic("");
  };

  useEffect(() => {
    if (selectedTopic === "") {
      setFilteredEvent(eventData);
    } else {
      const tmpData = eventData.filter((item) => item.topic === selectedTopic);
      setFilteredEvent(tmpData);
    }
  }, [selectedTopic]);

  useEffect(() => {
    if (searchQuery.length < 3) {
      setFilteredEvent(eventData);
    } else {
      const tmpData = eventData.filter((item) => {
        const query = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(query) ||
          item.role.toLowerCase().includes(query) ||
          item.company.toLowerCase().includes(query) ||
          item.topic.toLowerCase().includes(query) ||
          item.eventTitle.toLowerCase().includes(query)
        );
      });
      setFilteredEvent(tmpData);
    }
  }, [searchQuery]);

  useEffect(() => {
    setEventData(eventData.filter((item) => item.id !== onDeleteCard));
    setFilteredEvent(filteredEvent.filter((item) => item.id !== onDeleteCard));
  }, [onDeleteCard]);

  useEffect(() => {
    setFilteredEvent(eventData);
  }, [eventData]);

  return (
    <div style={{ maxWidth: "90vw", margin: "auto" }}>
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
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          columnGap: 12.95,
        }}
      >
        {filteredEvent.map((event, ind) => (
          <WebinarCard
            cardDetail={event}
            key={ind}
            ind={ind}
            setOnDeleteCard={setOnDeleteCard}
            setOpenWebinarForm={setOpenWebinarForm}
            setWebinarFormData={setWebinarFormData}
          />
        ))}
      </Box>
    </div>
  );
};

export default MainContent;
