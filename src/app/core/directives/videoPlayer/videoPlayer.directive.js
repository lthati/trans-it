(function() {
    'use strict';

    angular
        .module('app.core')
        .directive('videoPlayer', videoPlayer);

    function videoPlayer() {
        return {
            restrict: 'E',
            scope: {
                source: '=',
                type: '='
            },
            transclude: false,
            replace: true,
            templateUrl: 'app/core/directives/videoPlayer/videoPlayer.html',
            link: function($scope, element, attrs, form) {

                $scope.videoElement = element.get()[0];
                $scope.videoElement.autoPlay = true;
                $scope.videoElement.src = $scope.source;
                // $scope.videoElement.type = type;
                $scope.videoElement.controls = true;
                $scope.videoElement.load();
                $scope.videoElement.play();

                console.log('linking videoPlayer');
                element.on('$destroy', function() {
                    console.log('destroy of videoPlayer');
                });
            },
            controller: function($scope) {

                $scope.play = function() {
                    $scope.videoElement.play();
                }

                $scope.pause = function() {
                    $scope.videoElement.pause();
                }

                $scope.stop = function() {
                    $scope.pause();
                    $scope.skipTo(0);
                }

                $scope.skipTo = function(time) {
                    $scope.videoElement.currentTime = time;
                }
            }
        };
    }
})();