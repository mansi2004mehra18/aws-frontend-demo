import React, { useEffect, useState } from "react";
import HeatMap from "@uiw/react-heat-map";

// Generate activity data between two dates
const generateActivityData = (startDate, endDate) => {
  const data = [];
  let currentDate = new Date(startDate);
  const end = new Date(endDate);

  while (currentDate <= end) {
    const count = Math.floor(Math.random() * 50);
    data.push({
      date: currentDate.toISOString().split("T")[0], // Format: YYYY-MM-DD
      count,
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return data;
};

// Dynamic green-based heatmap colors
const getPanelColors = (maxCount) => {
  const colors = {};
  for (let i = 0; i <= maxCount; i++) {
    const green = Math.floor((i / maxCount) * 200) + 50;
    colors[i] = `rgb(0, ${green}, 0)`;
  }
  return colors;
};

const HeatMapProfile = () => {
  const [activityData, setActivityData] = useState([]);
  const [panelColors, setPanelColors] = useState({});

  useEffect(() => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 90); // Last 90 days

    const data = generateActivityData(startDate, endDate);
    setActivityData(data);

    const maxCount = Math.max(...data.map((d) => d.count), 1); // Avoid 0
    setPanelColors(getPanelColors(maxCount));
  }, []);

  return (
    <div style={{ padding: "1rem", color: "white" }}>
      <h3 style={{ marginBottom: "1rem" }}>Recent Contributions</h3>
      <HeatMap
        value={activityData}
        startDate={new Date(activityData[0]?.date)}
        rectSize={15}
        space={3}
        weekLabels={["S", "M", "T", "W", "T", "F", "S"]}
        monthLabels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]}
        rectProps={{ rx: 2.5 }}
        panelColors={panelColors}
        tooltip={(d) => `${d.date} - ${d.count} activities`}
      />
    </div>
  );
};

export default HeatMapProfile;