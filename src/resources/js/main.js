const dropdownToggles = document.querySelectorAll('.dropdown-toggle')

dropdownToggles.forEach(toggle => {
  toggle.addEventListener('click', () => {
    toggle.parentNode.classList.toggle('active')
  })
})
