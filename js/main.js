'use strict';

/*function nav() {
  const links = document.getElementById('navbar').getElementsByTagName('a');
  const current = location.href;
  for (var i=0; i < links.length; i++) {
    if (links[i].href === current) {
      links[i].href = "";
      links[i].className='graystyle';
    }
  }
}*/

document.getElementById("navbar").onclick = function () {
  location.href = "html/wlan.html";
};