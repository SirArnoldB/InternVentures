import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  Chip,
} from "@mui/material";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const StatesEventsCount = ({ statesEventsCount }) => {
  return (
    <div className="states">
      {statesEventsCount.map((state) => (
        <Card key={state.id} className="states-card">
          <CardMedia
            component="img"
            image={state.flag_url}
            title={state.name}
            sx={{ maxWidth: 345, maxHeight: 400 }}
          />
          <CardContent>
            <Typography variant="h5">{state.name}</Typography>
            <Chip
              label={`Number of intern events: ${state.event_count}`}
              variant="outlined"
              sx={{ marginTop: "1rem" }}
            />
          </CardContent>
          <CardActions>
            <Link to={`/states_events/${state.name}`}>
              <Button size="small">Explore</Button>
            </Link>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

StatesEventsCount.propTypes = {
  statesEventsCount: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      flag_url: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      event_count: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default StatesEventsCount;
