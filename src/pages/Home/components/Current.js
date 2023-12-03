import '../../../weather-icons-master/css/weather-icons.css'
import { QuestionMark } from "@mui/icons-material";

const Current = ({location, currentWeather, weatherIcon}) => {
  const angle = currentWeather?.windDirection?.value
  
  let direction

  if (angle >= 345 && angle < 15) {
      direction = 'N'
    } if (angle >= 15 && angle < 30) {
      direction = 'NNE'
    } if (angle >= 30 && angle < 60) {
      direction = 'NE'
    } if (angle >= 60 && angle < 75) {
      direction = 'ENE'
    } if (angle >= 75 && angle < 105) {
      direction = 'E'
    } if (angle >= 105 && angle < 120) {
      direction = 'ESE'
    } if (angle >= 120 && angle < 150) {
      direction = 'SE'
    } if (angle >= 150 && angle < 165) {
      direction = 'SSE'
    } if (angle >= 165 && angle < 195) {
      direction = 'S'
    } if (angle >= 195 && angle < 210) {
      direction = 'SSW'
    } if (angle >= 210 && angle < 240) {
      direction = 'SW'
    } if (angle >= 240 && angle < 255) {
      direction = 'WSW'
    } if (angle >= 255 && angle < 285) {
      direction = 'W'
    } if (angle >= 285 && angle < 300) {
      direction = 'WNW'
    } if (angle >= 300 && angle < 330) {
      direction = 'NW'
    } if (angle >= 330 && angle < 345) {
      direction = 'NNW'
  }

  let icon

  const nwsIcon = currentWeather?.icon
  const temp = currentWeather?.temperature.value
  const wind = currentWeather?.windSpeed.value
  const humidity = currentWeather?.relativeHumidity.value
  const pressure = currentWeather?.seaLevelPressure?.value

  return (
    <div className="sm:w-[36rem] w-80 p-8 sm:p-16 flex flex-col items-center justify-center sm:h-80 h-fit rounded-3xl sm:rounded-[3rem] bg-blue-900" style={{fontFamily:'Poppins'}}>
      <h1 className="text-xs sm:text-xl pb-8">Currently at {location}</h1>
      <div className="text-xs sm:text-xl flex flex-row justify-between items-center h-full w-full">
        <div className="flex flex-col h-20 sm:h-36 justify-between ">
          {temp ? (<h1>Temperature: {Math.round(temp * 9/5 + 32)}°F</h1>) : (<h1>Temperature: Unavailable</h1>)}
          {wind ? (
            currentWeather?.windSpeed.value != 0 ? (
              <h1>Wind: {direction} at {Math.round(currentWeather?.windSpeed.value * 0.621371)} mph</h1>
            ):(<h1>Wind: Nearly Stationary</h1>)
          ):(<h1>Wind: Unavailable</h1>)}
          {humidity ? (<h1>Relative Humidity: {Math.round(humidity)}%</h1>) : (<h1>Relative Humidity: Unavailable</h1>)}
          {pressure ? (<h1>Air Pressure: {pressure.toString().substring(0, 4)} mb</h1>) : (<h1>Air Pressure: Unavailable</h1>)}
        </div>
        <div className="flex flex-col items-center">
          {nwsIcon ? (<i className={`wi sm:text-8xl text-5xl sm:mb-5 mb-2 ${weatherIcon(nwsIcon)}`}/>) : <QuestionMark className='sm:!text-8xl !text-6xl'/>}
          <h1>{currentWeather?.textDescription}</h1>
        </div>
      </div>
    </div>
  )
}

export default Current