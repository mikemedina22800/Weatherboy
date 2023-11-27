import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import umbrella from "../../../images/umbrella.png"
import { IconButton } from "@mui/material"
import { Menu } from "@mui/icons-material"


const Navbar = () => {
  const path = useLocation().pathname
  const [dropDown, setDropDown] = useState(false)
  
  return (
    <nav className="text-white text-xl z-50 bg-blue-950 font-bold h-20 w-screen fixed flex items-center justify-between px-5 sm:px-10">
      <img src={umbrella} alt='logo' className='w-10 h-10 ml-2' />
      <div className="hidden sm:flex w-48 justify-between">
        <Link to="/">
          <h1 className={`hover:text-[aqua] ${path == '/' && 'text-[aqua]'}`}>Home</h1>
        </Link>
        <Link to="cyclopedia">
          <h1 className={`hover:text-[aqua] ${path == '/cyclopedia' && 'text-[aqua]'}`}>Cyclopedia</h1>
        </Link>
      </div>
      <div className="sm:hidden">
        <IconButton onClick={() => {(dropDown === false) ? setDropDown(true) : setDropDown(false)}}>
          <Menu className="text-white !text-5xl"/>
        </IconButton>
      </div>
      {dropDown && 
        <div onClick={() => {setDropDown(false)}} className="bg-blue-900 md:hidden z-20 w-64 right-0 fixed top-40">
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