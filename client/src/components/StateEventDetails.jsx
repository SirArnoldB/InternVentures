import { useState } from "react";
import {
  Tabs,
  Tab,
  Typography,
  Button,
  Toolbar,
  AppBar,
  Box,
} from "@mui/material";
import Events from "./Events";

const StateEventDetails = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const allEvents = [
    {
      id: 1,
      image: "https://picsum.photos/200",
      name: "Event 1",
      description: "This is the description for event 1",
    },
    {
      id: 2,
      image: "https://picsum.photos/200",
      name: "Event 2",
      description: "This is the description for event 2",
    },
    {
      id: 3,
      image: "https://picsum.photos/200",
      name: "Event 3",
      description: "This is the description for event 3",
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      image: "https://picsum.photos/200",
      name: "Event 1",
      description: "This is the description for event 1",
    },
    {
      id: 2,
      image: "https://picsum.photos/200",
      name: "Event 2",
      description: "This is the description for event 2",
    },
    {
      id: 3,
      image: "https://picsum.photos/200",
      name: "Event 3",
      description: "This is the description for event 3",
    },
  ];

  const pastEvents = [
    {
      id: 1,
      image: "https://picsum.photos/200",
      name: "Event 1",
      description: "This is the description for event 1",
    },
    {
      id: 2,
      image: "https://picsum.photos/200",
      name: "Event 2",
      description: "This is the description for event 2",
    },
    {
      id: 3,
      image: "https://picsum.photos/200",
      name: "Event 3",
      description: "This is the description for event 3",
    },
  ];

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  return (
    <div className="App">
      <header>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div">
              InternVentures
            </Typography>
            <Button color="inherit">Home</Button>
            <Button color="inherit">Explore</Button>
          </Toolbar>
        </AppBar>
      </header>

      <h1>Welcome to InternVentures</h1>

      <h2>
        InternVentures is your ultimate companion for interns seeking adventure
        and connection. Our platform connects interns from various companies
        across different cities, fostering a vibrant community of like-minded
        individuals.
      </h2>

      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="All Events" />
        <Tab label="Upcoming Events" />
        <Tab label="Past Events" />
      </Tabs>

      <TabPanel value={value} index={0}>
        <Events events={allEvents} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Events events={upcomingEvents} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Events events={pastEvents} />
      </TabPanel>
    </div>
  );
};

export default StateEventDetails;
