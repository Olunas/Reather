import axios from 'axios'
import { useState, useEffect } from 'react'

const fetchWeatherApi = async (uri) => {
  const key = 'aafed98d71332af97b2baf828535a950'
  const url = `https://api.openweathermap.org/data/2.5/${uri}&appid=${key}`
  const { data } = await axios.get(url)
  return data
};

export const getForsecast = async (city) => {
  const uri = `forecast?units=metric&q=${city}`;
  return fetchWeatherApi(uri);
};

export const getCurrentForsecast = async (city) => {
  const uri = `weather?units=metric&q=${city}`
  return fetchWeatherApi(uri);
}

const getDay = function (day) {
    var days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];
  const d = new Date(day);
  const n = d.getDay();
  return(days[n]);
}

const getDirection = function (angle) {
  const directions = ['N', 'NW', 'W', 'SW', 'S', 'SE', 'E', 'NE']
  return directions[Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8]
}

export const GetWeather = async (city) => {
  const forsecast = await getForsecast(city)
  const current = await getCurrentForsecast(city)
  const weather = {};
  weather.today = [];
  weather.tomorrow = [];
  weather.afterTomorrow = [];
  weather.after2days = [];

  const currentDate = new Date()
  let lastWeatherDate = currentDate.setDate(currentDate.getDate() + 4)
  lastWeatherDate = new Date(lastWeatherDate)
  lastWeatherDate.setHours(23)

  forsecast.list.forEach(item =>{
    const dateReplaced = item.dt_txt.replace(' ', 'T')
    const date = new Date(dateReplaced)
    if ( date < lastWeatherDate && date > (new Date()) ){

      // get date & time
      const dateReplaced = item.dt_txt.replace(' ', 'T')
      const date = new Date(dateReplaced)
      const ho = new Intl.DateTimeFormat('ru', { hour: 'numeric' }).format(date);
      let mi = new Intl.DateTimeFormat('ru', { minute: 'numeric' }).format(date);
      if ( mi === "0" ){
        mi = mi + "0"
      }

      const weatherParams = {
        month: date.toLocaleString('en', { month: 'long' }),
        date: date,
        day: getDay(date),
        time: `${ho}:${mi}`,
        humidity: item.main.humidity,
        temp: Math.round(item.main.temp),
        realFeel: Math.round(item.main.feels_like),
        windDirection: getDirection(item.wind.deg),
        main: item.weather[0].main,
        windSpeed: item.wind.speed,
        icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
        active: false
      }

      let dateTomorrow = new Date().setDate(new Date().getDate() + 1)
      dateTomorrow = new Date(dateTomorrow).getDate()
      let dateAfterTomorrowDay = new Date().setDate(new Date().getDate() + 2)
      dateAfterTomorrowDay = new Date(dateAfterTomorrowDay).getDate()
      let dateAfter2Day = new Date().setDate(new Date().getDate() + 3)
      dateAfter2Day = new Date(dateAfter2Day).getDate()

      switch (date.getDate()) {
        case (new Date().getDate()):
          weather.today.push(weatherParams)
          break
        case (dateTomorrow):
          weather.tomorrow.push(weatherParams)
          break
        case (dateAfterTomorrowDay):
          weather.afterTomorrow.push(weatherParams)
          break
        case (dateAfter2Day):
          weather.after2days.push(weatherParams)
          break
        default:
          break
      }
    }
  })

  // add current date
  const date = new Date()
  const ho = new Intl.DateTimeFormat('ru', { hour: 'numeric' }).format(date);
  let mi = new Intl.DateTimeFormat('ru', { minute: 'numeric' }).format(date);
  if ( mi < 10 ){
    mi = "0" + mi
  }
  const currentParams = {
    month: date.toLocaleString('en', { month: 'long' }),
    date: date,
    day: getDay(date),
    time: `${ho}:${mi}`,
    humidity: current.main.humidity,
    temp: Math.round(current.main.temp),
    realFeel: Math.round(current.main.feels_like),
    windDirection: getDirection(current.wind.deg),
    main: current.weather[0].main,
    windSpeed: current.wind.speed,
    icon: `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`,
    active: true
  }
  
  weather.today.unshift(currentParams)

  return weather
}