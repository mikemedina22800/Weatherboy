import { useState, useEffect } from "react";
import { Circle, MapContainer, Polyline, TileLayer, Popup, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { divIcon } from "leaflet";
import { fetchTCData, fetchTCArchive } from "../api/aeris";
import { Select, MenuItem } from "@mui/material";


const Cyclopedia = () => {
  const [active, setActive] = useState(null)
  const [alArchive, setAlArchive] = useState(null)
  const [epArchive, setEpArchive] = useState(null)
  const [cpArchive, setCpArchive] = useState(null)
  const [year, setYear] = useState(0)

  useEffect(() => {
    fetchTCData().then((data) => {
      setActive(data.response)
    })
  }, [])
  
  useEffect(() => {
    if (year != 0) {
      fetchTCArchive({year, basin:'al'}).then((data) => {
        setAlArchive(data.response)
        console.log(data.response)
      })
      fetchTCArchive({year, basin:'ep'}).then((data) => {
        setEpArchive(data.response)
        console.log(data.response)
      })
      fetchTCArchive({year, basin:'cp'}).then((data) => {
        setCpArchive(data.response)
        console.log(data.response)
      })
    }
  }, [year])

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

  const fill = (type, windSpeed) => {
    if (type == 'TD') {
      return 'blue'
    } else if (type == 'SD') {
      return 'aqua'
    } else if (type == 'TS') {
      return 'lime'
    } else if (type == 'SS') {
      return 'lightgreen'
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
      return (
        point.timestamp != latestTimestamp ? (
          <Marker opacity={.25} key={index} position={coords} icon={circleIcon(fill(type, windSpeed))}>
            <Popup className="w-64 font-bold">
              <h1 className="text-md">{point.details.stormName}</h1>
              <h1 className="my-1">{month}/{day}/{year} at {formattedTime} EST</h1>
              <h1>Max Wind: {windSpeed} mph</h1>
              <h1>Min Pressure: {point.details.pressureMB} mb</h1>
            </Popup>
          </Marker>
        ) : (
          <Marker key={index} position={coords} icon={stormIcon(fill(type, windSpeed))}>
            <Popup className="w-64 font-bold">
              <h1 className="text-md">{point.details.stormName}</h1>
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

  const archiveMap = (archive) => {
    const archiveMap = archive?.map((storm) => {
      let positions = []
      const startIndex = storm.track.findIndex(index => index.details.stormType.includes('T') || index.details.stormType.includes('S'))
      const track = storm.track.slice(startIndex).map((point, index) => {
        const date = new Date(point.dateTimeISO)
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const formattedTime = timeFormatter.format(date)
        const coords = [point.loc.lat, point.loc.long]
        const type = point.details.stormType
        const windSpeed = point.details.windSpeedMPH
        let stormName = point.details.stormName
        const shortName = point.details.stormShortName
        if (point.details.stormName.includes('Potential') == false && /\d/.test(shortName) == false) {
          positions.push(coords)
        }
        if (stormName.includes('Unnamed')) {
          if (fill(type, windSpeed) == 'gray') {
            stormName = 'Unnamed Post-Tropical Cyclone'
          } else if (fill(type, windSpeed) == 'lightgray') {
            stormName = 'Remnants of Unnamed Tropical Cyclone'
          } else {
            const split = stormName.split(' ')
            split.unshift(split.pop())
            stormName = split.join(' ')
          }
        } else {
          if (fill(type, windSpeed) == 'gray') {
            stormName = `Post-Tropical Cyclone ${shortName}`
          } if (fill(type, windSpeed) == 'lightgray') {
            stormName = `Remnants of ${shortName}`
          }
        }
        if (point.details.stormName.includes('Potential') == false && /\d/.test(shortName) == false) {
          return (
            <Marker key={index} position={coords} icon={circleIcon(fill(type, windSpeed))}>
              <Popup className="w-64 font-bold">
                <h1 className="text-md">{stormName}</h1>
                <h1 className="my-1">{month}/{day}/{year} at {formattedTime} EST</h1>
                <h1>Max Wind: {windSpeed} mph</h1>
                {point.details.pressureMB && <h1>Min Pressure: {point.details.pressureMB} mb</h1>}
              </Popup>
            </Marker>
          )
        }
      })
      return (
        <div key={storm.id}>
          <Polyline positions={positions} color="gray" opacity={.25}/>
          {track}
        </div>
      )
    })
    return archiveMap
  } 

  const currentYear = new Date().getFullYear()
  const years = new Array(currentYear - 1850).fill(0)

  return (
    <>
      <div className="top-20 h-16 bg-blue-950 fixed w-screen flex justify-center items-center z-50" style={{fontFamily:'Poppins'}}>
        <Select className="bg-white h-10 w-fit !rounded-lg" defaultValue={0} value={year} onChange={(e) => {setYear(e.target.value)}}>
          <MenuItem value={0}>Active ({active?.length})</MenuItem>
          {years.map((_, index) => {
            const selectedYear = currentYear - index;
            return (<MenuItem key={selectedYear} value={selectedYear}>{selectedYear}</MenuItem>);
          })}
        </Select>
      </div>
      <MapContainer className="h-[calc(100vh-4rem)] mt-20 w-screen -z-10 absolute inset-0 pointer-events-auto" center={[30, -50]} maxZoom={10} minZoom={4} zoom={4}>
        <TileLayer url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'/>
        {year == 0 ? (
          <div>{activeMap}</div>
          ) : (
          <div>
            {archiveMap(alArchive)}
            {archiveMap(epArchive)}
            {archiveMap(cpArchive)}
          </div>
        )}
      </MapContainer>
    </>
  )
}

export default Cyclopedia