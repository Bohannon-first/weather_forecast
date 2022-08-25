import {showAlert} from './util.js';


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



// setTimeout(() => {
//   console.log(arrayDataCities);
// }, 0);





export {getData, arrayDataCities};
