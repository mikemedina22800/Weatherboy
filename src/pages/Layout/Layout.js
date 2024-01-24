import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"

const Layout = ({setCoords, year, setYear, active}) => {
  return (
    <>
      <Navbar year={year} setYear={setYear} active={active}/>
      <Outlet/>
    </>
  )
}

export default Layout