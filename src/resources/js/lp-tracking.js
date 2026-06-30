;(function () {
  const WEBHOOK_URL =
    'https://hook.eu1.make.com/51owa6wchbuo17m72pui74cbptfrp9l6'
  const IP_ENDPOINT = 'https://api.ipify.org?format=json'
  let ipPromise = null
  let cachedIp = ''
  const pendingPixels = []

  function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async function getClientIp() {
    if (!ipPromise) {
      ipPromise = fetch(IP_ENDPOINT, { cache: 'no-store' })
        .then(response => (response.ok ? response.json() : null))
        .then(data => {
          cachedIp = data && data.ip ? data.ip : ''
          return cachedIp
        })
        .catch(() => '')
    }

    return ipPromise
  }

  async function enrichLeadData(data) {
    data.evento = data.evento || 'form_submit'
    data.ip_publico = await Promise.race([getClientIp(), timeout(1200)])
    data.user_agent = navigator.userAgent
    data.idioma = navigator.language
    data.pagina_titulo = document.title
    return data
  }

  function trackWhatsappClick(payload) {
    const data = {
      evento: 'whatsapp_click',
      data_hora: new Date().toLocaleString('pt-BR'),
      url_origem: window.location.href,
      pagina_titulo: document.title,
      user_agent: navigator.userAgent,
      idioma: navigator.language,
      ip_publico: cachedIp,
      ...payload
    }

    const queryUrl = WEBHOOK_URL + '?' + new URLSearchParams(data).toString()
    const pixel = new Image()
    pendingPixels.push(pixel)

    return new Promise(resolve => {
      let finished = false

      function finish() {
        if (finished) return
        finished = true
        const index = pendingPixels.indexOf(pixel)
        if (index >= 0) pendingPixels.splice(index, 1)
        resolve(true)
      }

      pixel.onload = pixel.onerror = finish
      pixel.src = queryUrl
      setTimeout(finish, 800)
    })
  }

  async function trackWhatsappClickWithIp(payload) {
    cachedIp = await Promise.race([getClientIp(), timeout(900)])
    return trackWhatsappClick(payload)
  }

  getClientIp()

  window.lpTracking = {
    enrichLeadData,
    trackWhatsappClick,
    trackWhatsappClickWithIp
  }
})()
