export default async function handler(req, res) {

  try {
    const { latitude, longitude, timezone, country } = req.body;

    const getMeteoData = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m&forecast_days=1&models=meteofrance_seamless`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },        
      }
    );
    if (!getMeteoData.ok) {
      throw new Error("Problème avec la requête HTTP");
    }
    const MeteoData = await getMeteoData.json();
    res.status(200).json(MeteoData);
    

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Echec de récupération des données" });
  }
}
