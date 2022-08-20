const searchInput = document.querySelector('#search');
const btnResetValue = document.querySelector('#reset-value');

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
