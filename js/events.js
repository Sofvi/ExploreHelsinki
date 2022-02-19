'use strict';

const nappi = document.getElementById('nayta');
nappi.addEventListener('click', function(evt) {
  haeEventit();
});

//Saa INFO napin toimimaan
document.getElementById("navbar").onclick = function () {
  location.href = "info.html";
};

const lista = document.getElementById('lista');

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

async function haeEventit() {
const proxy = 'https://api.allorigins.win/get?url=';
const haku = 'https://open-api.myhelsinki.fi/v1/events/';
const url = proxy + encodeURIComponent(haku);

const vastaus = await fetch(url);
const data = await vastaus.json();
const tapahtumat = JSON.parse(data.contents);

console.log(tapahtumat);

  for (let i = 50; i <= 100; i++) {
    const tapahtuma = tapahtumat.data[i];
    /*  lisaaPiste(tapahtuma.location.lon, tapahtuma.location.lat,
          tapahtuma.name.fi); */

    const info = document.createElement('p')
    info.textContent += tapahtuma.description.intro;
    info.innerHTML += "<br>";
    info.innerHTML += tapahtuma.location.address.street_address;

    const kuva = document.createElement('img');
    kuva.src = tapahtuma.description.images[0].url;

    const nimi = document.createElement('h3');
    nimi.innerText = tapahtuma.name.fi;

    const naytanappi = document.createElement('button');
    naytanappi.innerText = 'Nayta kartalla';
    naytanappi.addEventListener('click', function (evt) {
      lisaaPiste(tapahtuma.location.lon, tapahtuma.location.lat,
          tapahtuma.name.fi)
    });

    const artikkeli = document.createElement('article');
    const li = document.createElement('li');

    artikkeli.appendChild(nimi);
    artikkeli.appendChild(kuva);
    artikkeli.appendChild(info);
    artikkeli.appendChild(naytanappi);

    li.appendChild(artikkeli)
    lista.appendChild(li);
  }
}



