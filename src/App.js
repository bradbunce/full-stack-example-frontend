import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import nodejsLogo from "./img/nodejsLogo.svg";
import ldLogo from "./img/ldLogo_gray.svg";
import ClientLogo from "./components/clientLogo";

function App() {
  const [logos, setLogos] = useState([]);
  const [listening, setListening] = useState(false);
  let logo;

  useEffect(() => {
    if (!listening) {
      const events = new EventSource('http://localhost:3001/events');

      events.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);

        setLogos(function (logos) {
          logos = parsedData;
          return logos;
        });
      };

      setListening(true);
    }
  }, [listening, logos]);

  if (logos.source === "TRUE") {
    logo = nodejsLogo;
  } else {
    logo = ldLogo;
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <p><b>React Web</b> client-side feature flag</p>
          <ClientLogo />
        </header>
        <br></br>
        <header className="App-header">
          <p><b>Node.js</b> server-side feature flag</p>
          <img src={logo} className="App-logo" alt="" />
          <p>{logos.info} <b>{logos.source}</b></p>
        </header>
      </div>
    </Router>
  );
}

export default App;
