/**
 * Created by felixp on 09/04/2015.
 */

(function(angular){

    angular.module('leafTest')
        .controller('ActionsController', ActionsController);


    //////////////////////////////////////



    function ActionsController($scope){
        var vm = this;

        vm.SetSendTo = function(){
            vm.SelectActionMode = true;
            vm.setAction();
        }

        vm.Cancel = function(){
            vm.SelectActionMode = false;
            vm.cancelAction();
        }
    }

})(angular);