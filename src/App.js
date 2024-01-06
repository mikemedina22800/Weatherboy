import { useState, useEffect } from "react"
import { Routes, Route, HashRouter } from "react-router-dom"
import Home from "./pages/Home/Home"
import Layout from "./pages/Layout/Layout"
import Cyclopedia from "./pages/Cyclopedia"
import WeatherMap from "./pages/WeatherMap/WeatherMap"

function App() {
  const [coords, setCoords] = useState(null)
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: {latitude, longitude} }) => {
      setCoords([latitude, longitude]);
    })
  }, [])

  const [year, setYear] = useState(0)

  const [active, setActive] = useState(null)

  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout setCoords={setCoords} year={year} setYear={setYear} active={active}/>}>
            <Route index element={<Home coords={coords}/>}/>
            <Route path="map" element={<WeatherMap/>}/>
            <Route path="cyclopedia" element={<Cyclopedia year={year} active={active} setActive={setActive}/>}/>
          </Route>
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
