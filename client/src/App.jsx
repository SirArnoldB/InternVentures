import { useRoutes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Header from "./components/Header";
import StateEvents from "./pages/StateEvents";
import EventDetails from "./pages/EventDetails";

function App() {
  // Set up routes
  let element = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/events/:id",
      element: <EventDetails />,
    },
    {
      path: "/states_events/:state",
      element: <StateEvents />,
    },
  ]);

  return (
    <div className="App">
      <Header />
      {element}
    </div>
  );
}

export default App;
