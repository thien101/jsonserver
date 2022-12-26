var btn = document.querySelector('#btn');
console.log(btn);
btn.addEventListener('click',(e) => {
    e.preventDefault();
    var h1 = document.querySelector('.text');
    h1.innerHTML = 'OK Fine!'
    console.log(h1);
});