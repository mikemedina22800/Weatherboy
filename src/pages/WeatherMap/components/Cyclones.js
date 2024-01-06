import { useState, useEffect } from "react";
import { fetchTCData } from "../../../api/aeris";
import { Marker, Popup, Polyline, Circle } from "react-leaflet";
import { divIcon } from "leaflet";
import "leaflet/dist/leaflet.css";

const Cyclones = () => {
  const [active, setActive] = useState(null)

  useEffect(() => {
    fetchTCData().then((data) => {
      setActive(data.response)
    })
  }, [])

  const stormIcon = (fill) => {
    return (
      new divIcon({
        className: 'bg-opacity-0',
        html: `<svg fill=${fill} xmlns="http://www.w3.org/2000/svg" viewBox="-50, -10, 450 530"><path stroke="black" stroke-width="10" d="M0 208C0 104.4 75.7 18.5 174.9 2.6C184 1.2 192 8.6 192 17.9V81.2c0 8.4 6.5 15.3 14.7 16.5C307 112.5 384 199 384 303.4c0 103.6-75.7 189.5-174.9 205.4c-9.2 1.5-17.1-5.9-17.1-15.2V430.2c0-8.4-6.5-15.3-14.7-16.5C77 398.9 0 312.4 0 208zm288 48A96 96 0 1 0 96 256a96 96 0 1 0 192 0zm-96-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>`,
        iconSize: [20, 20]
      })
    )
  }

  const circleIcon = (fill) => {
    return (
      new divIcon({
        className: 'bg-opacity-0',
        html: `<svg fill=${fill} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle stroke="black" stroke-width="10" cx="50" cy="50" r="40" /></svg>`,
        iconSize: [10, 10]
      })
    )
  }

  const fill = (type, windSpeed, stormName) => {
    if (type == 'TD') {
      if (stormName.includes('Subtropical')) {
        return 'aqua'
      } else {
        return 'blue'
      }
    } else if (type == 'TS') {
      if (stormName.includes('Subtropical')) {
        return 'lightgreen'
      } else {
        return 'lime'
      }
    } else if (type == 'H' || type == 'HU') {
       if (windSpeed < 95) {
        return 'yellow'
       } else if (windSpeed >= 95 && windSpeed < 115) {
        return 'orange'
       } else if (windSpeed >= 115 && windSpeed < 130) {
        return 'red'
       } else if (windSpeed >= 130 && windSpeed < 160) {
        return 'hotpink'
       } else {
        return 'pink'
       }
    } else {
      if (windSpeed >= 40 && type != 'WV' && type != 'DB') {
        return 'gray'
      } else {
        return 'lightgray'
      }
    }
  }

  const timeFormatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  const activeMap = active?.map((storm) => {
    const positions = []
    const latestTimestamp = storm.position.timestamp
    let radii
    if (storm.id.includes('AL')) {
      radii = [48152, 72228, 98156, 124084, 150012, 183348, 268540, 379660]
    } 
    if (storm.id.includes('EP')) {
      radii = [46300, 70376, 94452, 116676, 144456, 159272, 203720, 253724]
    } 
    if (storm.id.includes('CP')) {
      radii = [62968, 90748, 122232, 150012, 175940, 222240, 253724, 288912]
    } 
    
    const track = storm.track.map((point, index) => {
      const date = new Date(point.dateTimeISO)
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const formattedTime = timeFormatter.format(date)
      const coords = [point.loc.lat, point.loc.long]
      positions.push(coords)
      const type = point.details.stormType
      const windSpeed = point.details.windSpeed
      const stormName = point.details.stormName
      return (
        point.timestamp != latestTimestamp ? (
          <Marker opacity={.25} key={index} position={coords} icon={circleIcon(fill(type, windSpeed, stormName))}>
            <Popup className="w-64 font-bold">
              <h1 className="text-md">{stormName}</h1>
              <h1 className="my-1">{month}/{day}/{year} at {formattedTime} EST</h1>
              <h1>Max Wind: {windSpeed} mph</h1>
              <h1>Min Pressure: {point.details.pressureMB} mb</h1>
            </Popup>
          </Marker>
        ) : (
          <Marker key={index} position={coords} icon={stormIcon(fill(type, windSpeed, stormName))}>
            <Popup className="w-64 font-bold">
              <h1 className="text-md">{stormName}</h1>
              <h1 className="my-1">{month}/{day}/{year} at {formattedTime} EST</h1>
              <h1>Max Wind: {point.details.windSpeedMPH} mph</h1>
              <h1>Min Pressure: {point.details.pressureMB} mb</h1>
              <h1>Movement: {point.details.movement.direction} at {Math.round(point.details.movement.speedKTS * 1.15)} mph</h1>
            </Popup>
          </Marker>
        )
      )
    })
    
    const forecast = storm.forecast.map((point, index) => {
      const date = new Date(point.dateTimeISO)
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const formattedTime = timeFormatter.format(date)
      const coords = [point.loc.lat, point.loc.long]
      positions.push(coords)
      const type = point.details.stormType
      const windSpeed = point.details.windSpeed
      return (
        <div key={index}>
          <Marker position={coords} icon={circleIcon(fill(type, windSpeed))}>
            <Popup className="w-64 font-bold">
              <h1 className="text-md">{point.details.stormName}</h1>
              <h1 className="my-1">{month}/{day}/{year} at {formattedTime} EST</h1>
              <h1>Max Wind: {point.details.windSpeedMPH} mph</h1>
            </Popup>
          </Marker>
          <Circle center={coords} radius={radii[index]} color='gray' opacity={1} fillColor={'white'} fillOpacity={.25}/>
        </div>
      )   
    })
    
    return (
      <div key={storm.id}>
        <Polyline positions={positions} color="gray" opacity={.25}/>
        {track}
        {forecast}
      </div>
    )
  })

  
  return (
    <>{activeMap}</>
  )
}

export default Cyclones