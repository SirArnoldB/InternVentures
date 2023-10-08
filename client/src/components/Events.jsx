import PropTypes from "prop-types";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const Events = ({ events }) => {
  return (
    <div className="events">
      {events.map((event) => (
        <Card key={event.id} className="event-card">
          <CardMedia image={event.image_url} title={event.title} />
          <CardContent>
            <Typography variant="h5" component="div">
              {event.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {event.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {event.date}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {event.location}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {event.state_name}
            </Typography>
          </CardContent>
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
