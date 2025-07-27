"use client"
import React, { useState , useRef} from 'react'
import Image from 'next/image'
import { Poppins } from 'next/font/google';

const poppinsFont = Poppins({
        subsets: ["latin"],
        weight: "400"
})

function Card() {

    let inputRef = useRef(null);
    
    const apiKey = "c7778d3da8992adbc6bafb33fe2df317";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

    const [cityName , setCityName] = useState("city name");
    const [temp, setTemp] = useState("0");
    const [humidity , setHumidity] = useState("00");
    const [wind , setWind] = useState("00");
    const [weatherIcon , setWeatherIcon] = useState("/") 

    const [errorStatus , setErrorStatus] = useState("nothig"); 
    const time = new Date();
    async function checkWeather(city){

        
        const response = await fetch(apiUrl +city+`&appid=${apiKey}`);
        
        if(response.status == 404){
            setErrorStatus("error");
        }

        else{
            let data = await response.json();
            setCityName(data.name) ;
            setTemp(Math.round(data.main.temp) +" °C");
            setHumidity(data.main.humidity+" %");
            setWind(data.wind.speed +" km/h");

            if(data.weather[0].main == "Clouds"){
                if(time>19){
                    setWeatherIcon("/clouds-n.png")

                }else{
                    setWeatherIcon("/clouds.png")
                }
                
            }
            else if(data.weather[0].main == "Clear"){
                if(time>19){
                    setWeatherIcon("/clear-n.png")

                }else{
                    setWeatherIcon("/clear.png")
                }
            }
            else if(data.weather[0].main == "Rain"){
                if(time>19){
                    setWeatherIcon("/rain-n.png")

                }else{
                    setWeatherIcon("/rain.png")
                }
            }
            else if(data.weather[0].main == "Drizzle"){
                if(time>19){
                    setWeatherIcon("/drizzle-n.png")

                }else{
                    setWeatherIcon("/drizzle.png")
                }
            }
            else if(data.weather[0].main == "Mist"){
                if(time>19){
                    setWeatherIcon("/mist-n.png")

                }else{
                    setWeatherIcon("/mist.png")
                }
            }
            else if(data.weather[0].main == "Snow"){
                if(time>19){
                    setWeatherIcon("/snow-n.png")

                }else{
                    setWeatherIcon("/snow.png")
                }
            }
            
            setErrorStatus("ok");

        }

    }

    
  return (
    <div className={`${poppinsFont.className} font-display box-border m-auto mt-20 pt-[25px] pb-[25px] max-w-[470px] w-90 rounded-[17px] bg-linear-65 from-purple-500 to-pink-500`}>
{/* search */}
        <div  className={`search flex items-center justify-center`}>
            <input type="text" ref={inputRef} placeholder='Enter city name' spellCheck='false' className='w-65 bg-white outline-none m-[8px] p-[10px] pl-[15px] rounded-[60px] text-black' />
            <button onClick={()=>checkWeather(inputRef.current.value)} className='flex justify-center items-center bg-white rounded-full m-[8px] w-[45px] h-[45px]'>
                <Image
                    src="/search.png"
                    width={20}
                    height={20}
                    alt="Search Logo"  
                />
            </button>
        </div>

{/* error */}
        <div className={`error w-90 text-left ml-[25px] ${errorStatus == "error"? `block` : `hidden`}`} >
            <p className='text-white'>⚠️ Invalid city name</p>
        </div>
{/* weather */}
        <div className={`weather m-auto flex-col justify-center text-[#fff]  w-75 ${errorStatus =="ok"?`block` : `hidden`}`}>
            <Image
                    src={`${weatherIcon}`}
                    width={120}
                    height={30}
                    alt="Searh Logo"
                    className="weather-icon m-auto mt-[40px]"
            />

            <h1 className="temp text-center text-[80px] mb-1">{temp}</h1>

            <h2 className="city text-center text-[45px] mb-10">{cityName}</h2>

            <div className="details flex text-[0.7rem] items-end justify-between">
                <div className="col flex items-center justify-center">
                    <Image
                        src="/humidity.png"
                        width={35}
                        height={35}
                        alt="Searh Logo"
                    />

                    <div className='ml-[10px]'>
                        <p className="humidity">{humidity}</p>
                        <p>Humidity</p>
                    </div>
                </div>


                <div className="col flex items-center justify-center">
                    <Image
                        src="/wind.png"
                        width={35}
                        height={35}
                        alt=""
                    />
                    <div  className='ml-[10px]'>
                        <p className="wind">{wind}</p>
                        <p>Wind Speed</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}


export default Card