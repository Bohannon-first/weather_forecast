const btnSortAlphabet = document.querySelector('#alphabet-sort');
const btnSortAlphabetReverse = document.querySelector('#alphabet-sort-reverse');

// Сортировка городов по алфавиту от А до Я
const sortedAlphabet = (currentCity, nextCity) => currentCity.querySelector('.small-card__city').textContent.localeCompare(nextCity.querySelector('.small-card__city').textContent);

// Функция сортировки и отрисовки городов по алфафиту от А до Я
const getSortedListAlphabet = () => {
  const smallCardContainer = document.querySelector('.weather-content__small-cards');
  const smallCardContainerChildren = document.querySelector('.weather-content__small-cards').children;

  if (btnSortAlphabet.checked) {
    const newSortingList = Array.from(smallCardContainerChildren).sort(sortedAlphabet);
    smallCardContainer.innerHTML = '';
    newSortingList.forEach((city) => {
      smallCardContainer.insertAdjacentElement('beforeend', city);
    });
  }
};

btnSortAlphabet.addEventListener('click', getSortedListAlphabet);

// Сортировка городов в обратном алфавитном порядке от Я до А
const sortedAlphabetReverse = (currentCity, nextCity) => nextCity.querySelector('.small-card__city').textContent.localeCompare(currentCity.querySelector('.small-card__city').textContent);

// Функция сортировки и отрисовки городов в обратном алфавитном порядке от Я до А
const getSortedListAlphabetReverse = () => {
  const smallCardContainer = document.querySelector('.weather-content__small-cards');
  const smallCardContainerChildren = document.querySelector('.weather-content__small-cards').children;

  if (btnSortAlphabetReverse.checked) {
    const newSortingList = Array.from(smallCardContainerChildren).sort(sortedAlphabetReverse);
    smallCardContainer.innerHTML = '';
    newSortingList.forEach((city) => {
      smallCardContainer.insertAdjacentElement('beforeend', city);
    });
  }
};

btnSortAlphabetReverse.addEventListener('click', getSortedListAlphabetReverse);

export {getSortedListAlphabet, getSortedListAlphabetReverse};
