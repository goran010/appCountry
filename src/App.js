import React from "react";
import Header from "./Components/Header";
import Maincontent from "./Components/Maincontent";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

function App() {
  const [toggle, setToggle] = React.useState(true);
  return (
    <div className="App">
      <Header toggle={toggle} setToggle={setToggle} />
      <Maincontent toggle={toggle} setToggle={setToggle} />
    </div>
  );
}

export default App;
