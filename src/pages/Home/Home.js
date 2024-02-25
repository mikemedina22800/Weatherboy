import { useState, useEffect } from "react"
import umbrella from "../../images/umbrella.png"
import nws from "../../images/nws.png"
import Current from "./components/Current"
import { CircularProgress } from "@mui/material"
import Forecast from "./components/Forecast"
import { fetchPoints, fetchStations, fetchObservations, fetchForecast } from "../../api/nws"
import { fetchTimeZone } from "../../api/google"
import wallpaper from "../../images/wallpaper.jpg"

const Home = ({coords}) => {
  const [points, setPoints] = useState(null)
  const [wfo, setWfo] = useState(null)
  const [location, setLocation] = useState(null)
  const [currentWeather, setCurrentWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [stationUrl, setStationUrl] = useState(null)
  const [timeZone, setTimeZone] = useState(null)

  useEffect(() => {
    const timestamp = Math.floor(Date.now() / 1000)
    if (coords) {
      fetchPoints(coords).then((data) => {
        setLocation(`${data.properties.relativeLocation.properties.city}, ${data.properties.relativeLocation.properties.state}`)
        setWfo(data.properties.gridId)
        setPoints([data.properties.gridX, data.properties.gridY])
      })
      fetchTimeZone(coords, timestamp).then((data) => {
        setTimeZone(data.timeZoneId)
      })
    }
  }, [coords])

  useEffect(() => {
    if (points && wfo) {
      console.log(points)
      console.log(wfo)
      fetchForecast({wfo, points}).then((data) => {
        setForecast(data.properties.periods)
      })
      fetchStations({wfo, points}).then((data) => {
        setStationUrl(data.observationStations[0])
      })
    }
  }, [points, wfo])

  useEffect(() => {
    if (stationUrl) {
      fetchObservations(stationUrl).then((data) => {
        setCurrentWeather(data.features[0].properties)
      })
    }
  }, [stationUrl])

  const weatherIcon = (nwsIcon) => {
    let icon
    if (nwsIcon.includes('skc')) {
      if (nwsIcon.includes('night')) {
        icon = "wi-night-clear text-yellow-100"
      } else {
        icon = "wi-day-sunny text-[yellow]"
      }
    } 
    if (nwsIcon.includes('few')) {
      if (nwsIcon.includes('night')) {
        icon = "wi-night-alt-partly-cloudy text-yellow-100"
      } else {
        icon = "wi-day-sunny-overcast text-[yellow]"
      }
    }
    if (nwsIcon.includes('sct')) {
      if(nwsIcon.includes('night')) {
        icon = "wi-night-alt-cloudy-high text-yellow-100"
      } else {
        icon = "wi-day-cloudy-high text-[yellow]"
      }
    } 
    if (nwsIcon.includes('bkn')) {
      if(nwsIcon.includes('night')) {
        icon = "wi-night-alt-cloudy text-yellow-100"
      } else {
        icon = "wi-day-cloudy text-[yellow]"
      }
    }  
    if (nwsIcon.includes('ovc')) {
      icon = "wi-cloud text-gray-300"
    }
    if (nwsIcon.includes('sn')) {
      if (nwsIcon.includes('ra_sn')) {
        icon = "wi-sleet text-white"
      } else {
        icon = "wi-snow text-white"
      }
    }
    if (nwsIcon.includes('ip') || nwsIcon.includes('fzra')) {
      icon = "wi-sleet text-white"
    }
    if (nwsIcon.includes('ra')) {
      if (nwsIcon.includes('minus_ra') || nwsIcon.includes('shra')) {
        icon = 'wi-showers text-gray-400'
      } else {
        icon = 'wi-rain text-gray-500'
      }
    }
    if (nwsIcon.includes('hi_shwrs')) {
      icon = "wi-day-showers text-gray-400"
    }
    if (nwsIcon.includes('hi_nshwrs')) {
      icon = "wi-night-alt-showers text-gray-400"
    }
    if (nwsIcon.includes('tsra')) {
      icon = "wi-thunderstorm text-gray-600"
    }
    if (nwsIcon.includes('fc') || nwsIcon.includes('tor')) {
      icon = "wi-tornado text-gray-600"
    }
    if (nwsIcon.includes('hur') || nwsIcon.includes('ts_')) {
      icon = "wi-hurricane text-red-600"
    }
    if (nwsIcon.includes('wind')) {
      if (nwsIcon.includes('few')) {
        icon = "wi-cloudy-windy text-white"
      } if (nwsIcon.includes('sct')) {
        icon = "wi-cloudy-windy text-gray-200"
      } if (nwsIcon.includes('bkn')) {
        icon = "wi-cloudy-windy text-gray-300"
      } if (nwsIcon.includes('ovc')) {
        icon = "wi-cloudy-windy text-gray-400"
      } else {
        icon = "wi-strong-wind text-white"
      }
    }
    if (nwsIcon.includes('du')) {
      icon = "wi-dust text-yellow-600"
    }
    if (nwsIcon.includes('fu')) {
      icon = "wi-smoke text-gray-400"
    }
    if (nwsIcon.includes('hz')) {
      icon = "wi-day-haze text-gray-200"
    }
    if (nwsIcon.includes('blizzard')) {
      icon = "wi-snow-wind text-white"
    }
    if (nwsIcon.includes('fog')) {
      icon = "wi-fog text-gray-200"
    }
    return icon
  }

  console.log(timeZone)

  return (
    <>
      <div className="flex flex-col min-h-screen items-center overflow-hidden w-screen font-bold text-white pt-40 bg-black bg-opacity-50 px-10">
        <div className="flex items-center text-4xl sm:text-5xl">
          <h1>Weatherboy</h1>
          <img src={umbrella} alt="logo" className="h-10 sm:h-14 ml-2"/>
        </div>
        <div className="flex items-center text-xl sm:text-3xl mb-10 mt-2">
          <h1>Powered by The National Weather Service</h1>
          <img className="h-10 ml-2" src={nws}/>
        </div>
        {location && currentWeather && forecast && timeZone ? (
          <>
            <Current location={location} currentWeather={currentWeather} weatherIcon={weatherIcon}/>
            <Forecast location={location} forecast={forecast} timeZone={timeZone} weatherIcon={weatherIcon}/>
          </>
        ) : (
          <CircularProgress size={"10rem"}/>
        )}
      </div>
      <img className="-z-50 w-[1920px] h-full fixed top-0 !object-cover" src={wallpaper}/>
    </>
  )
}

export default Home