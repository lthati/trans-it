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

                // $scope.videoElement = element.get()[0];
                // $scope.videoElement.autoPlay = true;
                // $scope.videoElement.src = $scope.source;
                // // $scope.videoElement.type = type;
                // $scope.videoElement.controls = true;
                // $scope.videoElement.load();
                // $scope.videoElement.play();

                console.log('linking videoPlayer');
                element.on('$destroy', function() {
                    console.log('destroy of videoPlayer');
                });
            },
            controller: function($scope, $sce) {

                // $scope.config = {
                //     theme: "bower_components/videogular-themes-default/videogular.css"
                // };
                $scope.config = {
                    sources: [
                        { src: "http://static.videogular.com/assets/videos/videogular.mp4", type: "video/mp4" },
                        { src: "http://static.videogular.com/assets/videos/videogular.webm", type: "video/webm" },
                        { src: "http://static.videogular.com/assets/videos/videogular.ogg", type: "video/ogg" }
                    ],
                    tracks: [{
                        src: "http://www.videogular.com/assets/subs/pale-blue-dot.vtt",
                        kind: "subtitles",
                        srclang: "en",
                        label: "English",
                        default: ""
                    }],
                    theme: "bower_components/videogular-themes-default/videogular.css",
                    plugins: {
                        poster: "http://www.videogular.com/assets/images/videogular.png"
                    }
                };

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