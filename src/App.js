import React, { useEffect, useState } from "react"
import "./App.css"

export default function App() {
  const [lat, setLat] = useState(null)
  const [long, setLong] = useState(null)
  const [data, setData] = useState({})
  const [location, setLocation] = useState("")
  let [temperature, setTemperature] = useState(null)
  let [feeltemperature, setFeelTemperature] = useState(null)
  const [weather, setWeather] = useState(null)
  const [wind, setWind] = useState(null)
  const [humidity, setHumidity] = useState(null)
  const [weatherId, setWeatherId] = useState(null)
  let weatherImg

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude)
        setLong(position.coords.longitude)
      })

      if (lat !== null && long !== null) {
        try {
          const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=13b642fee8793f432d263f27d76af97b`)
          const result = await response.json()
          setData(result)
          console.log("result", result)
          setLocation(result.name)
          setTemperature(result.main?.temp)
          setFeelTemperature(result.main?.feels_like)
          setWeather(result.weather[0]?.main)
          setWind(result.wind.speed)
          setHumidity(result.main.humidity)
          setWeatherId(result.weather[0].id)
        } catch (error) {
          console.error("Error fetching weather data:", error.message)
        }
      }
    }

    fetchData()
  }, [lat, long])

  switch (weatherId) {
    default:
      weatherImg = `https://help.apple.com/assets/656912ADA28BF1B7E90BF0F6/656912B3021EA3AD750FB887/en_US/575900edccbc7def167f7874c02aeb0b.png`
      break

    case 800: //clear
      weatherImg = `https://help.apple.com/assets/656912ADA28BF1B7E90BF0F6/656912B3021EA3AD750FB887/en_US/575900edccbc7def167f7874c02aeb0b.png`
      break

    case 801: //brokenclouds
      weatherImg = `https://help.apple.com/assets/656912ADA28BF1B7E90BF0F6/656912B3021EA3AD750FB887/en_US/67aaf9dbe30989c25cbde6c6ec099213.png`
      break

    case (802, 803, 804): //cloudy
      weatherImg = `https://help.apple.com/assets/656912ADA28BF1B7E90BF0F6/656912B3021EA3AD750FB887/en_US/66117fab0f288a2867b340fa2fcde31b.png`
      break

    case (600, 601, 602, 612, 613, 615, 616, 620, 621, 622): //snow
      weatherImg = `https://help.apple.com/assets/656912ADA28BF1B7E90BF0F6/656912B3021EA3AD750FB887/en_US/00171e3b54b97dee8c1a2f6a62272640.png`
      break

    case (500, 501, 502, 503, 504, 611, 520, 521, 522, 531): //rain
      weatherImg = `https://help.apple.com/assets/656912ADA28BF1B7E90BF0F6/656912B3021EA3AD750FB887/en_US/00171e3b54b97dee8c1a2f6a62272640.png`
      break

    case (200, 201, 202, 210, 211, 212, 221, 230, 231, 232): //thunderstorm
      weatherImg = `https://help.apple.com/assets/656912ADA28BF1B7E90BF0F6/656912B3021EA3AD750FB887/en_US/00171e3b54b97dee8c1a2f6a62272640.png`
      break

    case (300, 301, 302, 310, 311, 312, 313, 314, 321): //drizzle
      weatherImg = `https://help.apple.com/assets/656912ADA28BF1B7E90BF0F6/656912B3021EA3AD750FB887/en_US/a55fef55bbeb0762a8dd329b4b8ad342.png`
      break

    case (701, 711, 721, 731, 741, 751, 762, 771, 781): //fog
      weatherImg = `https://help.apple.com/assets/656912ADA28BF1B7E90BF0F6/656912B3021EA3AD750FB887/en_US/d35bb25d12281cd9ee5ce78a98cd2aa7.png`
      break
  }

  function getTime() {
    const date = new Date()
    const showTime = date.getHours() + ":" + (date.getMinutes() < 10 ? "0" : "") + date.getMinutes()
    return showTime
  }

  return (
    <div className='card'>
      <header className='header'>
        <p>
          <strong>Current Weather in:</strong> {location}
        </p>
        <p>
          <strong>{getTime()}</strong>
        </p>
      </header>
      <div className='cardbody'>
        <div className='weather'>
          <div className='imgweather'>
            <img src={weatherImg} alt='Weather'></img>
            <h1>{Number(temperature).toFixed(0)} °C</h1>
          </div>
          <p className='weatherText'>
            <strong>Weather:</strong> {weather}
          </p>
        </div>
        <div className=' details'>
          <div className='element'>
            <p className='pp'>Feels Like: </p>
            <p>
              <strong>{Number(feeltemperature).toFixed(0)} °C</strong>
            </p>
          </div>
          <div className='element'>
            <p className='pp'>Wind</p>
            <p>
              <strong>{wind} m/s</strong>
            </p>
          </div>
          <div className='element'>
            <p className='pp'>Humidity</p>
            <p>
              <strong>{humidity}%</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
