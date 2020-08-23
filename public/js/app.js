

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')
const message3 = document.querySelector('#message-3')
const message4 = document.querySelector('#message-4')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    console.log(location)

    message1.textContent = 'loading....'
    message2.textContent = ''
    message3.textContent = ''
    message4.textContent = ''
    fetch(`/weather?address=${location}`).then(weatherResponse => {
        weatherResponse.json().then(weatherData => {
            if (weatherData.error) {
                console.log('An error has occured\n' + weatherData.error)
                return message1.textContent = weatherData.error
            }
            message1.textContent = weatherData.location
            message2.textContent = weatherData.forecast
            message3.textContent = `Wind Speed :  ${weatherData.windSpeed}`
            message4.textContent = `Pressure :  ${weatherData.pressure}`
        })
    })
})