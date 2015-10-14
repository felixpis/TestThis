/**
 * Created by felixp on 09/04/2015.
 */

(function(angular){

    angular.module('leafTest')
        .directive('actionsDirective', ActionsDirective);


    //////////////////////////////////////



    function ActionsDirective(){
        return{
            restrict: 'E',
            scope: {
                setAction: '&',
                cancelAction: '&',
                markerName:'@'
            },
            templateUrl: 'src/actions/actions-template.html',
            controller: 'ActionsController',
            controllerAs: 'vm',
            bindToController: true
        }
    }

})(angular);