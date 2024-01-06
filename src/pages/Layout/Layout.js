import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
import Searchbar from "./components/Searchbar"

const Layout = ({setCoords, year, setYear, active}) => {
  return (
    <>
      <Navbar year={year} setYear={setYear} active={active}/>
      <Searchbar setCoords={setCoords}/>
      <Outlet/>
    </>
  )
}

export default Layout