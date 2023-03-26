;<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places"></script>

var place_id = 'PLACE_ID'
var api_key = 'API_KEY'

var request = {
  placeId: place_id,
  fields: ['name', 'rating', 'reviews']
}

var service = new google.maps.places.PlacesService(
  document.createElement('div')
)

service.getDetails(request, function (place, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    var good_reviews = place.reviews.filter(function (review) {
      return review.rating > 3
    })

    good_reviews.forEach(function (review) {
      console.log(review.text)
    })
  }
})
