import { useState, useEffect } from "react";
import { MainCard } from "../components/MainCard";
import { ContentBox } from "../components/ContentBox";
import { Header } from "../components/Header";
import { DateAndTime } from "../components/DateAndTime";
import { Search } from "../components/Search";
import { MetricsBox } from "../components/MetricsBox";
import { UnitSwitch } from "../components/UnitSwitch";
import { LoadingScreen } from "../components/LoadingScreen";
import { ErrorScreen } from "../components/ErrorScreen";
import styles from "../styles/Home.module.css";

export const App = () => {
 

  const [cityData, setCityData] = useState();
  const [weatherData, setWeatherData] = useState();
  const [unitSystem, setUnitSystem] = useState("metric");


  useEffect(() => {
      refreshMeteoData(() => {
      }); 
  }, 60 * 60 * 1000);


  
  const refreshMeteoData = async () => {

      const resCity = await fetch("/api/dataCity")
        .then((response) => {
            if(!response.ok){
              throw new Error("Les données n'ont pas pu être récupérées");
            }            
            return response.json();
        })
        
        .then((response) => {
          return response.results[0]; 
        })

      setCityData(resCity);
  
  
    const resWeather = await fetch("/api/dataMeteo", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
      },
        body: JSON.stringify({
          latitude: resCity.latitude,
          longitude: resCity.longitude,
          timezone: resCity.timezone,
          country: resCity.country,
        }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Les données n'ont pas pu être récupérées");
      }
      return response.json();
    })
      .then((response) => {
        
        console.log(response); 
        return response;
      })
      
    
    setWeatherData(resWeather);
  }



  

  const changeSystem = () =>
    unitSystem == "metric"
      ? setUnitSystem("imperial")
      : setUnitSystem("metric");

      return weatherData && !weatherData.message ? (
        <div className={styles.wrapper}>
      <MainCard
        city={cityData.name}
        country={cityData.country_code}
        iconName={weatherData.current.weather_code}
        unitSystem={unitSystem}
        weatherData={weatherData}
        />
      <ContentBox>
        <Header>
          <DateAndTime weatherData={weatherData} unitSystem={unitSystem} />
        </Header>
        <MetricsBox weatherData={weatherData} unitSystem={unitSystem} />
        <UnitSwitch onClick={changeSystem} unitSystem={unitSystem} />
      </ContentBox>
    </div>
  ) : (
    <LoadingScreen loadingMessage="Importation des données..." />
  );
};

export default App;
