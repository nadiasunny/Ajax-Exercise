'use strict';

// PART 1: SHOW A FORTUNE

function showFortune(evt) {
  // TODO: get the fortune and show it in the #fortune-text div
  
  //fetch waits for response from /fortune, so it returns promise
  fetch('/fortune')
    //return text, response.text parses text and returns another promise
    .then((response)=>response.text())
    //once we have that parsed text we can 
    .then((serverData) => {
      //set our div text to that text
      document.querySelector('#fortune-text').innerHTML = serverData;
    });
}

document.querySelector('#get-fortune-button').addEventListener('click', showFortune);

// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();
  
  const zipcode = document.querySelector('#zipcode-field').value;
  let url = `/weather.json?zipcode=${zipcode}`;

  // TODO: request weather with that URL and show the forecast in #weather-info
  fetch(url)
    .then((response)=>response.json())
    .then((weatherData) => { 
      document.querySelector('#weather-info').innerText = weatherData['forecast'];
    });
   
}

document.querySelector('#weather-form').addEventListener('submit', showWeather);

// PART 3: ORDER MELONS

function orderMelons(evt) {
  evt.preventDefault();
  let status = document.getElementById('order-status');
  let qty = document.getElementById('qty-field').value;
  let melon = document.querySelector('#melon-type-field').value;

  let mesDet = {'melon_type': melon, 'qty': qty};
  // url = '/order-melons.json';
  
  fetch('/order-melons.json', {
    method: 'POST',
    body: JSON.stringify(mesDet),
    headers: {'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if(data.code !== 'ERROR'){
        status.classList.remove('order-error');
        status.innerHTML = `${data.msg}`;} 
        else {
        status.innerHTML = `${data.msg}`;
        status.classList.add('order-error');
      };

      //status.innerHTML = data.message;
    });
    
  // TODO: show the result message after your form
  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)
}
document.querySelector('#order-form').addEventListener('submit', orderMelons);


function doggos(evt){
  fetch('https://dog.ceo/api/breeds/image/random')
  .then((response) => response.json())
  .then((data) => {
    document.querySelector('#dog-image').insertAdjacentHTML('beforeend', `<img src='${data.message}'/>`);
  })
}

document.querySelector('#get-dog-image').addEventListener('click', doggos);