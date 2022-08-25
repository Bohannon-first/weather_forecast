const ALERT_SHOW_TIME = 3000;

// Блок с возможной ошибкой запроса данных с сервера
const showAlert = () => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 1000;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.bottom = '400px';
  alertContainer.style.right = 0;
  alertContainer.style.padding = '100px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.color = 'white';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = 'Ошибка загрузки данных. Что-то пошло  не так!';

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};


// Конвертация из Кельвина в Цельсий
const convertToCelsius = (valueKelvin) => {
  const celsius = Math.round(valueKelvin - 273.15);
  return celsius > 0 ? `+${celsius}` : celsius;
};

// Расчет направления ветра, перевод из градусов
const getWindDirection = (degrees) => {
  if (degrees > 337.5) {return 'С';}
  if (degrees > 292.5) {return 'СЗ';}
  if (degrees > 247.5) {return 'З';}
  if (degrees > 202.5) {return 'ЮЗ';}
  if (degrees > 157.5) {return 'Ю';}
  if (degrees > 122.5) {return 'ЮВ';}
  if (degrees > 67.5) {return 'В';}
  if (degrees > 22.5) {return 'СВ';}
  return 'С';
};

// Отрисовка правильно иконки погоды
const renderIconWeather = function (city) {
  if (city.weather[0].main === 'Clear') {return 'sunny';}
  if (city.weather[0].description === 'небольшая облачность') {return 'few-clouds';}
  if (city.weather[0].main === 'Clouds') {return 'cloudy';}
  if (city.weather[0].main === 'Rain') {return 'rainy';}
  if (city.weather[0].main === 'Snow') {return 'snowy';}
  if (city.weather[0].main === 'Thunderstorm') {return 'stormy';}
};

// Получение описания погоды
const getDescriptionWeather = (city) => city.weather[0].description;

export {showAlert, convertToCelsius, getWindDirection, renderIconWeather, getDescriptionWeather};
