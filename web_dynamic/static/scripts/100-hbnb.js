document.addEventListener('DOMContentLoaded', function () {
  const selectedAmenities = {};
  const selectedStates = {};
  const selectedCities = {};

  function updateAmenities () {
    const selectedAmenitiesList = Object.values(selectedAmenities);
    const amenitiesString = selectedAmenitiesList.join(', ');
    $('.amenities h4').text(amenitiesString);
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

  $(".locations input[type='checkbox']").change(function () {
    const locationId = $(this).data('id');
    const locationName = $(this).data('name');
    if ($(this).is(':checked')) {
      if ($(this).parent().find('ul').length > 0) {
        selectedStates[locationId] = locationName;
      } else {
        selectedCities[locationId] = locationName;
      }
    } else {
      if ($(this).parent().find('ul').length > 0) {
        delete selectedStates[locationId];
      } else {
        delete selectedCities[locationId];
      }
    }
    const selectedLocations = Object.values({ ...selectedStates, ...selectedCities });
    const locationsString = selectedLocations.join(', ');
    $('.locations h4').text(locationsString);
  });

  function searchPlaces () {
    fetch('http://0.0.0.0:5001/api/v1/places_search/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amenities: Object.keys(selectedAmenities),
        states: Object.keys(selectedStates),
        cities: Object.keys(selectedCities)
      })
    })
      .then(response => response.json())
      .then(data => {
        const placesSection = document.querySelector('.places');
        placesSection.innerHTML = '';

        data.forEach(place => {
          const article = document.createElement('article');
          article.innerHTML = `
          <div class="title_box">
            <h2>${place.name}</h2>
            <div class="price_by_night">$${place.price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
            <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
            <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
          </div>
          <div class="description">${place.description}</div>
          `;
          placesSection.appendChild(article);
        });
      })
      .catch(error => {
        console.error('Error fetching places data:', error);
      });
  }
  document.querySelector('button').addEventListener('click', searchPlaces);
});
