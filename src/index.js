import './sass/main.scss';
import refs from './js/refs';
import API from './js/fetchCountries';
import listCountries from './templates/countriesList.hbs';
import infoCountries from './templates/countryInfo.hbs';

import debounce from 'lodash.debounce';
import { info, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';


refs.input.addEventListener('input', debounce(onSearch, 500));
function onSearch() {
    clearSeach();
    findCountry = refs.input.value;
    countriesApi(findCountry).then()
}