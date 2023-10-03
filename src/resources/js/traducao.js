function translateText(query) {
  return new Promise((resolve, reject) => {
    // Dividir a query em sentenças baseado no ponto final e exclamação.
    const sentences = query
      .split(/[.!]/)
      .filter(sentence => sentence.trim() !== '')

    const promises = sentences.map(sentence => {
      return new Promise((resolveSentence, rejectSentence) => {
        $.ajax({
          url: `https://translate.googleapis.com/translate_a/single?client=gtx&sl=pt&tl=en&dt=t&q=${encodeURIComponent(
            sentence.trim()
          )}`,
          method: 'GET',
          success: function (response) {
            resolveSentence(response[0][0][0])
          },
          error: function () {
            rejectSentence(null)
          }
        })
      })
    })

    // Quando todas as sentenças estiverem traduzidas, junte-as e resolva a Promise principal.
    Promise.all(promises)
      .then(translatedSentences => {
        resolve(translatedSentences.join('. '))
      })
      .catch(error => {
        reject(error)
      })
  })
}

const placeId = 'ChIJfZbyEzhXzpQRlhDURW4spRU'
const fields = [
  'name',
  'rating',
  'formatted_phone_number',
  'geometry',
  'reviews'
]

const service = new google.maps.places.PlacesService(
  document.createElement('div')
)

service.getDetails({ placeId, fields }, (place, status) => {
  const reviews = place.reviews
  const reviewsList = $('#reviews-carousel')

  if (Array.isArray(reviews)) {
    const promises = reviews.map(review => {
      if (review.rating >= 4) {
        return translateText(review.text)
          .then(translatedText => {
            const reviewDate = new Date(review.time * 1000)
            const formattedDate = reviewDate.toLocaleDateString('pt-BR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })

            const li = $('<li></li>')
            li.html(`
            <div class="depoimento-box">
                <div class="title-box">
                    <div class="username">
                        <img src="${review.profile_photo_url}" alt="Foto do ${
              review.author_name
            }">
                        <div class="name-author">
                            <p>${review.author_name}</p>
                            <p class="date-com">${formattedDate}</p>
                        </div>
                    </div>
                    <img class="googleimg" src="./resources/img/google.svg" alt="Logo do google">
                </div>
                <div class="avaliacao">
                    ${(() => {
                      let starString = ''
                      for (let j = 1; j <= 5; j++) {
                        if (j <= review.rating) {
                          starString +=
                            '<span class="fa fa-star checked"></span>'
                        } else {
                          starString += '<span class="fa fa-star"></span>'
                        }
                      }
                      return starString
                    })()}
                </div>
                <div class="text-avaliacao">
                    ${translatedText ? translatedText : review.text}
                </div>
            </div>
        `)

            reviewsList.append(li)
          })
          .catch(error => {
            console.error('Error translating review:', error)
          })
      }
    })

    // Aguarde todas as traduções serem concluídas antes de inicializar o carrossel
    Promise.all(promises).then(() => {
      reviewsList.slick({
        dots: true,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1
            }
          }
        ]
      })
    })
  } else {
    const li = $('<li></li>')
    li.text('No reviews found.')
    reviewsList.append(li)
  }
})
