import { useEffect, useState } from "react";
import { Tabs, Tab } from "@mui/material";
import Events from "./components/Events";
import StatesEventsCount from "./components/StatesEventsCount";
import "./App.css";
import Header from "./components/Header";
import Landing from "./components/Landing";
import TabPanel from "./components/TabPanel";

function App() {
  const [value, setValue] = useState(0);
  const [eventsValue, setEventsValue] = useState(0);
  const [allEvents, setAllEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [stateEvents, setStateEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch("http://localhost:3000/events");
      const data = await res.json();

      console.log(data);

      // set all events
      setAllEvents(data);

      // event date format: 2022-05-31

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
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchStateEvents = async () => {
      const res = await fetch("http://localhost:3000/events/state_event_count");
      const data = await res.json();

      setStateEvents(data);
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
    <div className="App">
      <Header />
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
    </div>
  );
}

export default App;
