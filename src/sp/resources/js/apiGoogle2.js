function initMap() {
  var service = new google.maps.places.PlacesService(
    document.createElement('div')
  )
  var request = {
    placeId: 'ChIJfZbyEzhXzpQRlhDURW4spRU'
  }
  service.getDetails(request, function (place, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      var reviews = place.reviews
      var reviewsContainer = document.getElementById('reviews-carousel')
      for (var i = 0; i < reviews.length; i++) {
        var review = reviews[i]
        if (review.rating >= 4) {
          // Verifica se o rating é maior ou igual a 4
          var div = document.createElement('div')
          div.className = 'depoimentos-itens'
          div.innerHTML =
            '<img src="' +
            review.profile_photo_url +
            '" alt="">' +
            '<h3>' +
            review.author_name +
            '</h3>' +
            '<p><div class="text-apost"><p class="apost">' +
            review.text +
            '</p>' +
            '<div class="rating-depoimentos">'
          for (var j = 1; j <= 5; j++) {
            if (j <= review.rating) {
              div.innerHTML += '<span class="fa fa-star checked"></span>'
            } else {
              div.innerHTML += '<span class="fa fa-star"></span>'
            }
          }
          div.innerHTML += '</div>'
          reviewsContainer.appendChild(div)
        }
      }

      $(reviewsContainer).slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: true,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1
            }
          }
        ]
      })
    }
  })
}

initMap()
