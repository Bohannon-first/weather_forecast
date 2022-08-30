import './map.js';
import './server.js';
import './util.js';
import './available-cities.js';
import './sorting.js';
import './search.js';
import './favorites-cities.js';
import './filters.js';
import {getData} from './server.js';
import {getAvailableCities, arrayCities} from './available-cities.js';

getData(getAvailableCities, arrayCities);
