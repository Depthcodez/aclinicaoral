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

document.addEventListener('DOMContentLoaded', function () {
  const glideElement = document.querySelector('.s-tratamento-base .glide')

  if (glideElement) {
    new Glide(glideElement, {
      type: 'carousel',
      perView: 1,
      autoplay: 4000,
      hoverpause: true
    }).mount()
  }
})

window.addEventListener('load', function () {
  // CORREÇÃO: Seleciona TODOS os elementos .glide na página
  const allCarousels = document.querySelectorAll('.s-tratamento-base .glide')

  // Itera sobre cada carrossel encontrado e o inicia
  allCarousels.forEach(function (carousel) {
    new Glide(carousel, {
      type: 'carousel',
      perView: 1,
      autoplay: 4000,
      hoverpause: true
    }).mount()
  })
})

// Seleciona o popup e o botão "Agendar"
const popup = document.getElementById('whatsapp-popup')
const botaoAgendar = document.getElementById('botao-agendar')

// Função para fechar o popup
function fecharPopup() {
  popup.style.display = 'none'
}

// Adiciona um evento de clique em todos os botões/links de WhatsApp do site
document.addEventListener('DOMContentLoaded', function () {
  // Seleciona todos os links que apontam para o WhatsApp
  const linksWhatsapp = document.querySelectorAll('a[href*="api.whatsapp.com"]')

  linksWhatsapp.forEach(function (link) {
    link.addEventListener('click', function (event) {
      // 1. Previne o comportamento padrão do link (não abre o WhatsApp imediatamente)
      event.preventDefault()

      // 2. Guarda o link original do WhatsApp
      const urlWhatsapp = this.href

      // 3. Define o link no botão "Agendar" do popup
      botaoAgendar.href = urlWhatsapp

      // 4. Mostra o popup
      popup.style.display = 'flex'
    })
  })

  // Fecha o popup se o usuário clicar no fundo escuro
  popup.addEventListener('click', function (event) {
    if (event.target === this) {
      fecharPopup()
    }
  })
})
