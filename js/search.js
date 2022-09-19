import {closeHintOnMap} from './map.js';
import {searchNewCity} from './server.js';
import {listSmallCardsWeather} from './available-cities.js';
import {convertToCelsius} from './util.js';

const searchInput = document.querySelector('#search');
const btnResetValue = document.querySelector('#reset-value');

// Второй, глобальный поиск, там где палец вправо
const formGlobalSearch = document.querySelector('.weather-app__map__form');
const formGlobalSearchInput = formGlobalSearch.querySelector('.weather-app__map__input');
const globalSearchBtnResetValue = formGlobalSearch.querySelector('.button--reset');

// Кнопка(палец вправо) появления поля для поиска города
const btnShowSearch = document.querySelector('.weather-app__map__button-show-search');
const searchCity = document.querySelector('.weather-app__map__form-container');
const btnSearchCity = searchCity.querySelector('.weather-app__map__button');

// Шаблон регулярного выражения для проверки названий городов
const templateSearchCity = /^[а-яё-\s]{0,}$/gi;

// Функция поиска городов
const findCity = () => {
  const smallCardsCitiesNames = document.querySelectorAll('.small-card__city');

  // Функция очистки поля ввода
  const clearInputValue = () => {
    searchInput.value = '';
    searchInput.focus();
    smallCardsCitiesNames.forEach((city) => {
      city.parentElement.style.display = 'flex';
      btnResetValue.style.display = 'none';
    });
  };

  btnResetValue.addEventListener('click', clearInputValue);

  // Показать/скрыть кнопку очистки поля ввода
  if (searchInput.value.trim()) {
    btnResetValue.style.display = 'block';
  } else {
    btnResetValue.style.display = 'none';
  }

  // Показать/скрыть найденные/ненайденные города в списке
  for (let i = 0; i < smallCardsCitiesNames.length; i++) {
    if (smallCardsCitiesNames[i].textContent.toLowerCase().indexOf(searchInput.value.toLowerCase().trim()) > -1) {
      smallCardsCitiesNames[i].parentElement.style.display = '';
    } else {
      smallCardsCitiesNames[i].parentElement.style.display = 'none';
    }
  }
};

searchInput.addEventListener('input', findCity);

// Показать/скрыть поиск при клике на кнопку с рукой
const showSearchOnMap = () => {
  const isSearchHidden = window.getComputedStyle(searchCity).transform;
  if (isSearchHidden.includes(-350) || document.querySelector('.weather-app__map__hint').style.display === 'flex') {
    closeHintOnMap();
    searchCity.style.animation = 'showSearchCity 400ms forwards';
    btnShowSearch.style.animation = 'turnFingerLeft 800ms forwards';
    btnShowSearch.setAttribute('title', 'Скрыть поиск');
  } else {
    searchCity.style.animation = 'hiddenSearchCity 400ms forwards';
    formGlobalSearchInput.value = '';
    btnShowSearch.style.animation = 'turnFingerRight 800ms forwards';
    globalSearchBtnResetValue.style.display = 'none';
    btnShowSearch.setAttribute('title', 'Показать поиск');
  }
};

btnShowSearch.addEventListener('click', showSearchOnMap);

// Валидация поля ввода глобального поиска
const validateInputValue = () => {
  const currentValue = formGlobalSearchInput.value;
  if (!currentValue.match(templateSearchCity)) {
    Array.from(currentValue).forEach((item) => {
      if (!templateSearchCity.test(item)) {
        const correctValue = currentValue.replace(item, '');
        formGlobalSearchInput.value = correctValue;
        return formGlobalSearchInput.value;
      }
    });
  }
};

formGlobalSearchInput.addEventListener('input', validateInputValue);

// Показать/скрыть кнопку очистки поля ввода глобального поиска
const showBtnResetGlobalSearch = () => {
  if (formGlobalSearchInput.value) {
    globalSearchBtnResetValue.style.display = 'block';
  } else {
    globalSearchBtnResetValue.style.display = 'none';
  }
};

formGlobalSearchInput.addEventListener('input', showBtnResetGlobalSearch);

// Функция очистки поля ввода глобального поиска
const resetValueOnGlobalSearch = () => {
  formGlobalSearchInput.value = '';
  globalSearchBtnResetValue.style.display = 'none';
  formGlobalSearchInput.focus();
};

globalSearchBtnResetValue.addEventListener('click', resetValueOnGlobalSearch);

// Получаем новый город через глобальный поиск
const getNewCitySearch = (city) => {
  // Создаем разметку для города
  const getCity = `<div class="small-card small-card--new-city" draggable="true">
                    <span class="small-card__city">${city.name}</span>
                    <span class="small-card__temperature">${convertToCelsius(city.main.temp)}&#176;</span>
                    <span class="icon icon--strips-small"></span>
                  </div>`;

  listSmallCardsWeather.insertAdjacentHTML('afterbegin', getCity);
};

// Обработчик клика по кнопке глобального поиска города
setTimeout(()=> {
  btnSearchCity.addEventListener('click', searchNewCity);
}, 0);

// Отправка запроса по нажатии на enter в поле ввода
formGlobalSearchInput.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 13) {
    evt.preventDefault();
    searchNewCity();
  }
});

export {searchCity, formGlobalSearchInput, getNewCitySearch, resetValueOnGlobalSearch, btnSearchCity};
