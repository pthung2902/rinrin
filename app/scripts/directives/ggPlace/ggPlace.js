'use strict';

/**
 * @ngdoc directive
 * @name rinrinApp.directive:navDirective
 * @description
 * # navDirective
 */
angular.module('rinrinApp').directive('googleplace', function() {
    return {
        require: 'ngModel',
        scope: {
            ngModel: '=',
            details: '=?'
        },
        link: function(scope, element, attrs, model) {
            var options = {
                types: ['geocode'],
                componentRestrictions: {}
            };
            scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

            var map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: 15.7362767, lng: 96.7583873},
                zoom: 5
            });

            var infowindow = new google.maps.InfoWindow();
            //var service = new google.maps.places.PlacesService(map);

            google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                scope.$apply(function() {
                    /*scope.details = scope.gPlace.getPlace();
                    model.$setViewValue(element.val());*/

                        var place = scope.gPlace.getPlace();

                        map = new google.maps.Map(document.getElementById('map'), {
                            center: {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()},
                            zoom: 15
                        });

                        var marker = new google.maps.Marker({
                          map: map,
                          position: place.geometry.location
                        });
                        google.maps.event.addListener(marker, 'click', function() {
                            var storeName = $('#storeName').val();
                            var maketingText = $('#maketingText').val();
                            var marker_content = '<div><strong>' + storeName + '</strong><br>' + maketingText + '<br>' +
                            '' + place.place_id + '<br>' +
                            place.formatted_address + '</div>'; 

                          infowindow.setContent(marker_content);
                          infowindow.open(map, this);
                        });
                      
                    


                    console.log(scope.gPlace.getPlace());

                });
            });
        }
    };
});


/*function MyCtrl($scope) {
    $scope.gPlace;
}*/