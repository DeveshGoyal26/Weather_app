let whole_div = document.getElementById("whole_div");
let weather_div = document.getElementById("weather_div");
let map = document.getElementById("map");
let time_p = document.getElementById("time");
let weather_icon = document.getElementById("weather_icon");
let forcast_div = document.getElementById("forcast_div");
let second_div = document.getElementById("second");
let city_name = document.getElementById("city_name");
let left_div = document.getElementById("left_div");
let weather_des = document.getElementById("weather_des");

async function getdata() {
  let city = document.getElementById("city").value;
  try {
    let res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=6da0b078b94615df468fc2fdeb498e9f&units=metric`
    );
    let data = await res.json();
    appendingdata(data);
    console.log("data:", data);
  } catch (err) {
    console.log("err:", err);
  }
}

function appendingdata(data) {
  left_div.style.display = "flex";
  weather_div.innerText = null;
  weather_des.innerText = data.weather[0].description;

  city_name.innerText = data.name;

  let date = new Date(data.dt * 1000);

  time_p.innerText = date.toTimeString();

  weather_icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  let temp = document.getElementById("temp");
  temp.innerHTML = data.main.temp + "<span>&#176;</span>" + "C";

  let pressure = document.createElement("div");
  let pressure_p = document.createElement("p");
  let pressure_n = document.createElement("h4");
  pressure_p.innerText = "Pressure";
  pressure_n.innerText = data.main.pressure + " mb";
  pressure.append(pressure_p, pressure_n);

  let humidity = document.createElement("div");
  let humidity_p = document.createElement("p");
  let humidity_n = document.createElement("h4");
  humidity_p.innerText = "Humidity";
  humidity_n.innerText = data.main.humidity + "%";
  humidity.append(humidity_p, humidity_n);

  let wind = document.createElement("div");
  let wind_p = document.createElement("p");
  let wind_n = document.createElement("h4");
  wind_p.innerText = "Wind";
  wind_n.innerText = data.wind.speed + " km/h";
  wind.append(wind_p, wind_n);

  let vis = document.createElement("div");
  let vis_p = document.createElement("p");
  let vis_n = document.createElement("h4");
  vis_p.innerText = "Visibility";
  vis_n.innerText = data.visibility / 1000 + " km";
  vis.append(vis_p, vis_n);

  map.src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyCB10qH3P2cimIqRp416E2WOZVopAAkxzk
    &q=${data.name}`;

  weather_div.append(pressure, humidity, wind, vis);

  daily(data);

  async function daily(data) {
    try {
      let res = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=hourly,minutely&appid=6da0b078b94615df468fc2fdeb498e9f&units=metric`
      );

      let daily_data = await res.json();
      console.log("daily_data:", daily_data);
      forcast(daily_data);
    } catch (err) {
      console.log("err:", err);
    }
  }

  function forcast(daily_data) {
    let Daily = daily_data.daily;
    forcast_div.innerText = null;
    Daily.map(function (elem, index) {
      if (index != 0) {
        let forcast_innerdiv = document.createElement("div");
        let temp_div = document.createElement("div");

        let data = new Date(elem.dt * 1000);

        let h3 = document.createElement("h3");

        h3.innerText = data.toDateString();

        let img = document.createElement("img");

        img.src = `http://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png`;

        let temp_h2 = document.createElement("h2");

        temp_h2.innerHTML = elem.temp.day + "<span>&#176;</span>" + "C";

        temp_div.append(img, temp_h2);

        forcast_innerdiv.append(temp_div, h3);
        forcast_div.append(forcast_innerdiv);
      }
    });
  }
}
