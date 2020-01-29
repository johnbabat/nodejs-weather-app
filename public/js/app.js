const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const messageone = document.querySelector('#messageone');
const messagetwo = document.querySelector('#messagetwo');

const toggleline = document.querySelector('#toggle');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    const url = '/weather?address=' + location;

    toggleline.style.display = "block";

    messageone.innerHTML = "Loading...";
    messagetwo.innerHTML = '';

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageone.innerHTML = data.error;
            }
            else {
                messageone.innerHTML = data.location;
                messagetwo.innerHTML = data.forecast;
            }
            search.value = '';
        })

    })
})