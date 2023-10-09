import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  Box,
  Chip,
} from "@mui/material";
import { Link } from "react-router-dom";
import { eventTime } from "../utilities/eventTime";

const Events = ({ events }) => {
  return (
    <div className="events">
      {events.map((event) => (
        <Card
          key={event.id}
          className="event-card"
          sx={{ maxWidth: 345, display: "flex" }}
        >
          <CardMedia
            component="img"
            image={event.image_url}
            title={event.title}
            sx={{ height: 140, objectFit: "fill" }}
          />
          <CardContent>
            <Typography variant="h5">{event.title}</Typography>
            <Typography
              sx={{
                marginTop: "1rem",
                marginBottom: "1rem",
              }}
              variant="body2"
              color="text.secondary"
            >
              {event.description}
            </Typography>
            <Box
              sx={{
                gap: "8px",
                marginTop: "2rem",
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              <Chip label={`Location: ${event.location}`} variant="outlined" />
              <Chip label={`State: ${event.state_name}`} variant="outlined" />
              <Chip
                label={`Date: ${eventTime(event.date)}`}
                variant="outlined"
              />
            </Box>
          </CardContent>
          <CardActions>
            <Link to={`/events/${event.id}`}>
              <Button size="small">Learn More</Button>
            </Link>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

Events.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      state_name: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      image_url: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Events;
