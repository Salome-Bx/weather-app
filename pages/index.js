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
  const [cityInput, setCityInput] = useState("Riga");
  const [triggerFetch, setTriggerFetch] = useState(true);
  const [weatherData, setMeteoData] = useState();
  const [weatherData2, setMeteoData2] = useState();
  const [unitSystem, setUnitSystem] = useState("metric");


  useEffect(() => {
      refreshMeteoData(() => {
      }); 
  }, []);


  
  const refreshMeteoData = async () => {

      const resCity = await fetch("/api/dataCity")
        .then((response) => {
            if(!response.ok){
              throw new Error("marche pas");
            }            
            return response.json();
        })
        
        .then((response) => {
          return response.results[0]; // Imprime la réponse pour vérifier sa structure
        })

      setMeteoData(resCity);
  console.log(data)
  
    const getWeatherData2 = await fetch("/api/dataMeteo", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
      },
        body: JSON.stringify({
          // latitude: resCity.latitude,
          // longitude: resCity.longitude,
          // timezone: resCity.timezone,
          // country: resCity.country,
        }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
      .then((data) => {
        console.log(data); // Imprime la réponse pour vérifier sa structure
      })
      
    
    setMeteoData2(getWeatherData2);
  }

  console.log(weatherData)


  const changeSystem = () =>
    unitSystem == "metric"
      ? setUnitSystem("imperial")
      : setUnitSystem("metric");

  return weatherData && !weatherData.message ? (
    <div className={styles.wrapper}>
      <MainCard
        city={weatherData.name}
        country={weatherData.country_code}
        // description={weatherData.weather[0].description}
        // iconName={weatherData.weather[0].icon}
        unitSystem={unitSystem}
        weatherData={weatherData}
      />
      <ContentBox>
        <Header>
          <DateAndTime weatherData={weatherData} unitSystem={unitSystem} />
          <Search
            placeHolder="Search a city..."
            value={cityInput}
            onFocus={(e) => {
              e.target.value = "";
              e.target.placeholder = "";
            }}
            onChange={(e) => setCityInput(e.target.value)}
            onKeyDown={(e) => {
              e.keyCode === 13 && setTriggerFetch(!triggerFetch);
              e.target.placeholder = "Search a city...";
            }}
          />
        </Header>
        <MetricsBox weatherData={weatherData} unitSystem={unitSystem} />
        <UnitSwitch onClick={changeSystem} unitSystem={unitSystem} />
      </ContentBox>
    </div>
  ) : weatherData && weatherData.message ? (
    <ErrorScreen errorMessage="City not found, try again!">
      <Search
        onFocus={(e) => (e.target.value = "")}
        onChange={(e) => setCityInput(e.target.value)}
        onKeyDown={(e) => e.keyCode === 13 && setTriggerFetch(!triggerFetch)}
      />
    </ErrorScreen>
  ) : (
    <LoadingScreen loadingMessage="Loading data..." />
  );
};

export default App;
