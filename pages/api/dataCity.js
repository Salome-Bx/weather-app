export default async function handler(req, res) {
    try {
        const getCityData = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${process.env.CITY}&language=${process.env.LANGUAGE}&limit=1`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!getCityData.ok) {
            throw new Error('Problème avec la requête HTTP');
        }
        // récupère les informations de la ville
        const data = await getCityData.json();
        // récupère la latitude et longitude
        const firstResultLatitude = data.results[0].latitude;
        const firstResultLongitude = data.results[0].longitude;
        
        console.log(firstResultLatitude, firstResultLongitude); 

        res.status(200).json({ latitude: firstResultLatitude, longitude: firstResultLongitude }); // Retourner la latitude et la longitude dans la réponse
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Echec de récupération des données' });
    }
}
