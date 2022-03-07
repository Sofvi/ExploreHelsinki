'use strict';

//Saa INFO napin toimimaan
document.getElementById("navbar").onclick = function () {
  location.href = "info.html";
};


const map = L.map('map');
const wifiIcon = L.icon({
  iconUrl: 'img/wifi-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
},
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map));


// Asetukset paikkatiedon hakua varten (valinnainen)
const options = {
  enableHighAccuracy: true,
  timeout: 9000,
  maximumAge: 0
};

// Funktio, joka ajetaan, kun paikkatiedot on haettu
function success(pos) {
  const crd = pos.coords;
  map.setView([crd.latitude, crd.longitude], 12);

  L.marker([crd.latitude, crd.longitude]).addTo(map)
    .bindPopup('Olet tässä', { closeOnClick: false, autoClose: false }).openPopup();
}

// Funktio, joka ajetaan, jos paikkatietojen hakemisessa tapahtuu virhe
function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);

// funktio, jonka avulla voi lisätä pisteitä kartalle
function lisaaPiste(longitude, latitude, nimi) {
  return L.marker([latitude, longitude], {icon: wifiIcon}).
    addTo(map).bindPopup(nimi).openPopup();
}
function piste(longitude, latitude) {
  return L.marker([latitude, longitude], {icon: wifiIcon}).
    addTo(map);
}


async function otaWlan() {
  const vastaus = await fetch('internet.geojson');
  const data = await vastaus.json();
  console.log(data)
  for (let i = 0; i < data.features.length; i++) {
    if (data.features[i].properties.name != null) {
      const nimi = data.features[i].properties.name;
      lisaaPiste(data.features[i].geometry.coordinates[0], data.features[i].geometry.coordinates[1], nimi)
    }
    else {
      piste(data.features[i].geometry.coordinates[0], data.features[i].geometry.coordinates[1])
    }

  }

  async function otaWifi() {
    const answer = await fetch('wifi.geojson');
    const wifi = await answer.json();
    console.log(wifi)
    for (let i = 0; i < wifi.features.length; i++) {
      if (wifi.features[i].properties.name != null) {
        const name = wifi.features[i].properties.name;
        lisaaPiste(wifi.features[i].geometry.coordinates[0], wifi.features[i].geometry.coordinates[1], name)
      }
      else {
        piste(wifi.features[i].geometry.coordinates[0], wifi.features[i].geometry.coordinates[1])
      }
    }
  }
  otaWifi();
}

otaWlan();


