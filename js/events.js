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
  console.log(crd);
  map.setView([crd.latitude, crd.longitude], 12);
  L.marker([crd.latitude, crd.longitude], {icon: redIcon}).addTo(map)
  .bindPopup('Olet tässä', {closeOnClick: false, autoClose: false}).openPopup();
}

// Funktio, joka ajetaan, jos paikkatietojen hakemisessa tapahtuu virhe
function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);


// Funktio, jonka avulla voi lisätä pisteitä kartalle
function lisaaPiste(longitude, latitude, nimi) {
  L.marker([latitude, longitude]).
  addTo(map).bindPopup(nimi + '<br><button id="navi">Reititä</button>').openPopup();
  const navi = document.getElementById('navi');
  navi.addEventListener('click', function (evt) {
    navigator.geolocation.getCurrentPosition(success, error, options);
    alert('testi');
    function success(pos) {
      const crd = pos.coords;
      L.Routing.control({
        waypoints: [
          L.latLng(crd.latitude, crd.longitude),
          L.latLng(latitude, longitude)
        ],
        routeWhileDragging: false
      }).addTo(map);
    }
  });
}

async function haeEventit() {
const proxy = 'https://api.allorigins.win/get?url=';
const haku = 'https://open-api.myhelsinki.fi/v1/events/';
const linkki = proxy + encodeURIComponent(haku);

const vastaus = await fetch(linkki);
const data = await vastaus.json();
const tapahtumat = JSON.parse(data.contents);

const jarjestys = tapahtumat.data.filter(a => a.event_dates.starting_day && new Date().getTime() < new Date(a.event_dates.starting_day)
      .getTime()).sort((a, b) => new Date(a.event_dates.starting_day) - new Date(b.event_dates.starting_day));

  for (let i = 0; i <= 100; i++) {
    lisaaPiste(jarjestys[i].location.lon, jarjestys[i].location.lat, jarjestys[i].name.fi);
    console.log(jarjestys[i]);
    const tapahtuma = jarjestys[i];

    const kuvaus = document.createElement('p');
    kuvaus.textContent = tapahtuma.description.intro;

    const osoite = document.createElement('p');
    osoite.innerHTML = tapahtuma.location.address.street_address
        + ', ' + tapahtuma.location.address.locality;

    const nimi = document.createElement('h3');
    nimi.innerText = tapahtuma.name.fi;

    const naytanappi = document.createElement('button');
    naytanappi.innerHTML = 'Show on map';

    naytanappi.addEventListener('click', function (evt) {
      lisaaPiste(tapahtuma.location.lon, tapahtuma.location.lat,
          tapahtuma.name.fi);
      document.getElementById('navbar').scrollIntoView({
        behavior: 'smooth'});
    });

    const artikkeli = document.createElement('article');
    const li = document.createElement('li');

    artikkeli.appendChild(nimi);
    artikkeli.appendChild(kuvaus);
    artikkeli.appendChild(osoite);
    artikkeli.appendChild(naytanappi);
    if (tapahtuma.info_url != null) {
      const linkki = document.createElement('a');
      linkki.href = jarjestys[i].info_url;
      linkki.textContent = 'More Info';
      linkki.target='_blank';
      artikkeli.appendChild(linkki);
    }

    li.appendChild(artikkeli)
    lista.appendChild(li);
  }
}



