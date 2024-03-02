import '../../../weather-icons-master/css/weather-icons.css'
import { QuestionMark } from "@mui/icons-material";

const Current = ({location, currentWeather, weatherIcon}) => {
  const angle = currentWeather?.windDirection?.value
  
  let direction

  if (angle >= 348.75 && angle < 11.25) {
      direction = 'N'
    } if (angle >= 11.25 && angle < 33.75) {
      direction = 'NNE'
    } if (angle >= 33.75 && angle < 56.25) {
      direction = 'NE'
    } if (angle >= 56.25 && angle < 78.75) {
      direction = 'ENE'
    } if (angle >= 78.75 && angle < 101.25) {
      direction = 'E'
    } if (angle >= 101.25 && angle < 123.75) {
      direction = 'ESE'
    } if (angle >= 123.75 && angle < 146.25) {
      direction = 'SE'
    } if (angle >= 146.25 && angle < 168.75) {
      direction = 'SSE'
    } if (angle >= 168.75 && angle < 191.25) {
      direction = 'S'
    } if (angle >= 191.25 && angle < 213.75) {
      direction = 'SSW'
    } if (angle >= 213.75 && angle < 236.25) {
      direction = 'SW'
    } if (angle >= 236.25 && angle < 258.75) {
      direction = 'WSW'
    } if (angle >= 258.75 && angle < 281.25) {
      direction = 'W'
    } if (angle >= 281.25 && angle < 303.75) {
      direction = 'WNW'
    } if (angle >= 303.75 && angle < 326.25) {
      direction = 'NW'
    } if (angle >= 326.25 && angle < 348.75) {
      direction = 'NNW'
  }
  
  const nwsIcon = currentWeather?.icon
  const temp = currentWeather?.temperature.value
  const wind = currentWeather?.windSpeed.value
  const humidity = currentWeather?.relativeHumidity.value
  const pressure = currentWeather?.seaLevelPressure?.value

  return (
    <div className="sm:w-[36rem] w-80 p-8 sm:p-16 flex flex-col items-center justify-center sm:h-80 h-fit rounded-3xl sm:rounded-[3rem] bg-blue-900">
      <h1 className="text-sm sm:text-xl mb-4">Currently at {location}</h1>
      <div className="text-xs sm:text-xl flex flex-row justify-between items-center h-full w-full">
        <div className="flex flex-col w-fit h-20 sm:h-36 justify-between">
          {temp ? (<h1>Temperature: {Math.round(temp * 9/5 + 32)}°F</h1>) : (<h1>Temperature: ?</h1>)}
          {wind ? (
            currentWeather?.windSpeed.value != 0 ? (
              <h1>Wind: {direction} at {Math.round(currentWeather?.windSpeed.value * 0.621371)} mph</h1>
            ):(<h1>Wind: None</h1>)
          ):(<h1>Wind: ?</h1>)}
          {humidity ? (<h1>Humidity: {Math.round(humidity)}%</h1>) : (<h1>Humidity: ?</h1>)}
          {pressure ? (<h1>Air Pressure: {pressure.toString().substring(0, 4)} mb</h1>) : (<h1>Air Pressure: ?</h1>)}
        </div>
        <div className="flex flex-col items-center w-20 sm:w-40">
          {nwsIcon ? (<i className={`wi sm:text-8xl text-5xl sm:mb-5 mb-2 ${weatherIcon(nwsIcon)}`}/>) : <QuestionMark className='sm:!text-8xl !text-6xl'/>}
          <h1 className='text-center'>{currentWeather?.textDescription}</h1>
        </div>
      </div>
    </div>
  )
}

export default Current