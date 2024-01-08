import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { Checkbox, FormGroup, FormControlLabel, Tooltip, IconButton } from "@mui/material";
import { Close, Settings } from "@mui/icons-material";
import Cyclones from './components/Cyclones'
import "leaflet/dist/leaflet.css";

const WeatherMap = () => {
  const id = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

  const [clouds, setClouds] = useState(true)
  const [precipitation, setPrecipitation] = useState(true)
  const [wind, setWind] = useState(false)
  const [pressure, setPressure] = useState(false)
  const [temp, setTemp] = useState(false)
  const [cyclones, setCyclones] = useState(false)

  const [layers, setLayers] = useState(false)
  const [layersButton, setLayersButton] = useState(true)

  return (
    <div className="h-screen w-screen">
      <div className="z-10 fixed top-20 right-0 text-white">
        {layersButton && 
          <div className="m-5">
            <Tooltip title="Layers" placement="bottom" arrow>
              <IconButton onClick={() => {setLayersButton(false); setLayers(true)}}>
                <Settings className="!text-5xl"/>
              </IconButton>
            </Tooltip>
          </div>
        }
        {layers &&
          <div className="bg-black bg-opacity-50 p-5">
            <div className="flex justify-end">
              <IconButton onClick={() => {setLayers(false); setLayersButton(true)}}>
                <Close className="text-white"/>
              </IconButton>
            </div>
            <FormGroup>
              <FormControlLabel control={<Checkbox className="!text-white" checked={clouds} onChange={(e) => {setClouds(e.target.checked)}}/>} label="Clouds" />
              <FormControlLabel control={<Checkbox className="!text-white" checked={precipitation}  onChange={(e) => {setPrecipitation(e.target.checked)}}/>} label="Precipitation" />
              <FormControlLabel control={<Checkbox className="!text-white" checked={wind} onChange={(e) => {setWind(e.target.checked)}}/>} label="Wind" />
              <FormControlLabel control={<Checkbox className="!text-white" checked={pressure} onChange={(e) => {setPressure(e.target.checked)}}/>} label="Sea Level Pressure" />
              <FormControlLabel control={<Checkbox className="!text-white" checked={temp} onChange={(e) => {setTemp(e.target.checked)}}/>} label="Temperature" />
              <FormControlLabel control={<Checkbox className="!text-white" checked={cyclones} onChange={(e) => {setCyclones(e.target.checked)}}/>} label="Tropical Cyclones" />
            </FormGroup>
          </div>
        }
      </div>
      <MapContainer
        className="h-[calc(100%-5rem)] top-20 w-full fixed inset-0 pointer-events-auto"
        center={[30, -50]}
        maxBounds={[[90, 180], [-90, -180]]}
        maxZoom={15}
        minZoom={3}
        zoom={3}
      >
        <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {clouds && <TileLayer url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${id}`} />}
        {precipitation && <TileLayer url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${id}`}/>}
        {temp && <TileLayer url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${id}`}/>}
        {wind && <TileLayer url={`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${id}`}/>}      
        {pressure && <TileLayer url={`https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=${id}`}/>}
        {cyclones && <Cyclones/>}
      </MapContainer> 
    </div>
  );
};

export default WeatherMap;
