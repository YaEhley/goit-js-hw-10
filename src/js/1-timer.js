import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate;
let timerInterval;
const startButton = document.querySelector('[data-start]');
const daysDisplay = document.querySelector('[data-days]');
const hoursDisplay = document.querySelector('[data-hours]');
const minutesDisplay = document.querySelector('[data-minutes]');
const secondsDisplay = document.querySelector('[data-seconds]');
startButton.disabled = true;


    document.addEventListener('DOMContentLoaded', function () {
      flatpickr("#datetime-picker", {
        enableTime: true,
        onClose: function (selectedDates) {
          userSelectedDate = selectedDates[0];
          const now = new Date();
          if (userSelectedDate <= now) {
            iziToast.error({
              position: 'topCenter',
              title: 'Error',
              message: 'Please choose a date in the future',
            });
            startButton.disabled = true;
          } else {
            startButton.disabled = false;
          }
          clearInterval(timerInterval);
        }
      });

      function updateTimer() {
        const now = new Date();
        const ms = userSelectedDate - now;
        if (ms <= 0) {
          clearInterval(timerInterval);
          iziToast.success({
            title: 'Success',
            message: 'Countdown finished!',
          });
          startButton.disabled = false;
          return;
        }

        const { days, hours, minutes, seconds } = convertMs(ms);
        daysDisplay.innerText = addLeadingZero(days);
        hoursDisplay.innerText = addLeadingZero(hours);
        minutesDisplay.innerText = addLeadingZero(minutes);
        secondsDisplay.innerText = addLeadingZero(seconds);
      }

      function addLeadingZero(value) {
        return value.toString().padStart(2, '0');
      }


      startButton.addEventListener('click', function () {
        if (!userSelectedDate) {
          iziToast.error({
          position: 'topCenter',
          title: 'Error',
          message: 'Please choose a future date before starting the timer',
          });
          return;
        }
        timerInterval = setInterval(updateTimer, 1000);
        this.disabled = true;
      });
    });

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