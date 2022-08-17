// Функция инициализации карты
const init = () => {
  const myMap = new ymaps.Map('weather-map', {
    center: [55.7, 37.6],
    zoom: 10,
    controls: []
  });

  // myMap.controls.remove('trafficControl');
  // myMap.controls.remove('zoomControl');

};
// Статической функцией ready при успешной загрузке API и DOM вызываем коллбэк
ymaps.ready(init);
