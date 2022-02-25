'use strict';
/*
const nappi = document.getElementById('nayta');
nappi.addEventListener('click', function(evt) {
  haeEventit();
});
*/
haeEventit();

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

// Punainen markkeri omaan sijaintiin
const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});


// Funktio, joka ajetaan, kun paikkatiedot on haettu
function success(pos) {
  const crd = pos.coords;
  map.setView([crd.latitude, crd.longitude], 12);
  L.marker([crd.latitude, crd.longitude], {icon: redIcon}).addTo(map)
  .bindPopup('Olet tässä', {closeOnClick: false, autoClose: false}).openPopup();
}

// Funktio, joka ajetaan, jos paikkatietojen hakemisessa tapahtuu virhe
function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);

function navigoi(lon, lat, omalon, omalat) {
  L.Routing.control({
    waypoints: [
      L.latLng(lon, lat),
      L.latLng(omalon, omalat)
    ],
    routeWhileDragging: false
  }).addTo(map);
}

// Funktio, jonka avulla voi lisätä pisteitä kartalle
function lisaaPiste(longitude, latitude, nimi) {
  const marker = L.marker([latitude, longitude]).
  addTo(map).bindPopup(nimi + '<br><button id="navi">Reititä</button>').openPopup();
  const navi = document.getElementById('navi');
  navi.addEventListener('click', function (evt) {
    alert('testi');
  });
}

async function haeEventit() {
const proxy = 'https://api.allorigins.win/get?url=';
const haku = 'https://open-api.myhelsinki.fi/v1/events/';
const url = proxy + encodeURIComponent(haku);

const vastaus = await fetch(url);
const data = await vastaus.json();
const tapahtumat = JSON.parse(data.contents);

console.log(tapahtumat);

  for (let i = 0; i <= 100; i++) {
    const tapahtuma = tapahtumat.data[i];

    const kuvaus = document.createElement('p');
    kuvaus.textContent = tapahtuma.description.intro;

    const osoite = document.createElement('p');
    osoite.innerHTML = tapahtuma.location.address.street_address
        + ', ' + tapahtuma.location.address.locality;

  // const kuva = document.createElement('img');
  // kuva.src = tapahtuma.description.images[0].url;

    const nimi = document.createElement('h3');
    nimi.innerText = tapahtuma.name.fi;

    const naytanappi = document.createElement('button');
    naytanappi.innerHTML = 'Nayta kartalla';

    naytanappi.addEventListener('click', function (evt) {
      lisaaPiste(tapahtuma.location.lon, tapahtuma.location.lat,
          tapahtuma.name.fi);
      document.querySelector('h1').scrollIntoView({
        behavior: 'smooth'});
    });

    const linkki = document.createElement('a');
    linkki.href = tapahtuma.info_url;
    linkki.target = "_blank";
    linkki.innerHTML = 'Lisätietoa' + '  ';

    const artikkeli = document.createElement('article');
    const li = document.createElement('li');

    artikkeli.appendChild(nimi);
    // artikkeli.appendChild(kuva);
    artikkeli.appendChild(kuvaus);
    artikkeli.appendChild(osoite);
    artikkeli.appendChild(linkki);
    artikkeli.appendChild(naytanappi);

    li.appendChild(artikkeli)
    lista.appendChild(li);
  }
}



