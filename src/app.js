/**
 * Created by felixp on 07/04/2015.
 */

(function(angular){

    angular.module('leafTest', ['leaflet-directive'])
        .controller('SimpleMapController', SimpleMapController);




    function SimpleMapController($scope){

        var vm = this;
        vm.center = {};
        vm.markers = {};
        vm.actions = {
            SendTo: {
                SelectPlace: false,
                Source: null
            }
        };
        vm.paths = {
            p1: {
                color: '#008000',
                weight: 2,
                latlngs: []
            }};

        window.navigator.geolocation.getCurrentPosition(function(response) {
            setMyCenter(response.coords);
            //createMyMarker(response.coords);
            createMarkers(response.coords);
            createPath();

            watchMarkerDrag();
            vm.center.zoom = 16;
        });

        vm.defaults = {
            scrollWheelZoom: true
        };

        vm.SetAction = function(sourceMarker){
            vm.actions.SendTo.SelectPlace = true;
            vm.actions.SendTo.Source = sourceMarker;
        }

        vm.CancelAction = function(){
            vm.actions.SendTo.SelectPlace = false;
            vm.actions.SendTo.Source = null;
        }

        function setMyCenter(coords){
            vm.center.lat = coords.latitude;
            vm.center.lng = coords.longitude;
        }

        function createMyMarker(name, coords){

            vm.markers[name] = {
                name: name,
                lat: coords.latitude,
                lng: coords.longitude,
                message: "<actions-directive marker-name=\"{{markerName}}\" set-action=\"vm.SetAction(vm.markers[markerName])\" cancel-action=\"vm.CancelAction()\"></actions-directive>",
                getMessageScope: function () {
                    $scope.markerName = name;
                    return $scope;
                },
                focus: false,
                draggable: false,
                icon: {
                    type: 'awesomeMarker',
                    icon: 'fa-male',
                    markerColor: 'green',
                    prefix: 'fa'
                }
            };
        }

        function createMarkers(coords){
            var count = 5;

            createMyMarker('user1', coords);

            for(var i=2; i<= count;i++) {
                createMyMarker('user' + i, {
                    latitude: coords.latitude + (Math.random() / 100) * 2 - 0.01,
                    longitude: coords.longitude + (Math.random()/ 100) * 2 - 0.01
                });
            }
        }

        function createPath(){


            //for(var m in vm.markers){
            //    vm.paths.p1.latlngs.push({lat: vm.markers[m].lat, lng: vm.markers[m].lng});
            //}
        }

        function watchMarkerDrag(){
            /*$scope.$watch('vm[markers]', function(newVal, oldVal){
                console.log(newVal);
            }, false);*/


            $scope.$on("leafletDirectiveMap.click", function(event, args){

                if(vm.actions.SendTo.SelectPlace){
                    var leafEvent = args.leafletEvent,
                        destination = vm.actions.SendTo.Source.name + "_dest",
                        path = vm.actions.SendTo.Source.name + "_path";

                    vm.markers[destination] = {
                        lat: leafEvent.latlng.lat,
                        lng: leafEvent.latlng.lng,
                        message: "My Added Marker"
                    };

                    vm.paths[path] = {
                        color: '#008000',
                        weight: 2,
                        latlngs: []
                    }

                    vm.paths[path].latlngs.push({
                        lat: vm.actions.SendTo.Source.lat,
                        lng: vm.actions.SendTo.Source.lng
                    });

                    vm.paths[path].latlngs.push({
                        lat: leafEvent.latlng.lat,
                        lng: leafEvent.latlng.lng
                    });

                    vm.actions.SendTo.SelectPlace = false;
                    vm.actions.SendTo.Source = null;
                }
            });
        }
    }

})(angular);


