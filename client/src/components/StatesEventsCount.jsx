import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import PropTypes from "prop-types";

const StatesEventsCount = ({ statesEventsCount }) => {
  return (
    <div className="states">
      {statesEventsCount.map((state) => (
        <Card key={state.id} className="states-card">
          <CardMedia image={state.flag_url} title={state.name} />
          <CardContent>
            <Typography variant="h5">{state.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              Number of intern events: {state.event_count}
            </Typography>
          </CardContent>
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
