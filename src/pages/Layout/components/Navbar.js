import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { IconButton } from "@mui/material"
import { Menu } from "@mui/icons-material"
import Searchbar from "./Searchbar"
import SelectYear from "./SelectYear"

const Navbar = ({year, setYear, active}) => {
  const path = useLocation().pathname
  const [dropDown, setDropDown] = useState(false)
  
  return (
    <nav className="text-white text-xl z-50 bg-blue-950 font-bold h-20 px-4 w-screen fixed flex items-center sm:justify-around justify-between" style={{fontFamily:'Poppins'}}>
      <div className={`${path == '/' ? ('flex') : ('hidden')}`}>
        <Searchbar/>
      </div>
      <div className={`${path != '/' ? ('flex') : ('hidden')}`}>
        <SelectYear year={year} setYear={setYear} active={active}/>
      </div>
      <div className="hidden md:flex w-64 justify-between">
        <Link to="/">
          <h1 className={`hover:text-[aqua] ${path == '/' && 'text-[aqua]'}`}>Home</h1>
        </Link>
        <Link to="cyclopedia">
          <h1 className={`hover:text-[aqua] ${path == '/cyclopedia' && 'text-[aqua]'}`}>Cyclopedia</h1>
        </Link>
      </div>
      <div className="md:hidden">
        <IconButton onClick={() => {(dropDown === false) ? setDropDown(true) : setDropDown(false)}}>
          <Menu className="text-white !text-5xl"/>
        </IconButton>
      </div>
      {dropDown && 
        <div onClick={() => {setDropDown(false)}} className="bg-blue-900 md:hidden z-20 w-64 right-0 fixed top-20">
          <Link to="/">
            <h1 className={`py-4 pl-4 hover:text-[aqua] ${path == '/' && 'text-[aqua]'}`}>Current</h1>
          </Link>
          <Link to="cyclopedia">
            <h1 className={`py-4 pl-4 hover:text-[aqua] ${path == '/cycloepdia' && 'text-[aqua]'}`}>Cyclopedia</h1>
          </Link>
        </div>
      }
    </nav>
  )
}

export default Navbar