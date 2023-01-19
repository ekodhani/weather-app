import React, {useState} from "react";
import './App.css';
import find from './assets/images/Search.png';

function App() {
  // apiKey
  const apiKey = "fefca246d7e6c25371b34420b28c3e69";
  // element Card
  const main = document.getElementById('main');
  // element input
  const search = document.getElementById('search');
  // set url
  const url = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}`;
  // set state city
  const [city, setCity] = useState("");
  
  const getWeatherByLocation = async (city) => {
    const resp = await fetch(url(city), {
        origin: "cros" });
    const respData = await resp.json();
    addWeatherToPage(respData);
  }

  const addWeatherToPage = (data) => {
    const temp = Ktoc(data.main.temp);
    const date = new Date();
    const current = date.toJSON().slice(0,10);

    const unix_timestamp = data.dt;
    const time = new Date(unix_timestamp * 1000);
    var hour = time.getHours();
    var minutes = "0" + time.getMinutes();
    const currentTime = hour + ':' + minutes.substr(-2) 

    const weather = document.createElement('div')
    weather.classList.add('card');

    weather.innerHTML = `
    <h1 className="celc">${temp}°C</h1>
    <div className="location">
      <h5>${data.name}</h5>
      <p>${current}</p>
    </div>
    <div className="icon">
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
      <p>${data.weather[0].main}</p>
    </div>`;

    main.innerHTML = "";
    main.appendChild(weather);
  };

  const Ktoc = (K) => {
    return Math.floor(K - 273.15);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const city = search.value;
    if (city) {
      getWeatherByLocation(city)
    }
  }


  return (
    <div className="App">
      <nav className="navbar">
          <span className="navbar-brand">Weather App</span>
          {/* <div className="toggle">
            ☀️
            <div className="switch">
              <input type="checkbox" defaultChecked/>
              <span className="slider"></span>
            </div>
            🌑
          </div> */}
      </nav>
      <div className="container">
        <main id="main"></main>
        <div>
          <h2 className="title">Where do we go ?</h2>
          <form id="form" onSubmit={handleSubmit}>
            <input type="text" id="search" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Another Location ?"></input>
            <button type="submit" className="btn">
              <img src={find} alt="Search" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
