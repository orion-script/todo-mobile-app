import React, { useEffect, useState } from "react";
import Svg, { Circle, Line, Text as SvgText } from "react-native-svg";

export const AnalogClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours() % 12;

  const secondDegrees = (seconds / 60) * 360;
  const minuteDegrees = (minutes / 60) * 360 + (seconds / 60) * 6;
  const hourDegrees = (hours / 12) * 360 + (minutes / 60) * 30;

  const clockRadius = 90;
  const center = 100;
  const hourLength = 40;
  const minuteLength = 60;
  const secondLength = 80;

  const numbers = Array.from({ length: 12 }, (_, i) => i + 1);
  const numberRadius = 70;

  // Format the date string
  const dateString = time.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Svg height="200" width="200" viewBox="0 0 200 200">
      {/* Shadow circle behind the clock */}
      <Circle
        cx={center}
        cy={center}
        r={clockRadius + 5}
        fill="rgba(0, 0, 0, 0.2)"
      />

      {/* Actual clock circle */}
      <Circle
        cx={center}
        cy={center}
        r={clockRadius}
        stroke="black"
        strokeWidth="2"
        fill="white"
      />

      {/* Clock Numbers */}
      {numbers.map((number, index) => {
        const angle = (index + 1) * 30;
        const x = center + numberRadius * Math.sin((angle * Math.PI) / 180);
        const y = center - numberRadius * Math.cos((angle * Math.PI) / 180);
        return (
          <SvgText
            key={number}
            x={x}
            y={y}
            fontSize="16"
            textAnchor="middle"
            alignmentBaseline="middle"
            fill="black"
          >
            {number}
          </SvgText>
        );
      })}

      {/* Second hand */}
      <Line
        x1={center}
        y1={center}
        x2={center + secondLength * Math.sin((secondDegrees * Math.PI) / 180)}
        y2={center - secondLength * Math.cos((secondDegrees * Math.PI) / 180)}
        stroke="red"
        strokeWidth="2"
      />

      {/* Minute hand */}
      <Line
        x1={center}
        y1={center}
        x2={center + minuteLength * Math.sin((minuteDegrees * Math.PI) / 180)}
        y2={center - minuteLength * Math.cos((minuteDegrees * Math.PI) / 180)}
        stroke="black"
        strokeWidth="3"
      />

      {/* Hour hand */}
      <Line
        x1={center}
        y1={center}
        x2={center + hourLength * Math.sin((hourDegrees * Math.PI) / 180)}
        y2={center - hourLength * Math.cos((hourDegrees * Math.PI) / 180)}
        stroke="black"
        strokeWidth="4"
      />

      {/* Date text in the center */}
      <SvgText
        x={center}
        y={center + 30} // Slightly below the center
        fontSize="10"
        textAnchor="middle"
        alignmentBaseline="middle"
        fill="black"
      >
        {dateString}
      </SvgText>
    </Svg>
  );
};
