const ALERT_SHOW_TIME = 3000;

// Получение рандомного числа из диапазона
const getRandomNumber = (minNum, maxNum, lengthNum = 0) => {
  if (minNum < 0) {
    return 'Ошибка. Вы ввели отрицательное число. Число должно быть положительное.';
  }
  else if (maxNum <= minNum) {
    return 'Ошибка. Конечное число меньше или равно начальному.';
  }
  else if (minNum >= maxNum) {
    return 'Ошибка. Начальное число не должно быть больше или равно конечному.';
  }
  else {
    const randomNumber = minNum + Math.random() * (maxNum - minNum);
    return +randomNumber.toFixed(lengthNum);
  }
};
getRandomNumber();

// Блок с возможной ошибкой запроса данных с сервера
const showAlert = () => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 1000;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.bottom = '400px';
  alertContainer.style.right = 0;
  alertContainer.style.padding = '100px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.color = 'white';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = 'Ошибка загрузки данных. Что-то пошло  не так!';

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};


// Конвертация из Кельвина в Цельсий
const convertToCelsius = (valueKelvin) => {
  const celsius = Math.round(valueKelvin - 273.15);
  return celsius > 0 ? `+${celsius}` : celsius;
};

export {showAlert, convertToCelsius};
