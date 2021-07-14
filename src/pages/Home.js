import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import { GetWeather } from '../api/weather';
import { getCities } from '../api/dadata';

function Home() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [cities, setCities] = useState([])

  const UseWeather = (city) => {
    GetWeather(city).then((res)=> {
      setWeather(res)
      setInputValue(city)
      setLoading(false)
      localStorage.setItem('city', city)
    }).catch(()=>{
      setError(true)
      setInputValue('City is not found')
    })
  }

  const changeInput = (e) => {
    if ( error === true ){
      setError(false)
      setInputValue('')
      return
    }
    setInputValue(e.target.value)
    getCities(e.target.value).then((res) => {
      setCities(res)
    })
  }

  const sendCity = (e) => {
    e.preventDefault()
    UseWeather(inputValue)
  }

  const setActive = (date) => {
    const temporaryObj = { ...weather }
    for ( let item in temporaryObj ){
      temporaryObj[item].map((el) => {
        if(el.date !== date){
          el.active = false
        }else{
          el.active = true
        }
      });
    }
    setWeather(temporaryObj)
  }

  const selectCity = (e) => {
    const text = e.target.outerText
    setInputValue(text)
    UseWeather(text)
    setCities([])
  }

  useEffect(()=> {
    UseWeather(localStorage.getItem('city') || 'Moscow') 
  }, [])

  return (
    <>
      <form onSubmit={sendCity} className={error === true ? "search error" : "search"}>
        <input 
          onInput={changeInput} 
          value={inputValue} 
          onClick={changeInput}
          type="text" 
          id='search-input'
          autoComplete='off'
        />
        <button type="submit" htmlFor='search-input' className="search-icon"></button>
        <ul className="cities-autocomplete">
          {cities.map((item, index) => (
            <li onClick={selectCity} key={index}>
              {item}
            </li>
          ))}
        </ul>
      </form>
      {!loading && 
      <>
        <h2 className="slider-header">today</h2>
        <Swiper
          spaceBetween={26}
          slidesPerView={4}
          centeredSlides={true}
        >
          {weather.today.map((slide, index) => (
            <SwiperSlide onClick={()=>{setActive(slide.date)}} key={index} className={slide.active === true ? 'slider-item active' : 'slider-item'}>
              <div className="slider-item_time">
                {slide.time}
                <div className="slider-item_time-line"></div>
              </div>
              <div className="slider-item_block">
                <div className="slider-item_block-left">
                  <div className="main">
                    <img src={slide.icon} alt="icon" />
                    <p>{slide.main}</p>
                  </div>
                  <div className="temp">
                    <p className="number">{slide.realFeel}<span>°C</span></p>
                    <p className="text">perceived</p>
                  </div>
                  <div className="temp">
                    <p className="number">{slide.temp}<span>°C</span></p>
                    <p className="text">actual</p>
                  </div>
                </div>
                <div className="slider-item_block-right">
                  <div>
                    <div className="humidity">
                      <div className="img" />
                      <p>{slide.humidity}%</p>
                    </div>
                    <div className="wind">
                      <div className="img" />
                      <p>{slide.windSpeed}m/s</p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <h2 className="slider-header">tomorrow</h2>
        <Swiper
          spaceBetween={26}
          slidesPerView={4}
          centeredSlides={true}
          centeredSlidesBounds={true}
          initialSlide={4}
        >
          {weather.tomorrow.map((slide, index) => (
            <SwiperSlide onClick={()=>{setActive(slide.date)}} key={index} className={slide.active === true ? 'slider-item active' : 'slider-item'}>
              <div className="slider-item_time">
                {slide.time}
                <div className="slider-item_time-line"></div>
              </div>
              <div className="slider-item_block">
                <div className="slider-item_block-left">
                  <div className="main">
                    <img src={slide.icon} alt="icon" />
                    <p>{slide.main}</p>
                  </div>
                  <div className="temp">
                    <p className="number">{slide.realFeel}<span>°C</span></p>
                    <p className="text">perceived</p>
                  </div>
                  <div className="temp">
                    <p className="number">{slide.temp}<span>°C</span></p>
                    <p className="text">actual</p>
                  </div>
                </div>
                <div className="slider-item_block-right">
                  <div>
                    <div className="humidity">
                      <div className="img" />
                      <p>{slide.humidity}%</p>
                    </div>
                    <div className="wind">
                      <div className="img" />
                      <p>{slide.windSpeed}m/s</p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <h2 className="slider-header">{weather.afterTomorrow[0].month} {weather.afterTomorrow[0].date.getDate()}, {weather.afterTomorrow[0].day}</h2>
        <Swiper
          spaceBetween={26}
          slidesPerView={4}
          centeredSlides={true}
          centeredSlidesBounds={true}
          initialSlide={4}
        >
          {weather.afterTomorrow.map((slide, index) => (
            <SwiperSlide onClick={()=>{setActive(slide.date)}} key={index} className={slide.active === true ? 'slider-item active' : 'slider-item'}>
              <div className="slider-item_time">
                {slide.time}
                <div className="slider-item_time-line"></div>
              </div>
              <div className="slider-item_block">
                <div className="slider-item_block-left">
                  <div className="main">
                    <img src={slide.icon} alt="icon" />
                    <p>{slide.main}</p>
                  </div>
                  <div className="temp">
                    <p className="number">{slide.realFeel}<span>°C</span></p>
                    <p className="text">perceived</p>
                  </div>
                  <div className="temp">
                    <p className="number">{slide.temp}<span>°C</span></p>
                    <p className="text">actual</p>
                  </div>
                </div>
                <div className="slider-item_block-right">
                  <div>
                    <div className="humidity">
                      <div className="img" />
                      <p>{slide.humidity}%</p>
                    </div>
                    <div className="wind">
                      <div className="img" />
                      <p>{slide.windSpeed}m/s</p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <h2 className="slider-header">{weather.after2days[0].month} {weather.after2days[0].date.getDate()}, {weather.after2days[0].day}</h2>
        <Swiper
          spaceBetween={26}
          slidesPerView={4}
          centeredSlides={true}
          centeredSlidesBounds={true}
          initialSlide={4}
        >
          {weather.after2days.map((slide, index) => (
            <SwiperSlide onClick={()=>{setActive(slide.date)}} key={index} className={slide.active === true ? 'slider-item active' : 'slider-item'}>
              <div className="slider-item_time">
                {slide.time}
                <div className="slider-item_time-line"></div>
              </div>
              <div className="slider-item_block">
                <div className="slider-item_block-left">
                  <div className="main">
                    <img src={slide.icon} alt="icon" />
                    <p>{slide.main}</p>
                  </div>
                  <div className="temp">
                    <p className="number">{slide.realFeel}<span>°C</span></p>
                    <p className="text">perceived</p>
                  </div>
                  <div className="temp">
                    <p className="number">{slide.temp}<span>°C</span></p>
                    <p className="text">actual</p>
                  </div>
                </div>
                <div className="slider-item_block-right">
                  <div>
                    <div className="humidity">
                      <div className="img" />
                      <p>{slide.humidity}%</p>
                    </div>
                    <div className="wind">
                      <div className="img" />
                      <p>{slide.windSpeed}m/s</p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
      }
    </>
  );
}

export default Home;
