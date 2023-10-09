import { Typography, Button, Toolbar, AppBar } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <AppBar
      position="static"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Toolbar>
        <Typography variant="h6" component="div">
          InternVentures
        </Typography>
        <Link to="/">
          <Button color="inherit">Home</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
