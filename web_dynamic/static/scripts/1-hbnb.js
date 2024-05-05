$(document).ready(function() {
    let selectedAmenities = {};
    function updateAmenities() {
        let selectedAmenitiesList = Object.values(selectedAmenities);
        let amenitiesString = selectedAmenitiesList.join(", ");
        $(".amenities h4").text(amenitiesString);
    }

    $(".amenities input[type='checkbox']").change(function() {
        let amenityId = $(this).data("id");
        let amenityName = $(this).data("name");
        if ($(this).is(":checked")) {
            selectedAmenities[amenityId] = amenityName;
        } else {
            delete selectedAmenities[amenityId];
        }
        updateAmenities();
    });
});
