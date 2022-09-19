import {convertToCelsius} from './util.js';
import {getSortedListAlphabet} from './sorting.js';

const listSmallCardsWeather = document.querySelector('.weather-content__small-cards');

// Получаем доступные города
const getAvailableCities = (city) => {
  // Создаем разметку для доступных городов
  const getCity = `<div class="small-card" draggable="true">
                    <span class="small-card__city">${city.name}</span>
                    <span class="small-card__temperature">${convertToCelsius(city.main.temp)}&#176;</span>
                    <span class="icon icon--strips-small"></span>
                  </div>`;

  listSmallCardsWeather.insertAdjacentHTML('beforeend', getCity);
  getSortedListAlphabet();
};

const arrayCities = ['Москва', 'Санкт-Петербург', 'Стокгольм', 'Стамбул', 'Париж', 'Лондон', 'Рейкьявик', 'Пекин', 'Токио', 'Мельбурн', 'Сидней', 'Нью-Йорк', 'Чикаго', 'Лос-Анджелес', 'Бангкок', 'Пхукет', 'Паттайя'];

export{getAvailableCities, arrayCities, listSmallCardsWeather};
