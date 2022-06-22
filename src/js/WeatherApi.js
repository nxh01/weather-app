
// Naming variables that we will use
const navInput = document.querySelector('.search')
const searchButton = document.querySelector('.search-icon')

var apiKey = '5bfe7dfb63643534add03d8a6fd4ab5d'
var apiBase = 'https://api.openweathermap.org/data/2.5/weather?q='


// Validating the text that the user has searched
navInput.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        validate(e);
    }
})

// Validating what user has told to search and getting data
let inputValueArray = []

function validate(e) {
    var inputValue = e.target.value

    if (inputValueArray.length >= 3) {
        inputValueArray.shift()
        inputValueArray.push(inputValue)
    }
    else {
        inputValueArray.push(inputValue)
    }

    // Fetching API and getting the json data
    fetch(apiBase + inputValue + '&units=metric&APPID=' + apiKey)
        .then(res => res.json())
        .then(data => {
            var temp = data['main']['temp']
            var clouds = data['clouds']['all'] + '%'
            var latitude = data['main']['coord']
            var longitude = data['main']['coord']
            var humidity = data['main']['humidity'] + '%'
            var main = data['weather']['0']['main']
            var description = data['weather']['0']['description']
            var wind = data['wind']['speed'] + 'km/h'
            console.log(data)
        })

    // Reset the value of the search input to empty
    navInput.value = ''
}


// Searching with search button
searchButton.addEventListener('click', () => {
    console.log(inputValueArray)
})