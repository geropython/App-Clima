const urlBase = `https://api.openweathermap.org/data/2.5/weather`
let API_KEY = '9097d8123a279879ef077c2a2560d318'
const diffKelvin = 273.15

document.getElementById('searchButton').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    if (city) {
        FetchWeather(city)
    } else {
        alert("Ingrese una ciudad válida.");
    }
});

function FetchWeather(city) {
    fetch(`${urlBase}?q=${city}&appid=${API_KEY}&lang=es`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Ciudad no encontrada");
            }
            return response.json();
        })
        .then(data => ShowWeatherData(data))
        .catch(error => {
            alert(error.message);
        });
}

function ShowWeatherData(data) {
    const divResponseDate = document.getElementById('responseData');
    divResponseDate.innerHTML = '';

    const cityName = data.name;
    const countryName = data.sys.country;
    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;

    const cityInfo = document.createElement('h2');
    cityInfo.textContent = `${cityName}, ${countryName}`;

    const tempInfo = document.createElement('h2');
    tempInfo.textContent = `La temperatura es: ${Math.floor(temp - diffKelvin)}°C`;

    const humidityInfo = document.createElement('p');
    humidityInfo.textContent = `La humedad es del: ${humidity}%`;

    const iconInfo = document.createElement('img'); // Corrección aquí
    iconInfo.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    iconInfo.alt = "Icono del clima";

    const descInfo = document.createElement('p'); // Corrección aquí
    descInfo.textContent = `La descripción meteorológica es: ${description}.`;

    divResponseDate.appendChild(cityInfo);
    divResponseDate.appendChild(tempInfo);
    divResponseDate.appendChild(humidityInfo);
    divResponseDate.appendChild(iconInfo);
    divResponseDate.appendChild(descInfo);
}
