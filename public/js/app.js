// console.log('Print kara de na kuchh bhi....');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const messageOne = document.querySelector('#message1');
const messageTwo = document.querySelector('#message2');

messageOne.textContent = '';
messageTwo.textContent = '';


// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     })
// })




// fetch('http://localhost:3000/weather?address=Delhi').then((response) => {
//     response.json().then((data) => {
//         if(data.error) {
//             console.log(data.error);
//         } else {

//             console.log(data.Location);
//             console.log(data.forecast);
//         }
        
//     })
// })


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();



    const location = search.value;

        
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch('/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            
            messageOne.textContent = data.error;

            console.log(data.error);
        } else {
            
            messageOne.textContent = data.Location;
            messageTwo.textContent = data.forecast;
            console.log(data.Location);
            console.log(data.forecast);
        }
        
    })
})

})


