import {showAlert} from './util.js';
import {formGlobalSearchInput, getNewCitySearch, resetValueOnGlobalSearch} from './search.js';
import {showPopupSuccess, showPopupError, showPopupExist} from './popup.js';

const arrayDataCities = [];
const getData = (onSuccess, array) => {
  for (let i = 0; i < array.length; i++) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${array[i]}&appid=3fada044c089ad99eb8166b95b331b09&lang=RU`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(`${response.status} ${response.statusText}`);
      })
      .then((jsonCity) => {
        onSuccess(jsonCity);
        arrayDataCities.push(jsonCity);
      })
      .catch((err) => showAlert(err));
  }
};

// Найти новый город через глобальный поиск
const searchNewCity = () => {
  const nameCity = formGlobalSearchInput.value.trim();
  // Проверка введенного значения на валидность
  if (!nameCity.length) {
    formGlobalSearchInput.setCustomValidity('Введите название города');
    formGlobalSearchInput.reportValidity();
    return false;
  } else if (String(nameCity)[0] === ' ') {
    formGlobalSearchInput.setCustomValidity('Название города не должно начинаться с пробела');
    formGlobalSearchInput.reportValidity();
    return false;
  } else if (String(nameCity)[0] === '-') {
    formGlobalSearchInput.setCustomValidity('Название города не должно начинаться с дефиса');
    formGlobalSearchInput.reportValidity();
    return false;
  } else if (String(nameCity).slice(-1) === '-') {
    formGlobalSearchInput.setCustomValidity('Название города не должно заканчиваться дефисом');
    formGlobalSearchInput.reportValidity();
    return false;
  }
  // Проверка существует ли уже такой город в общем списке
  const checkCity = arrayDataCities.some((city) => {
    if (city.name.toLowerCase() === nameCity.toLowerCase()) {
      return true;
    } else {
      return false;
    }
  });
  // Если город отсутствует, отправить запрос и добавить в общий список
  if (!checkCity) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${nameCity}&appid=3fada044c089ad99eb8166b95b331b09&lang=RU`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(`${response.status} ${response.statusText}`);
      })
      .then((jsonCity) => {
        getNewCitySearch(jsonCity);
        arrayDataCities.push(jsonCity);
        showPopupSuccess();
        resetValueOnGlobalSearch();
      })
      .catch((err) => showPopupError(err));
  // Если город уже существует в общем списке, то показать попап
  } else {
    showPopupExist(nameCity);
    resetValueOnGlobalSearch();
  }
};

export {getData, arrayDataCities, searchNewCity};
