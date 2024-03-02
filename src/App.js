import { useState, useEffect } from "react"
import { Routes, Route, HashRouter } from "react-router-dom"
import Home from "./pages/Home/Home"
import Layout from "./pages/Layout/Layout"
import Cyclopedia from "./pages/Cyclopedia/Cyclopedia"
import WeatherMap from "./pages/WeatherMap/WeatherMap"

function App() {
  const [coords, setCoords] = useState(null)
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: {latitude, longitude} }) => {
      setCoords([latitude, longitude]);
    })
  }, [])

  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout setCoords={setCoords}/>}>
            <Route index element={<Home coords={coords}/>}/>
            <Route path="map" element={<WeatherMap/>}/>
            <Route path="cyclopedia" element={<Cyclopedia/>}/>
          </Route>
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
