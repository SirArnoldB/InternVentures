import { useEffect, useState } from "react";
import { Tabs, Tab } from "@mui/material";
import Events from "../components/Events";
import TabPanel from "../components/TabPanel";
import { useParams } from "react-router-dom";
import EventsAPI from "../services/eventsapi";
import "../App.css";

const StateEvents = () => {
  const [eventsValue, setEventsValue] = useState(0);
  const [allEvents, setAllEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const { state } = useParams();

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await EventsAPI.getStateEvents(state);

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
    };

    fetchEvents();
  }, [state]);

  const handleEventsValueChange = (event, newValue) => {
    setEventsValue(newValue);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="state-events"
    >
      <main>
        <h1>{state} Events</h1>
        <Tabs value={eventsValue} onChange={handleEventsValueChange}>
          <Tab label="All Events" />
          <Tab label="Upcoming Events" />
          <Tab label="Past Events" />
        </Tabs>
        <TabPanel value={eventsValue} index={0}>
          {allEvents?.length > 0 ? (
            <Events events={allEvents} />
          ) : (
            <div className="events">No Events Found</div>
          )}
        </TabPanel>
        <TabPanel value={eventsValue} index={1}>
          {upcomingEvents?.length > 0 ? (
            <Events events={upcomingEvents} />
          ) : (
            <div className="events">No Events Found</div>
          )}
        </TabPanel>
        <TabPanel value={eventsValue} index={2}>
          {pastEvents?.length > 0 ? (
            <Events events={pastEvents} />
          ) : (
            <div className="events">No Events Found</div>
          )}
        </TabPanel>
      </main>
    </div>
  );
};

export default StateEvents;
