const dropdownToggles = document.querySelectorAll('.dropdown-toggle')

dropdownToggles.forEach(toggle => {
  toggle.addEventListener('click', () => {
    toggle.parentNode.classList.toggle('active')
  })
})

// Lógica para menu-mobile
// const tratamentosMobile = document.querySelector('.has-submenu-mobile')

// tratamentosMobile.addEventListener('click', function () {
//   this.classList.toggle('active')
// })

// const esteticaMobile = document.querySelector('.has-submenu--estetica-mobile')

// esteticaMobile.addEventListener('click', function (e) {
//   e.stopPropagation()
//   this.classList.toggle('active')
// })

// const cirurgiaMobile = document.querySelector('.has-submenu--cirurgia-mobile')

// cirurgiaMobile.addEventListener('click', function (e) {
//   e.stopPropagation()
//   this.classList.toggle('active')
// })

// abrir menu-mobile
function openNav() {
  document.getElementById('mySidepanel').style.width = '250px'
}

function closeNav() {
  document.getElementById('mySidepanel').style.width = '0'
}

// logica drop-down-menu-mobile
// const dropdowns = document.querySelectorAll('select')
// dropdowns.forEach(dropdown => {
//   dropdown.addEventListener('change', event => {
//     const selectedOption = event.target.options[event.target.selectedIndex]
//     if (selectedOption.getAttribute('data-href')) {
//       window.location.href = selectedOption.getAttribute('data-href')
//     }
//   })
// })

// Lógica collapse Menu mobile
var coll = document.getElementsByClassName('collapsible')
var i

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener('click', function () {
    this.classList.toggle('active')
    var content = this.nextElementSibling
    if (content.style.display === 'block') {
      content.style.display = 'none'
    } else {
      content.style.display = 'block'
    }
  })
}

// Popoup Aceitar cookies
document.addEventListener('DOMContentLoaded', function () {
  checkCookiePermission()
})

function checkCookiePermission() {
  // Verifica se o cookie já foi aceito
  var accepted = localStorage.getItem('cookieAccepted')

  if (accepted !== 'true') {
    // Mostra o popup se o cookie não foi aceito anteriormente
    document.querySelector('.cookie-popup').classList.add('show')
  }
}

function acceptCookies() {
  // Define no localStorage que o cookie foi aceito e esconde o popup
  localStorage.setItem('cookieAccepted', 'true')
  document.querySelector('.cookie-popup').classList.remove('show')
}

function rejectCookies() {
  // Esconde o popup
  document.querySelector('.cookie-popup').classList.remove('show')

  // Limpa o valor específico do localStorage
  localStorage.removeItem('cookieAccepted')

  // Limpar todos os cookies do site
  var cookies = document.cookie.split(';')
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i]
    var eqPos = cookie.indexOf('=')
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/'
  }
}
