document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('signup-form').addEventListener('submit', (event) => {
  event.preventDefault();
  document.getElementById('notice').textContent = 'You’re on the list. We’ll be in touch when it gets messy.';
  event.currentTarget.reset();
});
