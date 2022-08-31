import {listBigCardsWeather} from './favorites-cities.js';

const filtersContainer = document.querySelector('.sort-form__group--filters');
const btnDisableFilters = document.querySelector('#all-cities').parentElement;

// Отфильтровать города по погоде
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

      if (city.classList.contains('hidden-block')) {
        city.classList.add('visible-block');
        setTimeout(() => {
          city.classList.remove('hidden-block');

          city.classList.remove('big-card--animation-remove');
          city.classList.remove('visible-block');
        }, 301);
      }
      if (!iconWeather) {
        city.classList.add('big-card--animation-remove');
        setTimeout(() => {
          city.classList.toggle('hidden-block');
          city.classList.remove('big-card--animation-remove');
        }, 301);
      }
    });
  }
};

filtersContainer.addEventListener('click', onListFiltersClick);

// Показать все города
const onBtnDisableFiltersClick = () => {
  const favouriteCitiesList = listBigCardsWeather.querySelectorAll('.big-card');
  favouriteCitiesList.forEach((item) => {
    item.classList.add('visible-block');
    item.classList.remove('.big-card--animation-remove');
    setTimeout(() => {
      item.classList.remove('hidden-block');
      item.classList.remove('visible-block');
    }, 301);
  });
};

btnDisableFilters.addEventListener('click', onBtnDisableFiltersClick);
