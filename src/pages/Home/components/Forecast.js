import { useState, useEffect } from "react";
import '../../../weather-icons-master/css/weather-icons.css'

const Forecast = ({ location, forecast, timeZone, weatherIcon }) => {
  const [days, setDays] = useState([]);

  const today = new Date().getDay();

  const dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  useEffect(() => {
    const updatedDays = [[], [], [], [], [], [], []];
    forecast.forEach((hour) => {
      const day = new Date(hour.startTime).getDay()
      const diffDays = (day  - today + 7) % 7;
      const startTime = new Date(hour.startTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true, timeZone: timeZone})
      const endTime = new Date(hour.endTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true, timeZone: timeZone})
      if (today == day && new Date().getHours() > new Date(hour.startTime).getHours()) {
      } else {
        updatedDays[diffDays].push(
          <div className="flex flex-col m-2 h-40 w-60 p-4 bg-blue-900 rounded-xl" key={hour.startTime}>
            <h1>{startTime}-{endTime}</h1>
            <div className="flex items-center my-2">
              <i className={`wi text-xs mr-1 ${weatherIcon(hour.icon)}`}/>
              <h1>{hour.shortForecast.replace('Chance', 'Chance of')}</h1>
            </div>
            <h1>Temperature: {hour.temperature}°F</h1>
            <h1>Wind: {hour.windDirection} at {hour.windSpeed}</h1>
            <h1>Humidity: {hour.relativeHumidity.value}%</h1>
            <h1>Chance of Rain: {hour.probabilityOfPrecipitation.value}%</h1>
          </div>
        );
      }
    });
    setDays(updatedDays);
  }, [forecast]);

  const currentDayNames = []

  return (
    <div className="w-screen flex flex-col items-center mt-10">
      <h1 className="text-xl my-5 sm:my-10">Forecast for {location}</h1>
      <div className="w-full flex sm:flex-row justify-between flex-col overflow-x-auto px-10">
        {days.map((day, i) => {
          const dayName = dayNames[(today + i) % 7]
          currentDayNames.push(dayNames[(today + i) % 7])
          return (
            <div className="flex flex-col items-center" key={i}>
              <h1 className="my-2" id={dayName}>{dayName}</h1>
              <div className="flex flex-col text-xs">
                {day.map((hour) => hour)}
              </div>
            </div>
          )
        })}
      </div>
      <div className="fixed px-5 w-screen text-xl bg-purple-950 bottom-0 flex justify-between sm:hidden py-2">
        {currentDayNames.map((day, i) => {
          return (
            <h1 className="cursor-pointer hover:text-[aqua]" onClick={() => {document.getElementById(day).scrollIntoView({ behavior: 'auto', block: 'center'})}} key={i}>{day.substring(0,3)}</h1>
          )
        })}
      </div>
    </div>
  );
};

export default Forecast;