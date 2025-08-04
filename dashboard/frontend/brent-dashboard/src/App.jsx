import React, { useEffect, useState } from "react";
import axios from "axios";
import PriceTrendChart from "./components/PriceTrendChart";
import EventImpactChart from "./components/EventImpactChart";
import EventFilter from "./components/EventFilter";
import IndicatorPanel from "./components/IndicatorPanel";

function App() {
  const [prices, setPrices] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [highlight, setHighlight] = useState({ event: null, prices: [] });
  const [indicators, setIndicators] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/prices")
      .then((res) => setPrices(res.data));
    axios
      .get("http://localhost:5000/api/events")
      .then((res) => setEvents(res.data));
    axios
      .get("http://localhost:5000/api/indicators")
      .then((res) => setIndicators(res.data));
  }, []);

  useEffect(() => {
    if (selectedEventId !== null && selectedEventId !== "") {
      axios
        .get(`http://localhost:5000/api/highlight?id=${selectedEventId}`)
        .then((res) => setHighlight(res.data));
    } else {
      setHighlight({ event: null, prices: [] });
    }
  }, [selectedEventId]);

  return (
    <div
      style={{
        background: "#fff",
        minHeight: "100vh",
        minWidth: "100vw",
        width: "100vw",
        height: "100vh",
        fontFamily: "Segoe UI, Arial, sans-serif",
        overflowX: "hidden",
      }}
    >
      <div
        style={{ width: "100%", maxWidth: 1400, margin: "0 auto", padding: 32 }}
      >
        <h1
          style={{
            textAlign: "center",
            fontWeight: 700,
            fontSize: 38,
            marginBottom: 36,
            letterSpacing: 1,
            color: "#222",
          }}
        >
          Brent Oil Price Dashboard
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 36,
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
              padding: 32,
              minWidth: 340,
              border: "1px solid #e0e0e0",
              display: "flex",
              color: "#000",
              width: "100%",
            
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <IndicatorPanel indicators={indicators} />
          </div>
        </div>
        <div style={{ marginBottom: 48 }}>
          <h2
            style={{
              fontWeight: 600,
              fontSize: 26,
              marginBottom: 18,
              color: "#222",
            }}
          >
            Brent Oil Price Trend
          </h2>
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              padding: 32,
              border: "1px solid #e0e0e0",
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            }}
          >
            <PriceTrendChart data={prices} />
          </div>
        </div>
        <div style={{ display: "flex", gap: 36 }}>
          <div style={{ flex: 1 }}>
            <h2
              style={{
                fontWeight: 600,
                fontSize: 22,
                marginBottom: 14,
                color: "#222",
              }}
            >
              Filter Events
            </h2>
            <div
              style={{
                background: "#fff",
                borderRadius: 16,
                padding: 32,
                border: "1px solid #e0e0e0",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              }}
            >
              <EventFilter
                events={events}
                selectedId={selectedEventId}
                onSelect={setSelectedEventId}
              />
            </div>
          </div>
          <div style={{ flex: 2 }}>
            <div
              style={{
                background: "#fff",
                borderRadius: 16,
                padding: 32,
                border: "1px solid #e0e0e0",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                minHeight: 350,
              }}
            >
              <EventImpactChart
                event={highlight.event}
                prices={highlight.prices}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
