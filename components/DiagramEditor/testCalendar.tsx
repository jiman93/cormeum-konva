import React, { useState } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';

const Calendar = () => {
  const [selected, setSelected] = useState(null);

  const handleClick = (day: any) => {
    setSelected(day);
  };

  const calendarData = [
    { day: 'Mon', commits: 3, issues: 2 },
    { day: 'Tue', commits: 1, issues: 4 },
    { day: 'Wed', commits: 5, issues: 1 },
    { day: 'Thu', commits: 2, issues: 0 },
    { day: 'Fri', commits: 0, issues: 1 },
    { day: 'Sat', commits: 0, issues: 0 },
    { day: 'Sun', commits: 0, issues: 0 },
  ];

  return (
    <Stage width={600} height={200}>
      <Layer>
        {calendarData.map((data, index) => (
          <Rect
            key={index}
            x={index * 80}
            y={0}
            width={80}
            height={80}
            fill={selected === data.day ? 'green' : 'white'}
            onClick={() => handleClick(data.day)}
          />
        ))}
        {calendarData.map((data, index) => (
          <Text
            key={index}
            x={index * 80 + 20}
            y={20}
            text={data.day}
            fontSize={16}
            fontFamily="Arial"
          />
        ))}
        {calendarData.map((data, index) => (
          <Text
            key={index}
            x={index * 80 + 20}
            y={50}
            text={`${data.commits} commits`}
            fontSize={12}
            fontFamily="Arial"
          />
        ))}
        {calendarData.map((data, index) => (
          <Text
            key={index}
            x={index * 80 + 20}
            y={65}
            text={`${data.issues} issues`}
            fontSize={12}
            fontFamily="Arial"
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default Calendar;
``;
