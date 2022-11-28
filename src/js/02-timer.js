import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';



const refs = {
    text: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),
    timer: document.querySelector('.timer'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]')
}

refs.startBtn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
    console.log(selectedDates[0]);

    if(selectedDates[0] < new Date()){
        Notiflix.Notify.failure('Please choose a date in the future');
        refs.startBtn.disabled = true;
    } else {
        refs.startBtn.disabled = false;
    }
    },
};

flatpickr(refs.text, options);

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  
  function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
  }

refs.startBtn.addEventListener('click', () => {
let timerCount = setInterval(() => {
let deadline = new Date(refs.text.value) - new Date();
refs.startBtn.disable = true;
if(deadline >= 0){
    let timeElement = convertMs(deadline);
    refs.days.textContent = addLeadingZero(timeElement.days);
    refs.hours.textContent = addLeadingZero(timeElement.hours);
    refs.minutes.textContent = addLeadingZero(timeElement.minutes);
    refs.seconds.textContent = addLeadingZero(timeElement.seconds);



} else{
    Notiflix.Notify.success('Timer finished!');
    clearInterval(timer);
  }
}, 1000)
})