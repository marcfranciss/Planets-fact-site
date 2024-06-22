// import { useState } from "react";
import { useState } from "react";
import planets from "./assets/planets";
import { Content } from "./components/Content";
import { Nav } from "./components/Nav";

function App() {
  const [planetName, setPlanetName] = useState<string>("Mercury");

  const sendPlanetName = (data: string) => {
    setPlanetName(data);
  };

  return (
    <>
      <Nav planets={planets} sendPlanetName={sendPlanetName} />
      <Content planets={planets} recievedPlanetName={planetName} />
    </>
  );
}

export default App;
