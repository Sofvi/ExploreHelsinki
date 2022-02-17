'use strict';
const nappi = document.querySelector('button');
const nimi = document.querySelector('p');

const map = L.map('map');
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// Asetukset paikkatiedon hakua varten (valinnainen)
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

// Funktio, joka ajetaan, kun paikkatiedot on haettu
function success(pos) {
  const crd = pos.coords;
  map.setView([crd.latitude, crd.longitude], 12);

  L.marker([crd.latitude, crd.longitude]).addTo(map)
  .bindPopup('Olet tässä').openPopup();
}

// Funktio, joka ajetaan, jos paikkatietojen hakemisessa tapahtuu virhe
function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);

// funktio, jonka avulla voi lisätä pisteitä kartalle
function lisaaPiste(longitude, latitude, nimi) {
  return L.marker([latitude, longitude]).
      addTo(map).bindPopup(nimi);
}


nappi.addEventListener('click', function(evt) {
haeEventit();
});

async function haeEventit() {
const proxy = 'https://api.allorigins.win/get?url=';
const haku = 'https://open-api.myhelsinki.fi/v1/events/';
const url = proxy + encodeURIComponent(haku);

const vastaus = await fetch(url);
const data = await vastaus.json();
const tapahtumat = JSON.parse(data.contents);

console.log(tapahtumat);
}



