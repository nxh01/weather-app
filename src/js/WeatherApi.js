
// Naming variables that we will use
const navInput = document.querySelector('.search')


var apiKey = '5bfe7dfb63643534add03d8a6fd4ab5d'
var apiBase = 'https://api.openweathermap.org/data/2.5/weather?q='

//  ===============  Variables ===============

// Content Variables
var cityHtml = document.getElementById('city')
var latitudeHtml = document.getElementById('latitude')
var longitudeHtml = document.getElementById('longitude')
var cloudsHtml = document.getElementById('clouds')
var humidityHtml = document.getElementById('humidity')
var windHtml = document.getElementById('wind')

// Headers Variables
var cityHeader = document.getElementById('city-header')
var tempHeader = document.getElementById('temp-header')
var weatherDescMain = document.getElementById('weather-desc-main')
var weatherDesc = document.getElementById('weather-desc')

var Time = document.getElementById('time')


// Date
function NowDate() {
    const date = new Date();

    const day = date.getDate();
    const month = date.getMonth() + 1; // getMonth() returns month from 0 to 11
    const year = date.getFullYear();

    const str = `${day}/${month}/${year}`;

    console.log(str);

    function getMonthName(month) {
        const d = new Date();
        d.setMonth(month - 1);
        const monthName = d.toLocaleString("default", { month: "long" });
        return monthName;
    }

    var DateTime = getMonthName(month) + ' ' + day + ' ' + year

    Time.innerHTML = DateTime

}




// Validating the text that the user has searched
navInput.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        FetchingData(e);
    }
})

// Fetching API Data
function FetchingData(e) {
    var inputValue = e.target.value

    // Fetching API and getting the json data
    fetch(apiBase + inputValue + '&units=metric&APPID=' + apiKey)
        .then(res => res.json())
        .then(data => {
            var city = data['name']
            var temp = data['main']['temp'] + '&#176;'
            var clouds = data['clouds']['all'] + '%'
            var latitude = data['coord']['lat']
            var longitude = data['coord']['lon']
            var humidity = data['main']['humidity'] + '%'
            var main = data['weather']['0']['main']
            var description = data['weather']['0']['description']
            var wind = data['wind']['speed'] + 'km/h'
            console.log(data)

            // var tempTest = temp.substr(-4, 2) + '&#176;'

            // Pushing the data into HTML Content
            cityHtml.innerHTML = city
            latitudeHtml.innerHTML = latitude
            longitudeHtml.innerHTML = longitude
            cloudsHtml.innerHTML = clouds
            humidityHtml.innerHTML = humidity
            windHtml.innerHTML = wind

            // Pushing the data into HTML Headers
            tempHeader.innerHTML = temp
            cityHeader.innerHTML = city
            weatherDescMain.innerHTML = main
            weatherDesc.innerHTML = description

        })

    // Reset the value of the search input to empty
    navInput.value = ''

    // Pushing Date
    NowDate()

    // Pushing Recent Searches
    // PushRecentSearches()
}

// Searching with search button
const searchButton = document.getElementById('search-icon')

searchButton.addEventListener('click', (e) => {
    var navIn = document.getElementById('search').value
    e = navIn
    FetchingData(e);
})

// Recent Searches
const RecentSearch = document.querySelectorAll('.recent')

RecentSearch.forEach(element => {
    element.addEventListener('click', () => {

    })
});
