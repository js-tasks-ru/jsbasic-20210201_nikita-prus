function toggleText() {
  const btn = document.querySelector('.toggle-text-button');
  btn.addEventListener('click', (event) => {
    text.hidden = !text.hidden;
  });
}
