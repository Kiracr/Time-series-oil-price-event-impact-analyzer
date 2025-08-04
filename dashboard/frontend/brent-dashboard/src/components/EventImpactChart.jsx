import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function EventImpactChart({ event, prices }) {
  return (
    <div>
      <h2>Event Impact: {event ? event.Event : "Select an Event"}</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={prices}>
          <XAxis
            dataKey="Date"
            tickFormatter={(date) => new Date(date).toLocaleDateString()}
          />
          <YAxis />
          <Tooltip
            labelFormatter={(date) => new Date(date).toLocaleDateString()}
          />
          <Line type="monotone" dataKey="Price" stroke="#e53935" />
        </LineChart>
      </ResponsiveContainer>
      {event && (
        <p>
          <strong>Description:</strong> {event.Description}
        </p>
      )}
    </div>
  );
}

export default EventImpactChart;
