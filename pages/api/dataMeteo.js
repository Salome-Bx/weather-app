export default async function handler(req, res) {
  const { cityInput } = req.body;
  // const getWeatherData = await fetch(
  //   `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`
  // );
  const getMeteoData = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m&forecast_days=1&models=meteofrance_seamless`
  );
  const MeteoData = await getMeteoData.json();
  res.status(200).json(MeteoData);
}
