import axios from "axios";

const id = process.env.REACT_APP_OPEN_WEATHER_API_KEY

export const fetchMap = async (layer, z, x, y) => {
  try {
    const response = await axios.get(`https://tile.openweathermap.org/map/${layer}/${z}/${x}/${y}.png?appid=${id}`);
    return response.data
  } catch(err) {
    console.log(err)
  }
}