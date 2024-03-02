import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"

const Layout = ({ setCoords }) => {
  return (
    <>
      <Navbar setCoords={setCoords}/>
      <Outlet/>
    </>
  )
}

export default Layout