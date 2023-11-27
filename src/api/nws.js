import axios from "axios";

export const fetchPoints = async (coords) => {
  try {
    const { data: data } = await axios.get(`https://api.weather.gov/points/${coords}`)
    return data;
  } catch (error) {
    console.log(error)
  }
}

export const fetchForecast = async ({wfo, points}) => {
  try {
    const { data: data } = await axios.get(`https://api.weather.gov/gridpoints/${wfo}/${points}/forecast/hourly`)
    return data;
  } catch (error) {
    console.log(error)
  }
}

export const fetchStations = async ({wfo, points}) => {
  try {
    const { data: data } = await axios.get(`https://api.weather.gov/gridpoints/${wfo}/${points}/stations`)
    return data;
  } catch (error) {
    console.log(error)
  }
}

export const fetchObservations = async (stationUrl) => {
  try {
    const { data: data } = await axios.get(`${stationUrl}/observations`)
    return data;
  } catch (error) {
    console.log(error)
  }
}

