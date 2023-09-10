import axios from 'axios';

// Установка заголовка с ключом API
axios.defaults.headers.common['x-api-key'] = 'ВАШ_КЛЮЧ_API';

// Создание элементов HTML
var title = document.createElement('h1');
title.textContent = 'Поиск кота';

var input = document.createElement('input');
input.type = 'text';
input.id = 'breed';
input.placeholder = 'Введите породу кота';

var button = document.createElement('button');
button.textContent = 'Поиск';
button.onclick = searchCat;

var resultDiv = document.createElement('div');
resultDiv.id = 'result';

// Добавление элементов на страницу
document.body.appendChild(title);
document.body.appendChild(input);
document.body.appendChild(button);
document.body.appendChild(resultDiv);

function searchCat() {
    var breed = document.getElementById('breed').value;
    axios.get('https://api.thecatapi.com/v1/breeds/search?q=' + breed)
        .then(response => {
            var data = response.data;
            var resultDiv = document.getElementById('result');
            if (data.length > 0) {
                var cat = data[0];
                resultDiv.innerHTML = 'Порода: ' + cat.name + '<br>' +
                                      'Описание: ' + cat.description;
            } else {
                resultDiv.innerHTML = 'К сожалению, информация о данной породе не найдена.';
            }
        })
        .catch(error => console.error('Ошибка:', error));
}