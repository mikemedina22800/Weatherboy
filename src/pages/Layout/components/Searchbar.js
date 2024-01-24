import { useState } from 'react'
import { Paper, InputBase } from '@mui/material'
import { Search } from '@mui/icons-material'
import { LoadScript, Autocomplete } from "@react-google-maps/api"

const libraries = ['places'];

const Searchbar = ({ setCoords }) => {
  const [location, setLocation] = useState(null)
  return (
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
          <InputBase className='sm:!text-xl w-48 !text-lg overflow-ellipsis sm:w-96' placeholder='Search any US city' />
          <Search/>
        </Paper>
      </Autocomplete>
    </LoadScript>
  )
}

export default Searchbar