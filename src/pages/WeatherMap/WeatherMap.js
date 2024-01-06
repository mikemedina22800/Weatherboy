import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const WeatherMap = () => {
  const id = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

  return (
    <MapContainer
      className="h-[calc(100vh-5rem)] mt-20 w-screen -z-10 absolute inset-0 pointer-events-auto"
      center={[30, -50]}
      maxZoom={15}
      minZoom={3}
      zoom={3}
    >
      <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <TileLayer url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${id}`} />
      <TileLayer url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${id}`}/>
    </MapContainer>
  );
};

export default WeatherMap;
