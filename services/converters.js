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
    "SSO",
    "SO",
    "OSO",
    "O",
    "ONO",
    "NO",
    "NNO",
  ];
  return arr[val % 16];
};



export const unixToLocalTime = (unixSeconds, timezone) => {

  const date = new Date(unixSeconds);

  const options = {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: 'long',
    year: '2-digit',
    timeZone: timezone,
    hour12: false
  };

  const formatter = new Intl.DateTimeFormat('fr-FR', options);
  console.log(formatter);
  return formatter.format(date);

};




