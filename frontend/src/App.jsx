import { useEffect, useState } from "react";
import { getDates } from "./services/api";

function App() {
  const [dates, setDates] = useState([]);

  useEffect(() => {
    getDates().then(setDates);
  }, []);

  return (
    <div>
      <h1>Pilates Booking</h1>
      {dates.map(d => (
        <button key={d}>{d}</button>
      ))}
    </div>
  );
}

export default App;