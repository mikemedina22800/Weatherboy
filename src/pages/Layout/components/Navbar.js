import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { IconButton, Tooltip } from "@mui/material"
import { Menu, Home, Cyclone, Public } from "@mui/icons-material"
import Searchbar from "./Searchbar"
import SelectYear from "./SelectYear"

const Navbar = () => {
  const path = useLocation().pathname
  const [dropDown, setDropDown] = useState(false)
  
  return (
    <nav className={`text-white text-xl z-50 bg-purple-950 font-bold h-20 sm:px-10 px-5 w-screen fixed flex items-center ${path === '/' ? 'justify-between' : 'justify-end'}`}>
      <div className={`${path === '/' ? ('flex') : ('hidden')}`}>
        <Searchbar/>
      </div>
      <div className="hidden md:flex w-96 justify-between">
        <Tooltip title="Home" placement="bottom" arrow>
          <Link to="/">
            <IconButton>
              <Home className={`!text-5xl ${path === '/' ? `text-[aqua]` : `text-white`}`}/>
            </IconButton>
          </Link>
        </Tooltip>
        <Tooltip title="Weather Map" placement="bottom" arrow>
          <Link to="/map">
            <IconButton>
              <Public className={`!text-5xl ${path === '/map' ? `text-[aqua]` : `text-white`}`}/>
            </IconButton>
          </Link>
        </Tooltip>
        <Tooltip title="Cyclopedia" placement="bottom" arrow>
          <Link to="/cyclopedia">
            <IconButton>
              <Cyclone className={`!text-5xl ${path === '/cyclopedia' ? `text-[aqua]` : `text-white`}`}/>
            </IconButton>
          </Link>
        </Tooltip>
      </div>  
      <div className="md:hidden">
        <IconButton onClick={() => {(dropDown === false) ? setDropDown(true) : setDropDown(false)}}>
          <Menu className="text-white !text-5xl"/>
        </IconButton>
      </div>
      {dropDown && 
        <div onClick={() => {setDropDown(false)}} className="bg-purple-900 flex flex-col items-center md:hidden z-20 p-5 right-0 fixed top-20">
          <Tooltip title="Home" placement="bottom" arrow>
            <Link to="/">
              <IconButton>
                <Home className={`!text-5xl ${path === '/' ? `text-[aqua]` : `text-white`}`}/>
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip title="Weather Map" placement="bottom" arrow>
            <Link to="/map">
            <IconButton>
              <Public className={`!text-5xl ${path === '/map' ? `text-[aqua]` : `text-white`}`}/>
            </IconButton>
          </Link>
          </Tooltip>
          <Tooltip title="Cyclopedia" placement="bottom" arrow>
            <Link to="/cyclopedia">
              <IconButton>
                <Cyclone className={`!text-5xl ${path === '/cyclopedia' ? `text-[aqua]` : `text-white`}`}/>
              </IconButton>
            </Link>
          </Tooltip>
        </div>
      }
    </nav>
  )
}

export default Navbar