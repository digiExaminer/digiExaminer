(function () {
    'use strict';

    angular
        .module('app')
        .controller('TestSeriesNumberViewController', TestSeriesNumberViewController);

    TestSeriesNumberViewController.$inject = ['$location','$scope','UserService', '$rootScope'];
    function TestSeriesNumberViewController($location,$scope,UserService, $rootScope) {
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
         $scope.allTestseries=[{id:1,'name':'test111',imgUrl:'img/ssc.jpg'}, {id:2,'name':'test222',imgUrl:'img/banking.jpg'}, {id:3,'name':'test333',imgUrl:'img/image1.jpg'},{id:4,'name':'test444',imgUrl:'img/ssc.jpg'},{id:5,'name':'test555',imgUrl:'img/banking.jpg'},{id:6,'name':'test666',imgUrl:'img/image1.jpg'}];
        $scope.getnextLevel=function(name,testId,action){
      $location.path('/'+name+'/'+testId+'/'+action);
        }

    }

})();