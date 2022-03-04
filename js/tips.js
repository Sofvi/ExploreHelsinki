'use strict';

console.log("ganggagn");

//Saa INFO napin toimimaan
document.getElementById("navbar").onclick = function () {
  location.href = "info.html";
};
<<<<<<< HEAD
function saa(cityID) {
  var key = '77fa5083f376659f1844079991d6326b';
  fetch('https://api.openweathermap.org/data/2.5/weather?id=' + cityID + '&appid=' + key + '&units=metric')
    .then(function (resp) { return resp.json() })
    .then(function (data) {
      tulostaSaa(data);
    })
    .catch(function (e) {
      console.log(e);
    })
=======

//Sää API
function saa( cityID ) {
  const key = '77fa5083f376659f1844079991d6326b';
  fetch('https://api.openweathermap.org/data/2.5/weather?id=' +cityID+ '&appid=' + key + '&units=metric')
  .then(function(resp) { return resp.json() })
  .then(function(data) {
    this.tulostaSaa(data);

  })
  .catch(function() {

  })
>>>>>>> 52804b0475149ffbc54e1d75e27a6ce7f1d94647


}

<<<<<<< HEAD
window.onload = function () {
  saa(658225);

}
function tulostaSaa(data) {
  const { name } = data;
  const { icon, description } = data.weather[0];
  const { temp, humidity } = data.main;
  const { sunrise } = data.sys;
  const { sunset } = data.sys;
  const { feels_like } = data.main;
  const { speed } = data.wind;
  const rSun = convertTime(sunrise);
  const sSun = convertTime(sunset);

  console.log(name, icon, description, temp, humidity, rSun, sSun);
  document.querySelector(".temp").innerHTML = temp + 'ºC';
  document.querySelector(".tuuli").innerHTML = "Wind: " + speed + " m/s"
  document.querySelector(".tuntuu").innerHTML = "Feels like: " + feels_like + "ºC";
  document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png"
=======
window.onload = function() {
  saa( 658225 );

}
function tulostaSaa (data){
  const {name} = data;
  const {icon, description} = data.weather[0];
  const {temp, humidity} = data.main;
  const {sunrise} = data.sys;
  const {sunset} = data.sys;
  const {feels_like} = data.main;
  const {speed} = data.wind;
  const rSun = convertTime(sunrise);
  const sSun = convertTime(sunset);

  console.log(name,icon,description,temp, humidity, rSun, sSun);
  document.querySelector(".temp").innerHTML = temp + 'ºC';
  document.querySelector(".tuuli").innerHTML = "Wind: " + speed + " m/s"
  document.querySelector(".tuntuu").innerHTML = "Feels like: "+ feels_like + "ºC";
  document.querySelector(".icon").src ="https://openweathermap.org/img/wn/" + icon + ".png"
>>>>>>> 52804b0475149ffbc54e1d75e27a6ce7f1d94647
  document.querySelector(".kuvaus").innerHTML = description;
  document.querySelector(".kosteus").innerHTML = "Humidity: " + humidity + "%"
  document.querySelector(".sun").innerHTML = "Sunrise: " + rSun
  document.querySelector(".sunSet").innerHTML = "Sunset: " + sSun


}

<<<<<<< HEAD
function convertTime(unixTime) {
=======
function convertTime(unixTime){
>>>>>>> 52804b0475149ffbc54e1d75e27a6ce7f1d94647
  let dt = new Date(unixTime * 1000)
  let h = dt.getHours()
  let m = "0" + dt.getMinutes()
  let t = h + ":" + m.substring(-2)
  return t
<<<<<<< HEAD
}


=======
}
>>>>>>> 52804b0475149ffbc54e1d75e27a6ce7f1d94647
