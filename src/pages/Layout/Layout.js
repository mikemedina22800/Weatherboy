import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
import Background from "./components/Background"
import Searchbar from "./components/Searchbar"

const Layout = ({setCoords}) => {
  return (
    <>
      <Navbar/>
      <Searchbar setCoords={setCoords}/>
      <Background/>
      <Outlet/>
    </>
  )
}

export default Layout