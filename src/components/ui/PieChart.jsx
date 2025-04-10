// components/PieChartComponent.jsx
'use client';

import { PieChart, Pie, Cell, Tooltip, } from 'recharts';

const data = [
  { name: 'Overdue books', value: 5 },
  { name: 'Near-due books', value: 7 },
  { name: 'Later due books', value: 12 },
];

const COLORS = ['#ff0000', '#800080', '#00D500', ];

export default function PieChartComponent() {
  return (
    <div className="flex text-xs justify-center items-center h-96">
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={true}
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }
          outerRadius={110}
          fill="#8884d8"
          dataKey="value"
          isAnimationActive={false} 
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip className="text-sm" />
        {/* <Legend /> */}
      </PieChart>
    </div>
  );
}
