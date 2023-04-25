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
    console.log(reviews);

    if (Array.isArray(reviews)) {
      reviews
        // .sort((a, b) => b.time - a.time)
        .forEach(review => {
          if (review.rating >= 3) {
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
                    <img src="${review.profile_photo_url}" alt="Foto do ${review.author_name}">
                    <div class="name-author">
                      <p>${review.author_name}</p>
                      <p class="date-com">${formattedDate}</p>
                    </div>
                  </div>
                  <img class="googleimg" src="./resources/img/google.svg" alt="Logo do google">
                </div>
                <div class="avaliacao">
                  ${
                    (() => {
                      let starString = "";
                      for (let j = 1; j <= 5; j++) {
                        if (j <= review.rating) {
                          starString += '<span class="fa fa-star checked"></span>';
                        } else {
                          starString += '<span class="fa fa-star"></span>';
                        }
                      }
                      return starString;
                    })()
                  }
                </div>
                <div class="text-avaliacao">
                  ${review.text}
                </p>
              </div>
            `);

          reviewsList.append(li);

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
    });
  } else {
    console.error('Erro ao obter informações do local')
  }
})
