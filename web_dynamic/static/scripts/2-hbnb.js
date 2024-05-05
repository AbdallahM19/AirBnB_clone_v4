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
});
