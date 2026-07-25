document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('signup-form').addEventListener('submit', (event) => {
  if (!event.currentTarget.checkValidity()) return;
  document.getElementById('notice').textContent = 'You’re on the list. Watch your inbox and phone for the first warning.';
});
