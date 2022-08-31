import {convertToCelsius} from './util.js';
import {getSortedListAlphabet} from './sorting.js';

const listSmallCardsWeather = document.querySelector('.weather-content__small-cards');

// Получаем доступные города
const getAvailableCities = (city) => {
  // listSmallCardsWeather.innerHTML = '';
  // console.log(city);

  // Создаем разметку для доступных городов
  const getCity = `<div class="small-card" draggable="true">
                    <span class="small-card__city">${city.name}</span>
                    <span class="small-card__temperature">${convertToCelsius(city.main.temp)}&#176;</span>
                    <span class="icon icon--strips-small"></span>
                  </div>`;

  listSmallCardsWeather.insertAdjacentHTML('beforeend', getCity);
  getSortedListAlphabet();
};

const arrayCities = ['Москва', 'Рейкявик', 'Денпасар', 'Лос-Анджелес', 'Майами', 'Мехико'];


// const arrayCities = ['Москва', 'Санкт-Петербург', 'Сочи', 'Новосибирск', 'Казань', 'Екатеринбург', 'Красноярск', 'Нижний Новгород', 'Воронеж', 'Белгород', 'Ростов-на-Дону', 'Великий Новгород', 'Калининград', 'Волгоград', 'Краснодар', 'Самара', 'Оренбург', 'Пермь', 'Уфа', 'Кемерово', 'Иркутск', 'Чита', 'Хабаровск', 'Владивосток', 'Комсомольск-на-Амуре', 'Южно-Сахалинск', 'Якутск', 'Магадан', 'Анадырь', 'Улан-Удэ', 'Омск', 'Челябинск', 'Архангельск', 'Мурманск', 'Воркута', 'Норильск', 'Сургут', 'Петропавловск-Камчатский', 'Киев', 'Минск', 'Стокгольм', 'Берлин', 'Варшава', 'Стамбул', 'Париж', 'Лондон', 'Афины', 'Мадрид', 'Амстердам', 'Дублин', 'Рейкьявик', 'Прага', 'Вена', 'Белград', 'Пекин', 'Шанхай', 'Сеул', 'Токио', 'Мельбурн', 'Сидней', 'Оттава', 'Торонто', 'Нью-Йорк', 'Чикаго', 'Вашингтон', 'Сиэтл', 'Лос-Анджелес', 'Майами', 'Мехико', 'Гавана', 'Рио-де-Жанейро', 'Буэнос-Айрес', 'Кейптаун', 'Мумбаи', 'Бангкок', 'Пхукет', 'Паттайя', 'Денпасар'];


// console.log(arrayCities.length);

export{getAvailableCities, arrayCities, listSmallCardsWeather};
