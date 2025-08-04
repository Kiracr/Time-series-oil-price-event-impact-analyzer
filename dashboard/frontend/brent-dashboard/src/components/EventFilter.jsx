import React from "react";

function EventFilter({ events, selectedId, onSelect }) {
  return (
    <div>
      <h3>Filter Events</h3>
      <select
        value={selectedId || ""}
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="">Select an event</option>
        {events.map((event) => (
          <option key={event.id} value={event.id}>
            {event.Event} ({new Date(event.Date).toLocaleDateString()})
          </option>
        ))}
      </select>
    </div>
  );
}

export default EventFilter;
