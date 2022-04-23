var button = document.querySelector('.button')
var inputValue = document.querySelector('.inputValue')
var name = document.querySelector('.name');
var discr = document.querySelector('.discr');
var temp = document.querySelector('.temp');

button.addEventListener('click', function(){
fetch('https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=b06c8666b0489ca67a5e17b0b7bfba15')
    .then(response => response.json())
    .then(data => {
        var nameValue = data ['name'];
        var tempValue = data['main']['temp'];
        var discrValue = data['weather'][0]['description'];

        name.innerHTML = nameValue
        temp.innerHTML = tempValue
        discr.innerHTML = discrValue
    })



    .catch(err => alert("Wrong city name!"))
})