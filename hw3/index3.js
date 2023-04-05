const wsUri = "wss://echo-ws-service.herokuapp.com";
const output = document.getElementById("output");
const btn = document.querySelector('.button');
const input = document.querySelector('.input');
const geo = document.querySelector('.geo');
const status = document.querySelector('#status');
const mapLink = document.querySelector('#map-link');

const error = () => {
  status.textContent = 'Невозможно получить ваше местоположение';
}

const success = (position) => {
  console.log('position', position);
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;

  status.textContent = `Широта: ${latitude} °, Долгота: ${longitude} °`;
  mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
  mapLink.textContent = 'Ссылка на карту';
}

geo.addEventListener('click', () => {
  mapLink.href = '';
  mapLink.textContent = '';
  
  if (!navigator.geolocation) {
    status.textContent = 'Geolocation не поддерживается вашим браузером';
  } else {
    status.textContent = 'Определение местоположения…';
    navigator.geolocation.getCurrentPosition(success, error);
  }
});

//__________________________________________________________________

let websocket;

function writeToScreen(message) {
  let pre = document.createElement("p");
  pre.style.wordWrap = "break-word";
  pre.innerHTML = message;
  output.appendChild(pre);
  input.value = "";
}

btn.addEventListener('click', () => {
  websocket = new WebSocket(wsUri);
  websocket.onopen = function(evt) {
    console.log("CONNECTED");
    const message = input.value;
    writeToScreen("Сообщение отправителя: " + message);
    websocket.send(message);
  };
  websocket.onclose = function(evt) {
   writeToScreen("DISCONNECTED");
  };
  websocket.onmessage = function(evt) {
    writeToScreen(
      '<span style="color: blue;">Сообщение от сервера: ' + evt.data+'</span>'
    );
  };
  websocket.onerror = function(evt) {
    writeToScreen(
      '<span style="color: red;">ERROR:</span> ' + evt.data
    );
  };
});
