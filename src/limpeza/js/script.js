document.addEventListener('DOMContentLoaded', () => {
  // Header Scroll Effect
  const header = document.querySelector('header')

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)'
      header.style.boxShadow = '0 2px 15px rgba(0,0,0,0.1)'
    } else {
      header.style.backgroundColor = 'rgba(255, 255, 255, 0.9)' // Start slightly transparent
      header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)'
    }
  })

  // Reveal Animations on Scroll
  const observerOptions = {
    threshold: 0.1
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1'
        entry.target.style.transform = 'translateY(0)'
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Apply observer to elements
  const fadeElements = document.querySelectorAll(
    '.card-diferencial, .video-wrapper, .sobre-text, .sobre-image, .address-card'
  )

  fadeElements.forEach(el => {
    el.style.opacity = '0'
    el.style.transform = 'translateY(20px)'
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
    observer.observe(el)
  })

  // Gallery Interactivity
  const mainImage = document.getElementById('main-gallery-image')
  const galleryThumbs = document.querySelectorAll('.gallery-thumb')

  if (mainImage && galleryThumbs.length > 0) {
    galleryThumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        // Update main image source and alt
        mainImage.src = thumb.src
        mainImage.alt = thumb.alt

        // Update active state
        galleryThumbs.forEach(t => t.classList.remove('active'))
        thumb.classList.add('active')
      })
    })
  }

  // Lead Form Submission
  const leadForm = document.getElementById('leadForm')

  if (leadForm) {
    leadForm.addEventListener('submit', async e => {
      e.preventDefault()

      const submitBtn = leadForm.querySelector('.btn-submit')
      const originalBtnText = submitBtn.innerText

      // Loading state
      submitBtn.innerText = 'Enviando...'
      submitBtn.disabled = true

      const formData = new FormData(leadForm)
      const data = Object.fromEntries(formData.entries())

      // Adicionando informações extras solicitadas
      data.procedimento = 'Limpeza Dental' // Nome do serviço
      data.data_hora = new Date().toLocaleString('pt-BR') // Dia e Horário formatado
      data.url_origem = window.location.href // URL da página
      data.source = 'Landing Page Limpeza Dental'

      // SUBSTITUA PELA SUA URL DO MAKE
      const WEBHOOK_URL =
        'https://hook.eu1.make.com/51owa6wchbuo17m72pui74cbptfrp9l6'

      try {
        const response = await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })

        if (response.ok) {
          fbq('track', 'Lead')
          // Mensagem de Sucesso com SweetAlert
          Swal.fire({
            title: 'Sucesso!',
            text: 'Recebemos seus dados e entraremos em contato em breve.',
            icon: 'success',
            confirmButtonColor: '#b8926a' // Cor dourada/bege da sua marca
          })
          leadForm.reset()
        } else {
          throw new Error()
        }
      } catch (error) {
        Swal.fire({
          title: 'Erro!',
          text: 'Ocorreu um erro ao enviar. Tente novamente ou use o WhatsApp.',
          icon: 'error',
          confirmButtonColor: '#b8926a'
        })
      } finally {
        submitBtn.innerText = originalBtnText
        submitBtn.disabled = false
      }
    })
  }
})

// Rastreio de Cliques no WhatsApp (Pixel Lead)
document.addEventListener('DOMContentLoaded', () => {
  // Seleciona todos os links que contém o domínio do WhatsApp
  const wppLinks = document.querySelectorAll(
    'a[href*="api.whatsapp.com"], a[href*="wa.me"]'
  )

  wppLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Verifica se a função do Pixel existe para evitar erros no console
      if (typeof fbq === 'function') {
        fbq('track', 'Lead')
      }
    })
  })
})
