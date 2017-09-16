(function () {
    'use strict';

    angular
        .module('app')
        .controller('TestSeriesViewController', TestSeriesViewController);

    TestSeriesViewController.$inject = ['$scope','UserService', '$rootScope'];
    function TestSeriesViewController($scope,UserService, $rootScope) {
        var vm = this;

   
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
        $scope.allTestseries=[{id:1,'name':'test11'}, {id:2,'name':'test22'}, {id:3,'name':'test33'},{id:4,'name':'test44'},{id:5,'name':'test55'},{id:6,'name':'test66'}];
        $scope.getnextLevel=function(testId){
            alert(testId);
        }

    }

})();