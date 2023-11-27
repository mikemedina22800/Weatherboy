import axios from "axios";

const id = process.env.REACT_APP_AERIS_CLIENT_ID
const secret = process.env.REACT_APP_AERIS_CLIENT_SECRET

export const fetchTCData = async () => {
  try{
    const { data } = await axios.get(`https://api.aerisapi.com/tropicalcyclones?/limit=50&filter=al&filter=ep&filter=cp&client_id=${id}&client_secret=${secret}`)
    return data
  }
  catch (error) {
    console.log(error)
  }
}

export const fetchTCArchive = async ({year, basin}) => {
  try{
    const { data } = await axios.get(`https://api.aerisapi.com/tropicalcyclones/archive/search?&filter=notactive&filter=${basin}&limit=50&query=year:${year}:${year}&client_id=${id}&client_secret=${secret}`)
    return data
  }
  catch (error) {
    console.log(error)
  }
}
