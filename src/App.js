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
  let [weatherId, setWeatherId] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResult, setSearchResult] = useState(null)
  let [timeOf, setTimeOf] = useState(null)
  let [timeZone, setTimeZone] = useState(null)
  let weatherImg
  const iconLink = "https://help.apple.com/assets/656912ADA28BF1B7E90BF0F6/656912B3021EA3AD750FB887/en_US/"
  const APIURL = "YOUR_API_KEY"

  const search = async (city) => {
    try {
      if (city) {
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIURL}`)
        const data = await response.json()
        setLat(data[0].lat)
        setLong(data[0].lon)
        setSearchResult(data)
      } else {
        navigator.geolocation.getCurrentPosition(function (position) {
          setLat(position.coords.latitude)
          setLong(position.coords.longitude)
          setSearchResult(null)
        })
      }
    } catch (error) {
      console.error("Error searching for city:", error.message)
    }
  }

  useEffect(() => {
    search()
  }, [searchTerm])

  useEffect(() => {
    const fetchData = async () => {
      if (lat !== null && long !== null) {
        try {
          const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${APIURL}`)
          const result = await response.json()
          setData(result)
          setLocation(result.name)
          setTemperature(result.main?.temp)
          setFeelTemperature(result.main?.feels_like)
          setWeather(result.weather[0]?.main)
          setWind(result.wind.speed)
          setHumidity(result.main.humidity)
          setWeatherId(result.weather[0].id)
          setTimeOf(result.dt)
          setTimeZone(result.timezone)
          console.log(result)
        } catch (error) {
          console.error("Error fetching weather data:", error.message)
        }
      }
    }

    fetchData()
  }, [lat, long])

  if (weatherId === 800) {
    weatherImg = `${iconLink}575900edccbc7def167f7874c02aeb0b.png`
  } else if (weatherId === 801) {
    weatherImg = `${iconLink}67aaf9dbe30989c25cbde6c6ec099213.png`
  } else if (weatherId === 802 || 803 || 804) {
    weatherImg = `${iconLink}66117fab0f288a2867b340fa2fcde31b.png`
  } else if (weatherId === 600 || 601 || 602 || 612 || 613 || 615 || 616 || 620 || 621 || 622) {
    weatherImg = `${iconLink}00171e3b54b97dee8c1a2f6a62272640.png`
  } else if (weatherId === 500 || 501 || 502 || 503 || 504 || 611 || 520 || 521 || 522 || 531) {
    weatherImg = `${iconLink}4417bf88c7bbcd8e24fb78ee6479b362.png`
  } else if (weatherId === 200 || 201 || 202 || 210 || 211 || 212 || 221 || 230 || 231 || 232) {
    weatherImg = `${iconLink}efffb1e26f6de5bf5c8adbd872a2933a.png`
  } else if (weatherId === 300 || 301 || 302 || 310 || 311 || 312 || 313 || 314 || 321) {
    weatherImg = `${iconLink}a55fef55bbeb0762a8dd329b4b8ad342.png`
  } else if (weatherId === 701 || 711 || 721 || 731 || 741 || 751 || 762 || 771 || 781) {
    weatherImg = `${iconLink}d35bb25d12281cd9ee5ce78a98cd2aa7.png`
  }

  function getTime() {
    let unixTimestamp = timeOf + timeZone

    let dateObj = new Date(unixTimestamp * 1000)
    let hours = dateObj.getUTCHours()
    let minutes = dateObj.getUTCMinutes()
    let formattedTime = hours.toString().padStart(2, "0") + ":" + minutes.toString().padStart(2, "0")

    return formattedTime
  }
  getTime()

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      search(searchTerm)
    }
  }

  return (
    <>
      <span className='search'>
        <input className='searchInput' placeholder='Search for a city...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={handleKeyDown} />
        <button className='searchBtn' onClick={() => search(searchTerm)}>
          ➔
        </button>
      </span>
      <div className='card'>
        <header className='header'>
          <p>
            <strong>Current Weather in:</strong> {location}
          </p>
          <p>
            Local Time: <strong>{getTime()}</strong>
          </p>
        </header>
        <div className='cardbody'>
          <div className='weather'>
            <div className='imgweather'>
              <img src={weatherImg} alt='Weather'></img>
              <h1>{Number(temperature).toFixed(0)}°C</h1>
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
    </>
  )
}
