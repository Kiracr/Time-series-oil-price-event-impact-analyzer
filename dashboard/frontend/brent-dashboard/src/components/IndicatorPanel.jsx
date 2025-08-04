import React from "react";

function IndicatorPanel({ indicators }) {
  return (
    <div
      style={{
        margin: "20px 0",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h3>Key Indicators</h3>
      <p>
        <strong>Volatility:</strong> {indicators.volatility?.toFixed(4)}
      </p>
      <p>
        <strong>Average Price Change:</strong>{" "}
        {indicators.avg_price_change?.toFixed(4)}
      </p>
    </div>
  );
}

export default IndicatorPanel;
