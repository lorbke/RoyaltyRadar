import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './tradeGraph.css';

const TradeGraph = ({ data }) => {
  const aggregatedData = data.reduce((result, entry) => {
    const weekNumber = new Date(entry.time).toLocaleDateString(undefined, { week: 'numeric' });
    if (!result[weekNumber]) {
      result[weekNumber] = 0;
    }
    result[weekNumber] += entry.activity;
    return result;
  }, {});

  const aggregatedChartData = Object.keys(aggregatedData).map((weekNumber) => ({
    time: `${weekNumber}`,
    activity: aggregatedData[weekNumber],
  }));

  return (
    <ResponsiveContainer width="100%" height={150}>
      <BarChart data={aggregatedChartData} aria-label="Trade Activity Over One Month">
        <XAxis dataKey="time" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Bar dataKey="activity" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TradeGraph;