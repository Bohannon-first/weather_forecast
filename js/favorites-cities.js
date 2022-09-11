import {listSmallCardsWeather} from './available-cities.js';
import {arrayDataCities} from './server.js';
import {convertToCelsius, getWindDirection, renderIconWeather, getDescriptionWeather} from './util.js';
import {getSortedListAlphabet, getSortedListAlphabetReverse} from './sorting.js';
import {storagePlacemarks, removePlacemark, isOnePlacemark, myMap} from './map.js';

const listBigCardsWeather = document.querySelector('.weather-content__big-cards');
const emptyCardVisual = document.createElement('div');
emptyCardVisual.classList.add('big-card', 'big-card--empty');

// Функция создания разметки карточки для избранного города
const getRenderFavouriteCity = (movableElement, arrayData) => {
  const cityName = movableElement.querySelector('.small-card__city');
  for (let i = 0; i < arrayData.length; i++) {
    if (cityName.textContent === arrayData[i].name) {
      const foundCity = arrayData[i];
      const newFavouriteCity = `<div class="big-card" draggable="true">
          <div class="big-card__header">
            <span class="icon icon--strips-big"></span>
            <span class="big-card__city">${foundCity.name}</span>
          </div>
          <div class="big-card__content">
            <div class="big-card__content-wrapper">
              <div class="big-card__weather-conditions">
                <span class="icon icon--${renderIconWeather(foundCity)}"></span>
                <span class="icon-description">${getDescriptionWeather(foundCity)}</span>
              </div>
              <div class="big-card__wind">
                <span class="icon icon--wind"></span>
                <span class="big-card__wind-info">Ветер ${getWindDirection(foundCity.wind.deg)}, ${Math.round(foundCity.wind.speed)} м/с</span>
              </div>
            </div>
            <span class="big-card__temperature">${convertToCelsius(foundCity.main.temp)}&#176;</span>
          </div>
          <button id="close-big-card" type="button" aria-label="Кнопка закрытия карточки с избранным городом"></button>
        </div>`;
      return newFavouriteCity;
    }
  }
};

// Функция создания разметки карточки для простого города
const getRenderSimpleCity = (movableElement, arrayData) => {
  const cityName = movableElement.querySelector('.big-card__city');
  for (let i = 0; i < arrayData.length; i++) {
    if (cityName.textContent === arrayData[i].name) {
      const foundCity = arrayData[i];
      const newSimpleCity = `<div class="small-card" draggable="true">
        <span class="small-card__city">${foundCity.name}</span>
        <span class="small-card__temperature">${convertToCelsius(foundCity.main.temp)}&#176;</span>
        <span class="icon icon--strips-small"></span>
      </div>`;

      return newSimpleCity;
    }
  }
};

// Перемещение элементов в избранное
let movableElementToFavorites = '';
listSmallCardsWeather.addEventListener('dragstart', (evt) => {
  movableElementToFavorites = evt.target;
  movableElementToFavorites.style.backgroundColor = 'var(--color-shadow-main)';
  listBigCardsWeather.appendChild(emptyCardVisual);
});

listSmallCardsWeather.addEventListener('dragend', () => {
  movableElementToFavorites.style.backgroundColor = '';
  listBigCardsWeather.removeChild(emptyCardVisual);
});

listBigCardsWeather.addEventListener('drop', (evt) => {
  evt.preventDefault();
  if (evt.target.classList.contains('weather-content__big-cards') || evt.target.classList.contains('weather-content__help')) {
    try {
      movableElementToFavorites.parentElement.removeChild(movableElementToFavorites);
      listBigCardsWeather.insertAdjacentHTML('beforeend', getRenderFavouriteCity(movableElementToFavorites, arrayDataCities));
      if (emptyCardVisual) {
        listBigCardsWeather.removeChild(emptyCardVisual);
      }
      setTimeout(() => {
        isOnePlacemark(storagePlacemarks, myMap);
      }, 200);
    } catch (err) {
      // Комментарий, чтобы eslint не ругался на пустой блок
    }
  }
});

// Перемещение элементов из избранного обратно в доступные
let movableElementToAvailable = '';
listBigCardsWeather.addEventListener('dragstart', (evt) => {
  movableElementToAvailable = evt.target;
});

listSmallCardsWeather.addEventListener('dragover', (evt) => {
  evt.preventDefault();
});

listSmallCardsWeather.addEventListener('drop', (evt) => {
  if (evt.target.classList.contains('weather-content__small-cards') || evt.target.classList.contains('small-card') || evt.target.classList.contains('small-card__city') || evt.target.classList.contains('small-card__temperature') || evt.target.classList.contains('icon--strips-small')) {
    try {
      movableElementToAvailable.parentElement.removeChild(movableElementToAvailable);
      listSmallCardsWeather.insertAdjacentHTML('beforeend', getRenderSimpleCity(movableElementToAvailable, arrayDataCities));
      removePlacemark(movableElementToAvailable, storagePlacemarks);
      try {
        // Центровка карты по всем точкам
        myMap.setBounds(myMap.geoObjects.getBounds(), {
          checkZoomRange: true,
          zoomMargin: 20
        });
      } catch (err) {
        // Комментарий, чтобы eslint не ругался на пустой блок
      }
      // console.log(myMap.geoObjects);
      getSortedListAlphabet();
      getSortedListAlphabetReverse();
    } catch (err) {
      // Комментарий, чтобы eslint не ругался на пустой блок
    }
  }
});

// Перемещение элементов внутри избранного
listBigCardsWeather.addEventListener('dragover', (evt) => {
  evt.preventDefault();

  // // Находим элемент, над которым в данный момент находится курсор
  // const currentElement = evt.target;
  // const parentCurrentElement = currentElement.closest('.big-card');

  //   try {

  //     // Проверяем, что событие сработало:
  //     // 1. не на том элементе, который мы перемещаем,
  //     // 2. именно на элементе списка
  //       const isMovable = movableElementToAvailable !== parentCurrentElement && parentCurrentElement.classList.contains('big-card');

  //       // Если нет, прерываем выполнение функции
  //       if (!isMovable) {
  //         return;
  //       }

  //       // Находим элемент, перед которым будем вставлять
  //       const nextElement = (parentCurrentElement === movableElementToAvailable.nextElementSibling) ?
  //         parentCurrentElement.nextElementSibling :
  //         parentCurrentElement;

  //       listBigCardsWeather.insertBefore(movableElementToAvailable, nextElement);

  //   } catch (err) {
  //     // Комментарий, чтобы eslint не ругался на пустой блок
  //   }
});

// Удаление дубликатов из списка доступных городов
const deleteDuplicateCities = (arrayCities) => {
  for (let i = 0; i < arrayCities.length; i++) {
    const cityName = arrayCities[i].querySelector('.small-card__city').textContent;
    for (let j = i + 1; j < arrayCities.length; j++) {
      const nameCity = arrayCities[j].querySelector('.small-card__city').textContent;
      if (cityName === nameCity) {
        arrayCities[j].remove();
      }
    }
  }
};

// Удаление карточки из избранного по клику на крестик
const removeCardFavouriteCity = (evt) => {
  let bigCardElem = null;
  if (evt.target.closest('.big-card')) {
    bigCardElem = evt.target.closest('.big-card');

    const buttonClose = bigCardElem.querySelector('#close-big-card');
    buttonClose.addEventListener('click', () => {
      bigCardElem.classList.add('big-card--animation-remove');
      setTimeout(()=> {
        bigCardElem.remove();
        listSmallCardsWeather.insertAdjacentHTML('beforeend', getRenderSimpleCity(bigCardElem, arrayDataCities));
        try {
          removePlacemark(bigCardElem, storagePlacemarks);
          // Центровка карты по всем точкам
          myMap.setBounds(myMap.geoObjects.getBounds(), {
            checkZoomRange: true,
            zoomMargin: 20
          });
        } catch (err) {
          // Комментарий, чтобы eslint не ругался на пустой блок
        }
        const arraySmallCard = document.querySelectorAll('.small-card');
        deleteDuplicateCities(arraySmallCard);
        getSortedListAlphabet();
        getSortedListAlphabetReverse();
      }, 401);
    });
  }
};

listBigCardsWeather.addEventListener('mousedown', removeCardFavouriteCity);

// Подсветка маркера города на карте при наведении на избранный город
const highlightCityOnMapTurnedOn = (evt) => {
  if (evt.target.closest('.big-card')) {
    const bigCardNameCity = evt.target.closest('.big-card').querySelector('.big-card__city').textContent;
    storagePlacemarks._objects.forEach((object) => {
      if (bigCardNameCity === object.properties._data.hintContent) {
        object.options.set('iconImageHref', './img/icon/icon-pin-red.png');
      }
    });
  }
};

listBigCardsWeather.addEventListener('mouseover', highlightCityOnMapTurnedOn);

// Удаление подсветки маркера города в момент ухода курсора с города
const highlightCityOnMapTurnedOff = (evt) => {
  if (evt.target.closest('.big-card')) {
    const bigCardNameCity = evt.target.closest('.big-card').querySelector('.big-card__city').textContent;
    storagePlacemarks._objects.forEach((object) => {
      if (bigCardNameCity === object.properties._data.hintContent) {
        object.options.set('iconImageHref', './img/icon/icon-pin-blue.png');
      }
    });
  }
};

listBigCardsWeather.addEventListener('mouseout', highlightCityOnMapTurnedOff);

// Центрирование маркера на карте при клике на городе в избранном
const getCenterOnMapClick = (evt) => {
  if (evt.target.closest('.big-card')) {
    const bigCardNameCity = evt.target.closest('.big-card').querySelector('.big-card__city').textContent;
    storagePlacemarks._objects.forEach((object) => {
      if (bigCardNameCity === object.properties._data.hintContent) {
        myMap.setCenter([object.geometry._coordinates[0], object.geometry._coordinates[1]], 10, {
          checkZoomRange: true
        });
      }
    });
  }
};

listBigCardsWeather.addEventListener('click', getCenterOnMapClick);

export {listBigCardsWeather, movableElementToFavorites};
