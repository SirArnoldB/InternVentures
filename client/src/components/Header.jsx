import { Typography, Button, Toolbar, AppBar } from "@mui/material";

const Header = () => {
  return (
    <header>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            InternVentures
          </Typography>
          <Button color="inherit">Home</Button>
          <Button color="inherit">Explore</Button>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
