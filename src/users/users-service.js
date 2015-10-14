/**
 * Created by felixp on 09/04/2015.
 */




(function(angular){

    angular.module('leafTest')
        .factory('UsersService', UsersService);


    ///////////////////////////////////////////


    function UsersService(){

        var me = {
            marker:{

            }
        };

        var others ={
            a : 4
        }

        return{
            me: me,
            others: others
        }

    }



})(angular);
