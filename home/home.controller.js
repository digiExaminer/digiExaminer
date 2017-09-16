(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$location','$scope','UserService', '$rootScope'];
    function HomeController($location,$scope,UserService, $rootScope) {
        var vm = this;

        vm.user = null;
        vm.allUsers = [];
     

        initController();
       
        function initController() {
            loadCurrentUser();
            
        }
        var isShowing = false;
        $scope.playAnimation=function () {
        var zindex = 10;

        $("div.card").click(function (e) {
            e.preventDefault();

            isShowing = false;

            if ($(this).hasClass("show")) {
                isShowing = true
            }

            if ($("div.cards").hasClass("showing")) {
                // a card is already in view
                $("div.card.show")
                        .removeClass("show");

                if (isShowing) {
                    // this card was showing - reset the grid
                    $("div.cards")
                            .removeClass("showing");
                } else {
                    // this card isn't showing - get in with it
                    $(this)
                            .css({zIndex: zindex})
                            .addClass("show");

                }

                zindex++;

            } else {
                // no cards in view
                $("div.cards")
                        .addClass("showing");
                $(this)
                        .css({zIndex: zindex})
                        .addClass("show");

                zindex++;
            }

        });
    }
        $scope.allTestseries=[{id:1,'name':'test1'}, {id:2,'name':'test2'}, {id:3,'name':'test3'},{id:4,'name':'test4'},{id:5,'name':'test5'},{id:6,'name':'test6'}];
        $scope.getnextLevel=function(testId){
        $location.path('/'+testId);
        }
        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                });
        }




    }

})();