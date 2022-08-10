"use strict";

const btn = document.querySelector(".data__btn");

const inpt = document.querySelector(".data__names").value;
const countriesContainer = document.querySelector(".countries");
let html;
//////////////////////////////////////////////////////

async function getCountryData(countryName) {
  const reqest = new XMLHttpRequest();
  reqest.open("GET", `https://restcountries.com/v3.1/name/${countryName}`);
  reqest.send();

  reqest.addEventListener("load", function () {
    let [data] = JSON.parse(this.responseText);
    console.log(data);

    const currencies = data.currencies;
    const currensyName = Object.values(currencies)[0].name;

    const languages = data.languages;
    const languagesName = Object.values(languages)[0];

    html = `
  <article class="country">
          <img class="country__img" src="${data.flags.svg}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👨‍👩‍👧‍👦</span>${(
              +data.population / 1000000
            ).toFixed(1)} млн</p>
            <p class="country__row"><span>🗣️</span>${languagesName}</p>
            <p class="country__row"><span>💰</span>${currensyName}</p>
          </div>
        </article>
  `;

    countriesContainer.insertAdjacentHTML("afterbegin", html);

    countriesContainer.style.opacity = 1;
  });
}

btn.addEventListener("click", function (e) {
  e.preventDefault();

  countriesContainer.style.opacity = 0;
  const inpt = document.querySelector(".data__names").value;
  getCountryData(inpt);
  console.log(inpt);

  document.getElementById("data__names").value = "";
});
