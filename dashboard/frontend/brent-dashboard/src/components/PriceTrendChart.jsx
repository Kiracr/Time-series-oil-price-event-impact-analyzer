import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function PriceTrendChart({ data }) {
  return (
    <div>
      <h2>Brent Oil Price Trend</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis
            dataKey="Date"
            tickFormatter={(date) => new Date(date).toLocaleDateString()}
          />
          <YAxis />
          <Tooltip
            labelFormatter={(date) => new Date(date).toLocaleDateString()}
          />
          <Line type="monotone" dataKey="Price" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PriceTrendChart;
