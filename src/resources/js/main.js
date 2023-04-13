const dropdownToggles = document.querySelectorAll('.dropdown-toggle')

dropdownToggles.forEach(toggle => {
  toggle.addEventListener('click', () => {
    toggle.parentNode.classList.toggle('active')
  })
})

// Lógica para menu-mobile
const tratamentosMobile = document.querySelector('.has-submenu-mobile')

tratamentosMobile.addEventListener('click', function () {
  this.classList.toggle('active')
})

const esteticaMobile = document.querySelector('.has-submenu--estetica-mobile')

esteticaMobile.addEventListener('click', function (e) {
  e.stopPropagation()
  this.classList.toggle('active')
})

const cirurgiaMobile = document.querySelector('.has-submenu--cirurgia-mobile')

cirurgiaMobile.addEventListener('click', function (e) {
  e.stopPropagation()
  this.classList.toggle('active')
})

// abrir menu-mobile
function openNav() {
  document.getElementById('mySidepanel').style.width = '250px'
}

function closeNav() {
  document.getElementById('mySidepanel').style.width = '0'
}

// logica drop-down-menu-mobile
const dropdowns = document.querySelectorAll('select')
dropdowns.forEach(dropdown => {
  dropdown.addEventListener('change', event => {
    const selectedOption = event.target.options[event.target.selectedIndex]
    if (selectedOption.getAttribute('data-href')) {
      window.location.href = selectedOption.getAttribute('data-href')
    }
  })
})
