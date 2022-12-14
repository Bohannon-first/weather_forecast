/* eslint-disable no-undef */
import {listBigCardsWeather, movableElementToFavorites} from './favorites-cities.js';
import {arrayDataCities} from './server.js';
import {searchCity} from './search.js';

// Координаты города по умолчанию и когда нет меток на карте
const COORDINATES_MAIN_CITY = {
  latitude: 55.7,
  longitude: 37.6,
};

// Зум карты
const MAIN_ZOOM = 10;
// Главная метка
const MAIN_PIN = './img/icon/icon-pin-blue.png';
// Метка при наведении
const SECOND_PIN = './img/icon/icon-pin-red.png';
// Размеры главной метки
const MAIN_PIN_SIZE = {
  width: 52,
  height: 52,
};
// Хранилище для геообъектов(меток)
let storagePlacemarks = null;
// Карта
let myMap = null;

// Кнопка закрытия подсказки на карте
const btnCloseHintOnMap = document.querySelector('#button-close-hint');

// Появление через промежуток времени подсказки на карте об использовании поиска
setTimeout(() => {
  // Проверка, если поиск спрятан (на палец не нажали), то показать подсказку
  if (window.getComputedStyle(searchCity).transform.includes(-350)) {
    document.querySelector('.weather-app__map__hint').style.display = 'flex';
  } else {
    return false;
  }
}, 5000);

// Удаление дубликатов меток с карты
const deleteDuplicatePlacemarks = (storage) => {
  for (let i = 0; i < storage._objects.length; i++) {
    const cityName = storage._objects[i].properties._data.hintContent;
    for (let j = i + 1; j < storage._objects.length; j++) {
      const nameCity = storage._objects[j].properties._data.hintContent;
      if (cityName === nameCity) {
        myMap.geoObjects.remove(storage._objects[j]);
        storage = ymaps.geoQuery(myMap.geoObjects).addToMap(myMap);
      }
    }
  }
};

// Функция инициализации карты
const init = () => {
  myMap = new ymaps.Map('weather-map', {
    center: [COORDINATES_MAIN_CITY.latitude, COORDINATES_MAIN_CITY.longitude],
    zoom: MAIN_ZOOM,
    controls: ['zoomControl']
  });

  // Добавление меток на карту
  listBigCardsWeather.addEventListener('drop', (evt) => {
    evt.preventDefault();
    const cityForPlacemark = movableElementToFavorites.querySelector('.small-card__city').textContent;
    arrayDataCities.forEach((city) => {
      if (cityForPlacemark === city.name) {
        const myPlacemark = new ymaps.Placemark([city.coord.lat, city.coord.lon], {hintContent: city.name},
          {
            iconLayout: 'default#image',
            iconImageHref: MAIN_PIN,
            iconImageSize: [MAIN_PIN_SIZE.width, MAIN_PIN_SIZE.height],
            iconImageOffset: [-26, -52]
          });

        myMap.geoObjects
          .add(myPlacemark);

        // Добавление меток в выборку, с последующим добавлением на карту
        storagePlacemarks = ymaps.geoQuery(myMap.geoObjects).addToMap(myMap);
        deleteDuplicatePlacemarks(storagePlacemarks);
        // Центрирование всех меток на экране
        myMap.setBounds(myMap.geoObjects.getBounds(), {
          checkZoomRange: true,
          zoomMargin: 30
        });

        // Изменение цвета меток при наведении курсора на метку
        myPlacemark.events.add('mouseenter', (event) => {
          const object = event.get('target');
          object.options.set('iconImageHref', SECOND_PIN);

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
          object.options.set('iconImageHref', MAIN_PIN);

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
          myMap.setCenter([object.geometry._coordinates[0], object.geometry._coordinates[1]], MAIN_ZOOM, {
            checkZoomRange: true
          });
        });
      }
    });
  });

  // При двойном клике по карте зума не будет
  myMap.events.add('dblclick', (evt) => {
    evt.preventDefault();
  });
};

// Статической функцией ready при успешной загрузке API и DOM вызываем коллбэк
ymaps.ready(init);

// Функция удаления меток с карты
const removePlacemark = (element, storage) => {
  const cityName = element.querySelector('.big-card__city').textContent;
  storage._objects.forEach((object) => {
    if (cityName === object.properties._data.hintContent) {
      myMap.geoObjects.remove(object);
      storage = ymaps.geoQuery(myMap.geoObjects).addToMap(myMap);
      if (!storage._objects.length) {
        myMap.setCenter([COORDINATES_MAIN_CITY.latitude, COORDINATES_MAIN_CITY.longitude], MAIN_ZOOM, {
          checkZoomRange: true
        });
        // Проверка на наличие одной метки на карте
      } else if (storage._objects.length === 1) {
        // Установление определенного масштаба карты, когда осталась одна метка на карте
        myMap.setCenter([storage._objects[0].geometry._coordinates[0], storage._objects[0].geometry._coordinates[1]], MAIN_ZOOM, {
          checkZoomRange: true
        });
        const centerAndZoom = myMap.util.bounds.getCenterAndZoom(bounds, myMap.container.getSize());
        myMap.setCenter(centerAndZoom.center, centerAndZoom.zoom, {
          checkZoomRange: true
        });
      }
    }
  });
};

// Проверка, одна ли метка на карте
const isOnePlacemark = (storage, map) => {
  if (storage._objects.length === 1) {
    map.setCenter([storage._objects[0].geometry._coordinates[0], storage._objects[0].geometry._coordinates[1]], MAIN_ZOOM, {
      checkZoomRange: true
    });
    try {
      const centerAndZoom = map.util.bounds.getCenterAndZoom(bounds, map.container.getSize());
      map.setCenter(centerAndZoom.center, centerAndZoom.zoom, {
        checkZoomRange: true
      });
    } catch (err) {
      // Комментарий, чтобы eslint не ругался на пустой блок
    }
  }
};

// Удаление подсказки с карты об использовании поиска
const closeHintOnMap = () => {
  document.querySelector('.weather-app__map__hint').style.animation = 'hiddenHintOnMap 400ms';
  setTimeout(() => {
    document.querySelector('.weather-app__map__hint').style.display = 'none';
  }, 400);
};

btnCloseHintOnMap.addEventListener('click', closeHintOnMap);

export {storagePlacemarks, removePlacemark, isOnePlacemark, myMap, MAIN_PIN, SECOND_PIN, MAIN_ZOOM, closeHintOnMap};
