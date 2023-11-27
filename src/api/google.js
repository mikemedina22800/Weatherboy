import axios from 'axios';

export const fetchTimeZone = async (coords, timestamp) => {
  try {
    const { data } = await axios.get(`https://maps.googleapis.com/maps/api/timezone/json?location=${coords}&timestamp=${timestamp}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`)
    return data;
  } catch (error) {
    console.log(error)
  }
};


