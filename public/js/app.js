console.log('Client side Javascript file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    console.log(location)

    message1.textContent = 'loading....'
    message2.textContent = ''
    fetch(`http://localhost:3000/weather?address=${location}`).then(weatherResponse => {
        weatherResponse.json().then(weatherData => {
            if (weatherData.error) {
                console.log('An error has occured\n' + weatherData.error)
                return message1.textContent = weatherData.error
            }
            message1.textContent = weatherData.location
            message2.textContent = weatherData.forecast
            console.log(weatherData.location)
            console.log(weatherData.forecast)
        })
    })
})