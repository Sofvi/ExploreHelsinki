'use strict';

//Saa INFO napin toimimaan
document.getElementById("navbar").onclick = function () {
  location.href = "info.html";
};

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
  .bindPopup('Olet tässä', {closeOnClick: false, autoClose: false}).openPopup();
}

// Funktio, joka ajetaan, jos paikkatietojen hakemisessa tapahtuu virhe
function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);

// funktio, jonka avulla voi lisätä pisteitä kartalle
function lisaaPiste(longitude, latitude, nimi) {
  return L.marker([latitude, longitude]).
      addTo(map).bindPopup(nimi).openPopup();
}


async function otaWlan() {
  const url = 'https://api.hel.fi/servicemap/v2/search/?q=wlan-sisäpisteet'
  const vastaus = await fetch(url);
  const data = await vastaus.json();
  console.log(data)

}

otaWlan();
