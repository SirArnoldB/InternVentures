import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Box,
} from "@mui/material";
import EventsAPI from "../services/eventsapi";
import { eventTime } from "../utilities/eventTime";
import "../css/EventDetails.css";

const EventDetails = () => {
  const [event, setEvent] = useState({
    id: "",
    title: "",
    date: "",
    description: "",
    state_name: "",
    location: "",
    image_url: "",
  });

  const { id } = useParams();

  useEffect(() => {
    const fetchEvent = async () => {
      const data = await EventsAPI.getEvent(id);
      setEvent(data);
    };

    fetchEvent();
  }, [id]);

  return (
    <div>
      <main>
        <Card className="event-details">
          <CardMedia
            component="img"
            height="500"
            image={event.image_url}
            alt={event.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {event.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {event.description}
            </Typography>

            <Box sx={{ display: "flex", gap: "8px", marginTop: "2rem" }}>
              <Chip label={`Location: ${event.location}`} variant="outlined" />
              <Chip label={`State: ${event.state_name}`} variant="outlined" />
              <Chip
                label={`Date: ${eventTime(event.date)}`}
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default EventDetails;
