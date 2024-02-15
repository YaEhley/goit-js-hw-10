import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

    document.addEventListener('DOMContentLoaded', function () {
      let userSelectedDate;
      const datePicker = flatpickr("#datetime-picker", {
        enableTime: true,
        onClose: function (selectedDates, dateStr, instance) {
          userSelectedDate = selectedDates[0];
          const now = new Date();
          if (userSelectedDate <= now) {
            iziToast.error({
              position: 'topCenter',
              title: 'Error',
              message: 'Please choose a date in the future',
            });
            document.querySelector('#start-btn').disabled = true;
          } else {
            document.querySelector('#start-btn').disabled = false;
          }
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
          document.querySelector('#start-btn').disabled = false;
          return;
        }

        const { days, hours, minutes, seconds } = convertMs(ms);
        document.querySelector('#days').innerText = days;
        document.querySelector('#hours').innerText = hours;
        document.querySelector('#minutes').innerText = minutes;
        document.querySelector('#seconds').innerText = seconds;
      }

      let timerInterval;
      document.querySelector('#start-btn').addEventListener('click', function () {
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