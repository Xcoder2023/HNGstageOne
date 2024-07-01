// script.js
document.addEventListener('DOMContentLoaded', () => {
  const currentTimeUTC = document.getElementById('currentTimeUTC');
  const currentDay = document.getElementById('currentDay');
  const currentDate = document.getElementById('currentDate');
  const goalsList = document.getElementById('goalsList');
  let draggedItem = null;

  function updateTime() {
      const now = new Date();
      currentTimeUTC.textContent = now.toUTCString().split(' ')[4];
      currentDay.textContent = now.toLocaleDateString('en-US', { weekday: 'long' });
      currentDate.textContent = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  setInterval(updateTime, 1000);
  updateTime();

  goalsList.addEventListener('dragstart', (e) => {
      draggedItem = e.target;
      e.target.style.opacity = 0.5;
  });

  goalsList.addEventListener('dragend', (e) => {
      e.target.style.opacity = "";
      draggedItem = null;
  });

  goalsList.addEventListener('dragover', (e) => {
      e.preventDefault();
  });

  goalsList.addEventListener('dragenter', (e) => {
      if (e.target.tagName === 'LI' && e.target !== draggedItem) {
          e.target.style.borderTop = '2px solid #0073e6';
      }
  });

  goalsList.addEventListener('dragleave', (e) => {
      if (e.target.tagName === 'LI') {
          e.target.style.borderTop = '';
      }
  });

  goalsList.addEventListener('drop', (e) => {
      if (e.target.tagName === 'LI' && e.target !== draggedItem) {
          e.target.style.borderTop = '';
          goalsList.insertBefore(draggedItem, e.target.nextSibling);
      }
  });
});
