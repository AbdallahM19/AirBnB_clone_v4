document.addEventListener('DOMContentLoaded', function () {
    let selectedAmenities = {};

    function updateAmenities() {
        let selectedAmenitiesList = Object.values(selectedAmenities);
        let amenitiesString = selectedAmenitiesList.join(", ");
        $(".amenities h4").text(amenitiesString);
    }

    $(".amenities input[type='checkbox']").change(function () {
        let amenityId = $(this).data("id");
        let amenityName = $(this).data("name");
        if ($(this).is(":checked")) {
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

    function searchPlaces() {
        fetch('http://0.0.0.0:5001/api/v1/places_search/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amenities: Object.keys(selectedAmenities)
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