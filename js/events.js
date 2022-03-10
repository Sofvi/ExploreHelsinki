'use strict';

const lista = document.getElementById('lista');
const layer = L.featureGroup();
let crd;
let routing;

// Kartta sivustolle
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

// Paikkatiedon haun käynnistys
navigator.geolocation.getCurrentPosition(success, error, options);

// Markkeri omaan sijaintiin
const omaIkoni = new L.Icon({
  iconUrl: 'img/oma-ikoni1.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Markkeri tapahtumille
const eventIcon = new L.Icon({
  iconUrl: 'img/tapahtuma-icon5.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

haeEventit().then(function(jarjesta) {
  for (let i = 0; i <= 100; i++) {
    const tapahtuma = jarjesta[i];
    lisaaPiste(tapahtuma.location.lon, tapahtuma.location.lat, tapahtuma.name.fi, eventIcon).on('click', function() {
      const elementti = document.getElementById(tapahtuma.id);
      elementti.scrollIntoView();
      vari(elementti);
    });

    const kuvaus = document.createElement('p');
    kuvaus.innerHTML = tapahtuma.description.intro;

    const osoite = document.createElement('p');
    osoite.innerHTML = tapahtuma.location.address.street_address
        + ', ' + tapahtuma.location.address.locality;

    const nimi = document.createElement('h3');
    if(tapahtuma.name.en === null || tapahtuma.name.en === '') {
      nimi.innerHTML = tapahtuma.name.fi;
    } else {
      nimi.innerHTML = tapahtuma.name.en;
    }

    const navi = document.createElement('button');
    navi.innerHTML += 'Route';
    navi.addEventListener('click', function (evt) {
      if(routing == null) {
        routing = L.Routing.control({
          waypoints: [
            L.latLng(crd.latitude, crd.longitude),
            L.latLng(tapahtuma.location.lat, tapahtuma.location.lon)
          ],
          routeWhileDragging: true,
          createMarker: function() {
            return null;
          }
        }).addTo(map);
      } else {
        routing.spliceWaypoints(1, 1, [tapahtuma.location.lat, tapahtuma.location.lon]);
      }
    });

    const ajat = document.createElement('p');
    const pvm = new Date(tapahtuma.event_dates.starting_day);
    let minuutit = `${pvm.getMinutes()}`;
    if (minuutit.endsWith('0', 1)) {
      minuutit += '0';
    }
    ajat.innerHTML = pvm.getDate() + '.' + (pvm.getMonth() + 1) + '.' + pvm.getFullYear() + ' Klo: ' + pvm.getHours() + ':' + minuutit;

    const artikkeli = document.createElement('article');
    artikkeli.id = tapahtuma.id;

    const li = document.createElement('li');

    artikkeli.appendChild(nimi);
    artikkeli.appendChild(kuvaus);
    artikkeli.appendChild(osoite);
    artikkeli.appendChild(ajat);
    artikkeli.appendChild(navi);
    if (tapahtuma.info_url != null) {
      const linkki = document.createElement('a');
      linkki.href = tapahtuma.info_url;
      linkki.textContent = 'More Info';
      linkki.target='_blank';
      artikkeli.appendChild(linkki);
    }

    li.appendChild(artikkeli)
    lista.appendChild(li);
  }
});

// Funktio, joka ajetaan, kun paikkatiedot on haettu
function success(pos) {
  crd = pos.coords;
  map.setView([crd.latitude, crd.longitude], 12);
  L.marker([crd.latitude, crd.longitude], {icon: omaIkoni}).addTo(map)
      .bindPopup('You are here', {autoClose: false}).openPopup();
}

// Funktio, joka ajetaan, jos paikkatietojen hakemisessa tapahtuu virhe
function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

// Funktio joka ilmaisee punaisella värillä tapahtuman listassa jota on klikattu kartasta
function vari(element) {
  const alku = element.style.backgroundColor;
  element.style.backgroundColor="#adfc8e";
  setTimeout(function() {
    element.style.backgroundColor = alku;
  }, 1000);
}

// Funktio, jonka avulla voi lisätä pisteitä kartalle
function lisaaPiste(lon, lat, nimi, icon) {
  const marker = new L.marker([lat, lon], {icon: icon});
  marker.bindPopup(nimi);
  layer.addLayer(marker).addTo(map);
  return marker;
}

// Funktio tapahtumien hakuun ja niiden järjestäminen tämän hetkisestä kellonajasta alkaen
async function haeEventit() {
  const proxy = 'https://api.allorigins.win/get?url=';
  const haku = 'https://open-api.myhelsinki.fi/v1/events/';
  const url = proxy + encodeURIComponent(haku);

  const vastaus = await fetch(url);
  const data = await vastaus.json();
  const tapahtumat = JSON.parse(data.contents);
  return tapahtumat.data.filter(
      a => a.event_dates.starting_day && new Date().getTime() <
          new Date(a.event_dates.starting_day).getTime()).
  sort((a, b) => new Date(a.event_dates.starting_day) -
      new Date(b.event_dates.starting_day));
}




