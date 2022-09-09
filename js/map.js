/* eslint-disable no-undef */
import {listBigCardsWeather, movableElementToFavorites} from './favorites-cities.js';
import {arrayDataCities} from './server.js';

// Хранилище для геообъектов(меток)
let storagePlacemarks = null;
// Карта
let myMap = null;

// Функция инициализации карты
const init = () => {
  myMap = new ymaps.Map('weather-map', {
    center: [55.7, 37.6],
    zoom: 10,
    controls: []
  });

  // Добавление маркеров на карту
  listBigCardsWeather.addEventListener('drop', (evt) => {
    evt.preventDefault();
    const cityForPlacemark = movableElementToFavorites.querySelector('.small-card__city').textContent;
    arrayDataCities.forEach((city) => {
      if (cityForPlacemark === city.name) {
        const myPlacemark = new ymaps.Placemark([city.coord.lat, city.coord.lon], {hintContent: city.name},
          {
            iconLayout: 'default#image',
            iconImageHref: './img/icon/icon-pin-blue.png',
            iconImageSize: [52, 52],
            iconImageOffset: [-26, -52]
          });

        myMap.geoObjects
          .add(myPlacemark);

        storagePlacemarks = ymaps.geoQuery(myMap.geoObjects).addToMap(myMap);
        // console.log(storagePlacemarks);

        myMap.setBounds(myMap.geoObjects.getBounds(), {
          checkZoomRange: true,
          zoomMargin: 20
        });

        if (storagePlacemarks._objects === 1) {
          // console.log('Один элемент на карте');

          myMap.setZoom(10, {});
          // myMap.setCenter([arrayPlacemark[0].geometry._coordinates[0], arrayPlacemark[0].geometry._coordinates[1]], 10, {
          //   checkZoomRange: true
          // });
        }
        // Изменение цвета меток при наведении курсора на метку
        myPlacemark.events.add('mouseenter', (event) => {
          const object = event.get('target');
          object.options.set('iconImageHref', './img/icon/icon-pin-red.png');

          // Изменение подсветки избранных городов при наведении на метки
          const bigCardCities = listBigCardsWeather.querySelectorAll('.big-card');
          bigCardCities.forEach((cityName) => {
            const bigCityName = cityName.querySelector('.big-card__city').textContent;
            if (object.properties._data.hintContent === bigCityName) {
              cityName.querySelector('.big-card__city').style.color = 'var(--color-text-white)';
              cityName.querySelector('.big-card__temperature').style.color = 'var(--color-text-white)';
              cityName.querySelector('.big-card__wind-info').style.color = 'var(--color-text-white)';
              cityName.querySelector('.big-card__header').style.backgroundColor = 'var(--color-blue-light)';
              cityName.querySelector('.big-card__content').style.backgroundColor = 'var(--color-blue-main)';
            }
          });
        });

        // Изменение цвета меток при уводе курсора с метки
        myPlacemark.events.add('mouseleave', (event) => {
          const object = event.get('target');
          object.options.set('iconImageHref', './img/icon/icon-pin-blue.png');

          // Возвращение подсветки избранных городов к первоначальной при уводе курсора с метки
          const bigCardCities = listBigCardsWeather.querySelectorAll('.big-card');
          bigCardCities.forEach((cityName) => {
            const bigCityName = cityName.querySelector('.big-card__city').textContent;
            if (object.properties._data.hintContent === bigCityName) {
              cityName.querySelector('.big-card__city').style.color = '';
              cityName.querySelector('.big-card__temperature').style.color = '';
              cityName.querySelector('.big-card__wind-info').style.color = '';
              cityName.querySelector('.big-card__header').style.backgroundColor = '';
              cityName.querySelector('.big-card__content').style.backgroundColor = '';
            }
          });
        });

        // Зум при клике на метки
        myPlacemark.events.add('click', (e) => {
          const object = e.get('target');
          myMap.setCenter([object.geometry._coordinates[0], object.geometry._coordinates[1]], 10, {
            checkZoomRange: true
          });
        });
      }
    });
  });
  // При двойном щелчке зума не будет
  myMap.events.add('dblclick', (evt) => {
    evt.preventDefault();
  });
};

// Функция удаления меток с карты
const removePlacemark = (element, storage) => {
  const cityName = element.querySelector('.big-card__city').textContent;
  storage._objects.forEach((object) => {
    if (cityName === object.properties._data.hintContent) {
      myMap.geoObjects.remove(object);
    }

  });
};

// Статической функцией ready при успешной загрузке API и DOM вызываем коллбэк
// eslint-disable-next-line no-undef
ymaps.ready(init);

export {storagePlacemarks, removePlacemark, myMap};
