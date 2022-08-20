// Функция инициализации карты
const init = () => {
  // eslint-disable-next-line no-unused-vars, no-undef
  const myMap = new ymaps.Map('weather-map', {
    center: [55.7, 37.6],
    zoom: 10,
    controls: []
  });
};
// Статической функцией ready при успешной загрузке API и DOM вызываем коллбэк
// eslint-disable-next-line no-undef
ymaps.ready(init);
