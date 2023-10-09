import { Typography } from "@mui/material";
import "../css/Landing.css";

const Landing = () => {
  return (
    <div className="landing">
      <Typography variant="h4" gutterBottom>
        Welcome to InternVentures!
      </Typography>
      <Typography variant="body1" gutterBottom>
        InternVentures is your ultimate companion for interns seeking adventure
        and connection. Our platform connects interns from various companies
        across different cities, fostering a vibrant community of like-minded
        individuals.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Start exploring!
      </Typography>
    </div>
  );
};

export default Landing;
