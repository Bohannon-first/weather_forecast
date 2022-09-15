import {closeHintOnMap} from './map.js';

const searchInput = document.querySelector('#search');
const btnResetValue = document.querySelector('#reset-value');

// Второй, глобальный поиск, там где палец вправо
const formGlobalSearch = document.querySelector('.weather-app__map__form');
const formGlobalSearchInput = formGlobalSearch.querySelector('.weather-app__map__input');
const globalSearchBtnResetValue = formGlobalSearch.querySelector('.button--reset');

// Кнопка(палец вправо) появления поля для поиска города
const btnShowSearch = document.querySelector('.weather-app__map__button-show-search');
const searchCity = document.querySelector('.weather-app__map__form-container');
const searchCityInput = searchCity.querySelector('.weather-app__map__input');

// Функция поиска городов
const findCity = () => {
  const smallCardsCitiesNames = document.querySelectorAll('.small-card__city');

  // Функция очистки поля ввода
  const clearInputValue = () => {
    searchInput.value = '';
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
    searchCity.style.animation = 'showSearchCity 400ms';
    searchCity.style.transform = 'translateX(0)';
    btnShowSearch.style.animation = 'turnFingerLeft 800ms';
    btnShowSearch.style.transform = 'scaleX(-1)';
  } else {
    searchCity.style.animation = 'hiddenSearchCity 400ms';
    searchCity.style.transform = 'translateX(-350px)';
    searchCityInput.value = '';
    btnShowSearch.style.animation = 'turnFingerRight 800ms';
    btnShowSearch.style.transform = 'scaleX(1)';
    globalSearchBtnResetValue.style.display = 'none';
  }
};

btnShowSearch.addEventListener('click', showSearchOnMap);

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
};

globalSearchBtnResetValue.addEventListener('click', resetValueOnGlobalSearch);
