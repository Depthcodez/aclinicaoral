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
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    const reviews = place.reviews

    const reviewsList = $('#reviews-carousel')

    if (Array.isArray(reviews)) {
      reviews
        .sort((a, b) => b.time - a.time)
        .forEach(review => {
          if (review.rating >= 3) {
            const li = $('<li></li>')
            li.html(
              `<div><p><strong>${review.author_name}</strong></p><p>${review.text}</p><p class="rating">${review.rating}/5</p></div>`
            )
            reviewsList.append(li)
          }
        })
    } else {
      const li = $('<li></li>')
      li.text('Nenhuma avaliação encontrada.')
      reviewsList.append(li)
    }

    reviewsList.slick({
      dots: true,
      arrows: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    })
  } else {
    console.error('Erro ao obter informações do local')
  }
})
