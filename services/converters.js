export const ctoF = (c) => (c * 9) / 5 + 32;

export const mpsToMph = (mps) => (mps * 2.236936).toFixed(2);

export const kmToMiles = (km) => (km / 1.609).toFixed(1);

export const timeTo12HourFormat = (time) => {
  let [hours, minutes] = time.split(":");
  return `${(hours %= 12) ? hours : 12}:${minutes}`;
};

export const degToCompass = (num) => {
  var val = Math.round(num / 22.5);
  var arr = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  return arr[val % 16];
};



export const isoToLocalTime = (time, timezone) => {
  // Créer une instance de Date à partir de la chaîne de caractères ISO 8601
  let date = new Date(time);

  if (isNaN(date.getTime())) {
    console.error("Erreur: La date n'est pas valide.");
    return "";
  }

  let options = {
    
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: timezone
  };

  // Utiliser 'en-GB' pour le format JJ Mois YYYY HH:MM
  const formatter = new Intl.DateTimeFormat('fr-FR', options);

  // Formater la date selon les options spécifiées
  console.log(formatter.format(date));
  return formatter.format(date);
  
};




