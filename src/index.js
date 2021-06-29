import './sass/main.scss';
import fetchCountries from './js/fetchCountries.js';
import listCountries from './templates/countriesList.hbs';
import infoCountries from './templates/countryInfo.hbs';


import { alert } from '@pnotify/core';
//import * as PNotifyMobile from '@pnotify/mobile/';
// import * as PNotifyCountdown from '@pnotify/countdown';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';

const debounce = require('lodash.debounce');
let searchCountry = '';
const refs = {
    input: document.querySelector('.input'),
    result: document.querySelector('.result'),
}
refs.input.addEventListener('input', debounce(onSearch, 500));

function onSearch() {
    clearSearch();
    searchCountry = refs.input.value;
    fetchCountries(searchCountry).then(markupResult).catch(error => console.log(error));
}
function clearSearch() {
    refs.result.innerHTML = '';
}
function markupResult(countries) {
    if (countries.length === 1) {
        clearSearch();
        markupCountries(infoCountries, countries);
    } else if (countries.length > 1 && countries.length <= 10) {
        clearSearch();
        markupCountries(listCountries, countries);
    } else if (countries.length > 10) {
        outputInfo(alert, 'Too many matches found. Please enter a more specific query!',);
    
} else {
        outputInfo(alert, 'No matches found!');
    }
    }

function outputInfo(typeInfo, text) {
    typeInfo({
        text: `${text}`,
        delay: 1500,
        closerHover: true,
    })
}
function markupCountries(tpl, countries) {
    refs.result.insertAdjacentHTML('beforeend', tpl(countries));
};


