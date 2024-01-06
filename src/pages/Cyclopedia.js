import { useState, useEffect } from "react";
import { MapContainer, Polyline, TileLayer, Popup, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { divIcon } from "leaflet";
import { fetchTCArchive } from "../api/aeris";
import { Select, MenuItem } from "@mui/material";

const Cyclopedia = () => {
  const [alArchive, setAlArchive] = useState(null)
  const [epArchive, setEpArchive] = useState(null)
  const [cpArchive, setCpArchive] = useState(null)
  const [wpArchive, setWpArchive] = useState(null)
  const [ioArchive, setIoArchive] = useState(null)
  const [shArchive, setShArchive] = useState(null)

  const currentYear = new Date().getFullYear()
  const [year, setYear] = useState(currentYear)
  const years = new Array(currentYear - 1850).fill(0)
  
  useEffect(() => {
    if (year != 0) {
      fetchTCArchive({year, basin:'al'}).then((data) => {
        setAlArchive(data.response)
        console.log(data.response)
      })
      fetchTCArchive({year, basin:'ep'}).then((data) => {
        setEpArchive(data.response)
      })
      fetchTCArchive({year, basin:'cp'}).then((data) => {
        setCpArchive(data.response)
      })
      fetchTCArchive({year, basin:'wp'}).then((data) => {
        setWpArchive(data.response)
      })
      fetchTCArchive({year, basin:'io'}).then((data) => {
        setIoArchive(data.response)
      })
      fetchTCArchive({year, basin:'sh'}).then((data) => {
        setShArchive(data.response)
      })
    }
  }, [year])

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
    if (type === 'LO' || type === 'WV' || type === 'DB') {
      return 'gray'
    } else {
      if (windSpeed <= 40) {
        if (stormName.includes('Sub')) {
          return 'aqua'
        } else {
          return 'blue'
        }
      } if (windSpeed >= 40 && windSpeed <= 75) {
          if (stormName.includes('Sub')) {
          return 'lightgreen'
          } else {
          return 'lime'
        }
      } if (windSpeed >= 75 && windSpeed <= 95) {
        return 'yellow'
      } if (windSpeed >= 95 && windSpeed < 115) {
        return 'orange'
      } if (windSpeed >= 115 && windSpeed < 130) {
        return 'red'
      } if (windSpeed >= 130 && windSpeed < 160) {
        return 'hotpink'
      } if (windSpeed >= 160) {
        return 'pink'
      }
    }
  }

  const timeFormatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

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
        if (stormName.includes('Potential') == false && /\d/.test(shortName) == false) {
          positions.push(coords)
        }
        if (stormName.includes('Unnamed')) {
          if (fill(type, windSpeed, stormName) == 'gray') {
            stormName = 'Unnamed Post-Tropical Cyclone'
          } else if (fill(type, windSpeed, stormName) == 'lightgray') {
            stormName = 'Remnants of Unnamed Tropical Cyclone'
          } else {
            const split = stormName.split(' ')
            split.unshift(split.pop())
            stormName = split.join(' ')
          }
        } else {
          if (fill(type, windSpeed, stormName) == 'gray') {
            stormName = `Post-Tropical Cyclone ${shortName}`
          } if (fill(type, windSpeed, stormName) == 'lightgray') {
            stormName = `Remnants of ${shortName}`
          }
        }
        if (stormName.includes('Potential') == false && /\d/.test(shortName) == false) {
          return (
            <Marker key={index} position={coords} icon={circleIcon(fill(type, windSpeed, stormName))}>
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

  return (
    <div className="h-screen w-screen">
      <div className="fixed top-[90px] right-10 z-50">
        <Select className="bg-white h-10 w-24 !rounded-lg" value={year} onChange={(e) => {setYear(e.target.value)}}>
          {years.map((_, index) => {
            const selectedYear = currentYear - index;
            return (<MenuItem key={selectedYear} value={selectedYear}>{selectedYear}</MenuItem>);
          })}
        </Select>
      </div> 
      <MapContainer className="h-[calc(100%-5rem)] top-20 w-full fixed inset-0 pointer-events-auto" maxBounds={[[90, 180], [-90, -180]]} center={[30, -50]} maxZoom={15} minZoom={3} zoom={3}>
        <TileLayer url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'/>  
        {archiveMap(alArchive)}
        {archiveMap(epArchive)}
        {archiveMap(cpArchive)}
        {archiveMap(wpArchive)}
        {archiveMap(ioArchive)}
        {archiveMap(shArchive)}
      </MapContainer>
    </div>
  )
}

export default Cyclopedia