(function() {

    'use strict';

    angular.module('app.core')
        .directive('wordlePlayer', wordlePlayer);

    function wordlePlayer() {
        return {
            restrict: 'E',
            scope: {
                data: '=',
                wordClicked: '&wordClicked'
            },
            transclude: true,
            replace: true,
            templateUrl: 'app/core/directives/wordlePlayer/wordlePlayer.html',
            link: function($scope, element, attrs, form) {

                $scope.wordle = element.get()[0].children[0];
                window.$box = angular.element('box');
                WordCloud([$scope.wordle], {
                    list: $scope.data,
                    gridSize: 8,
                    weightFactor: 1.5,
                    fontFamily: 'serif',
                    fontWeight: 'normal',
                    color: '#f0f0c0',
                    hover: window.drawBox,
                    click: function(item) {
                        console.log('word clicked: ' + item);
                        $scope.wordClicked()(JSON.parse(angular.toJson(item)));
                    },
                    backgroundColor: '#001f00'
                });
                console.log('linking wordle player');
                element.on('$destroy', function() {
                    console.log('destroy of wordle player');
                    $scope.wordle
                    $scope.wordle = null;
                });
            },
            controller: function($scope) {


            }
        };
    }
})();