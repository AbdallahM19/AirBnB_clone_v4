$(document).ready(function () {
  const selectedAmenities = {};
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
});
