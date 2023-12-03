import { useState } from 'react'
import { Paper, InputBase } from '@mui/material'
import { Search } from '@mui/icons-material'
import { LoadScript, Autocomplete } from "@react-google-maps/api"
import { useLocation } from 'react-router-dom'

const libraries = ['places'];

const Searchbar = ({ setCoords }) => {
  const path = useLocation().pathname
  const [location, setLocation] = useState(null)
  return (
    <div className={`fixed top-20 bg-blue-950 h-16 z-50 w-screen flex justify-center ${path == '/' ? ('flex') : ('hidden')}`}>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} libraries={libraries}>
      <Autocomplete 
        types={['(cities)']}
        restrictions={{ country: 'us' }}
        onLoad={(e) => {
          setLocation(e)
        }}
        onPlaceChanged={() => {
          setCoords([location.getPlace().geometry.location.lat(), location.getPlace().geometry.location.lng()])
        }}
      >
        <Paper className='flex justify-between items-center px-4 py-1'>
          <InputBase className='!text-xl w-64 sm:w-96' placeholder='Search any city in the US' />
          <Search/>
        </Paper>
      </Autocomplete>
    </LoadScript>
    </div>
  )
}

export default Searchbar