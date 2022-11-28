const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]')
}

refs.stopBtn.disabled = true;
let timerId = null;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

refs.startBtn.addEventListener('click', () => {

    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;

    timerId = setInterval(() => {
        console.log('start')
        document.body.style.background = getRandomHexColor();  
    }, 1000);
});

refs.stopBtn.addEventListener('click', () => {
    console.log('stop');
    clearInterval(timerId);
    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;
})

