import {ALERT_SHOW_TIME} from './util.js';

const map = document.querySelector('#weather-map');

// Функция удаления попапа
const removePopup = () => {
  map.querySelector('.popup').style.animation = 'hiddenPopup 400ms forwards';
  setTimeout(() => {
    map.querySelector('.popup').remove();
  }, 401);
};

// Попап об успехе при поиске нового города
const showPopupSuccess = () => {
  const popupSuccess = `<div class="popup popup--success">
  <p class="popup__message">Город найден и добавлен в общий список</p>
</div>`;

  map.insertAdjacentHTML('afterbegin', popupSuccess);

  setTimeout(() => {
    removePopup();
  }, ALERT_SHOW_TIME);
};

// Попап об ошибке при поиске нового города
const showPopupError = () => {
  const popupError = `<div class="popup popup--error">
  <p class="popup__message">Ошибка в названии города! Попробуйте снова.</p>
</div>`;

  map.insertAdjacentHTML('afterbegin', popupError);

  setTimeout(() => {
    removePopup();
  }, ALERT_SHOW_TIME);
};

// Попап об уже существующем городе
const showPopupExist = (inputCityName) => {
  const popupExist = `<div class="popup popup--exist">
  <p class="popup__message">Этот город уже есть в общем списке</p>
</div>`;

  map.insertAdjacentHTML('afterbegin', popupExist);

  // Добавление красной рамки существующему городу в общем списке
  const smallCardCitiesCollection = document.querySelectorAll('.small-card');
  let smallCityExist = null;
  smallCardCitiesCollection.forEach((city) => {
    const cityName = city.querySelector('.small-card__city').textContent.toLowerCase();
    if (cityName === inputCityName.toLowerCase()) {
      smallCityExist = city;
      smallCityExist.classList.add('small-card--city-exist');
    }
  });

  // Добавление красной рамки существующему городу в списке избранных
  const bigCardCitiesCollection = document.querySelectorAll('.big-card');
  let bigCityExist = null;
  bigCardCitiesCollection.forEach((city) => {
    const cityName = city.querySelector('.big-card__city').textContent.toLowerCase();
    if (cityName === inputCityName.toLowerCase()) {
      bigCityExist = city;
      bigCityExist.classList.add('small-card--city-exist');
    }
  });

  setTimeout(() => {
    removePopup();
    if (smallCityExist) {
      smallCityExist.classList.remove('small-card--city-exist');
    } else if (bigCityExist) {
      bigCityExist.classList.remove('small-card--city-exist');
    }
  }, ALERT_SHOW_TIME);
};

export {showPopupSuccess, showPopupError, showPopupExist};
