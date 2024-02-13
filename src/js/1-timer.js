import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from 'izitoast';
import 'flatpickr/dist/flatpickr.min.css';

let userSelectedDate;
let countdownInterval;

const startButton = document.querySelector('button')
const inputData = document.querySelector('input#datetime-picker');
const daysData = document.querySelector('[data-days]');
const hoursData = document.querySelector('[data-hours]');
const minutesData = document.querySelector('[data-minutes]');
const secondsData = document.querySelector('[data-seconds]');
const timer = document.querySelector(".timer");

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      if (userSelectedDate < Date.now()) {
            iziToast.error({
              title: 'Error',
              message: 'Please choose a date in the future',
            });
            disableStartButton();
      } else {
            enableStartButton();
        }
  },
};

function enableStartButton() {
  startButton.disabled = false;
}
function disableStartButton() {
  startButton.disabled = true;
}