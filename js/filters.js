import {listBigCardsWeather} from './favorites-cities.js';

const listFilters = document.querySelector('.sort-form__group--filters');

// Фильтры погоды
const onListFiltersClick = (evt) => {
  const favouriteCitiesList = listBigCardsWeather.querySelectorAll('.big-card');
  const currentFilter = evt.target.closest('.sort-form__input-wrapper');
  if (!currentFilter) {
    return false;
  }
  const currentFilterInput = currentFilter.querySelector('input');
  const currentFilterValue = currentFilter.dataset.weather;
  if (currentFilterInput.checked) {
    favouriteCitiesList.forEach((city) => {
      const iconWeather = city.querySelector(`.icon--${currentFilterValue}`);
      if (!iconWeather) {
        setTimeout(() => {
          city.classList.toggle('hidden-block');
        }, 300);
      }
    });
  }
};

listFilters.addEventListener('click', onListFiltersClick);
