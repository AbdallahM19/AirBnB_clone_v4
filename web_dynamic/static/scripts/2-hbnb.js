document.addEventListener('DOMContentLoaded', function () {
  const selectedAmenities = {};

  function updateAmenities () {
    const selectedAmenitiesList = Object.values(selectedAmenities);
    const amenitiesString = selectedAmenitiesList.join(', ');
    $('.amenities h').text(amenitiesString);
  }

  $(".amenities input[type='checkbox']").change(function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');
    if ($(this).is(':checked')) {
      selectedAmenities[amenityId] = amenityName;
    } else {
      delete selectedAmenities[amenityId];
    }
    updateAmenities();
  });
  fetch('http://0.0.0.0:5001/api/v1/status/')
    .then(response => response.json())
    .then(data => {
      if (data.status === 'OK') {
        document.getElementById('api_status').classList.add('available');
      } else {
        document.getElementById('api_status').classList.remove('available');
      }
    })
    .catch(error => {
      console.error('Error fetching API status:', error);
    });
});
