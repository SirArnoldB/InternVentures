import { useState, useEffect } from "react";
import { Tabs, Tab } from "@mui/material";
import TabPanel from "./TabPanel";
import StatesEventsCount from "./StatesEventsCount";
import Events from "./Events";
import Landing from "./Landing";
import EventsAPI from "../services/eventsapi";

const Home = () => {
  const [value, setValue] = useState(0);
  const [eventsValue, setEventsValue] = useState(0);
  const [allEvents, setAllEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [stateEvents, setStateEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await EventsAPI.getAllEvents();

        console.log(data);

        // set all events
        setAllEvents(data);

        // set upcoming events
        const upcomingEvents = data.filter((event) => {
          return new Date(event.date) > new Date();
        });

        setUpcomingEvents(upcomingEvents);

        // set past events
        const pastEvents = data.filter((event) => {
          return new Date(event.date) < new Date();
        });

        setPastEvents(pastEvents);
      } catch (err) {
        console.log(err);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchStateEvents = async () => {
      try {
        const data = await EventsAPI.getStatesEventsCount();

        console.log(data);

        setStateEvents(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchStateEvents();
  }, []);

  const handleEventsValueChange = (event, newValue) => {
    setEventsValue(newValue);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Landing />
      <main>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="States" />
          <Tab label="Events" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <StatesEventsCount statesEventsCount={stateEvents} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Tabs value={eventsValue} onChange={handleEventsValueChange}>
            <Tab label="All" />
            <Tab label="Upcoming" />
            <Tab label="Past" />
          </Tabs>
          <TabPanel value={eventsValue} index={0}>
            <Events events={allEvents} />
          </TabPanel>
          <TabPanel value={eventsValue} index={1}>
            <Events events={upcomingEvents} />
          </TabPanel>
          <TabPanel value={eventsValue} index={2}>
            <Events events={pastEvents} />
          </TabPanel>
        </TabPanel>
      </main>
    </>
  );
};

export default Home;
