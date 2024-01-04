import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { IconButton, Tooltip } from "@mui/material"
import { Menu, Home, Storm } from "@mui/icons-material"
import Searchbar from "./Searchbar"
import SelectYear from "./SelectYear"

const Navbar = ({year, setYear, active}) => {
  const path = useLocation().pathname
  const [dropDown, setDropDown] = useState(false)
  
  return (
    <nav className="text-white text-xl z-50 bg-purple-950 font-bold h-20 sm:px-10 px-5 w-screen fixed flex items-center justify-between sm:justify-around" style={{fontFamily:'Poppins'}}>
      <div className={`${path == '/' ? ('flex') : ('hidden')}`}>
        <Searchbar/>
      </div>
      <h1 className={`${path === '/' && ('!hidden')} text-4xl sm:flex hidden`} style={{fontFamily:'Poppins'}}>Cyclopedia</h1>
      <div className={`${path != '/' ? ('flex') : ('hidden')}`}>
        <SelectYear year={year} setYear={setYear} active={active}/>
      </div>
      <div className="hidden md:flex w-48 justify-between">
        <div>
        <Tooltip title="Home" placement="bottom" arrow>
          <Link to="/">
            <IconButton>
              <Home className={`!text-5xl ${path === '/' ? `text-[aqua]` : `text-white`}`}/>
            </IconButton>
          </Link>
        </Tooltip>
        </div>
    <div>
        <Tooltip title="Cyclopedia" placement="bottom" arrow>
          <Link to="/cyclopedia">
            <IconButton>
              <Storm className={`!text-5xl ${path === '/cyclopedia' ? `text-[aqua]` : `text-white`}`}/>
            </IconButton>
          </Link>
        </Tooltip>
        </div>
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
          <Tooltip title="Cyclopedia" placement="bottom" arrow>
            <Link to="/cyclopedia">
              <IconButton>
                <Storm className={`!text-5xl ${path === '/cyclopedia' ? `text-[aqua]` : `text-white`}`}/>
              </IconButton>
            </Link>
          </Tooltip>
        </div>
      }
    </nav>
  )
}

export default Navbar