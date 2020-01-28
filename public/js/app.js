const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const messageone = document.querySelector('#messageone');
const messagetwo = document.querySelector('#messagetwo');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    const url = 'http://localhost:3000/weather?address=' + location

    messageone.textContent = "Loading...";
    messagetwo.textContent = '';

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageone.textContent = data.error;
            }
            else {
                messageone.textContent = data.location;
                messagetwo.textContent = data.forecast;
            }
            search.value = '';
        })

    })
})