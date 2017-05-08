(function() {

    'use strict';

    angular.module('app.trans-it')
        .service('VoiceTranscriptService', VoiceTranscriptService);

    function VoiceTranscriptService($q, $mdToast, msApi, $log, AssetBasePath, $resource, $http) {

        function getAllRecordings() {
            var deferred = $q.defer();

            var getAllRecordingsQuery = $resource(AssetBasePath + '/metadata/recordings.json', {}, {
                query: {
                    method: 'GET',
                    cache: false
                }
            });

            getAllRecordingsQuery.query({}, function(response) {
                //callback(true, response);
                deferred.resolve(response);
            }, function(error) {
                //Materialize.toast(err.data && err.data.message ? err.data.message : 'Something going wrong', toastConfig.duration, 'toast-error');
                deferred.reject(error);
            });

            return deferred.promise;
        }

        function getCuePoints(fileId) {
            var deferred = $q.defer();

            var getCuePointsQuery = $resource(AssetBasePath + '/metadata/' + fileId + '.ts.json', {}, {
                query: {
                    method: 'GET',
                    cache: false
                }
            });

            getCuePointsQuery.query({}, function(response) {
                //callback(true, response);
                deferred.resolve(response);
            }, function(error) {
                //Materialize.toast(err.data && err.data.message ? err.data.message : 'Something going wrong', toastConfig.duration, 'toast-error');
                deferred.reject(error);
            });

            return deferred.promise;
        }

        function getWordCount(fileId) {
            var deferred = $q.defer();

            var getWordCountQuery = $resource(AssetBasePath + '/metadata/' + fileId + '.wc.json', {}, {
                query: {
                    method: 'GET',
                    cache: false
                }
            });

            getWordCountQuery.query({}, function(response) {
                //callback(true, response);
                deferred.resolve(response);
            }, function(error) {
                //Materialize.toast(err.data && err.data.message ? err.data.message : 'Something going wrong', toastConfig.duration, 'toast-error');
                deferred.reject(error);
            });

            return deferred.promise;
        }

        function getTranscript(fileName) {
            var deferred = $q.defer();

            $http({ method: "GET", url: (AssetBasePath + '/metadata/' + fileName + '.txt') })
                .then(function(response) {
                    deferred.resolve(response);
                    // data should be text string here (only if the server response is text/plain)
                })
                .catch(function(error) {
                    deferred.reject(error);
                });

            // var getTranscriptQuery = $resource(AssetBasePath + '/metadata/' + fileName + '.txt', {}, {
            //     query: {
            //         method: 'GET',
            //         cache: false
            //     }
            // });

            // getTranscriptQuery.query({}, function(response) {
            //     //callback(true, response);
            //     console.log(response);
            //     deferred.resolve(response);
            // }, function(error) {
            //     //Materialize.toast(err.data && err.data.message ? err.data.message : 'Something going wrong', toastConfig.duration, 'toast-error');
            //     deferred.reject(error);
            // });

            return deferred.promise;
        }

        return {
            getAllRecordings: getAllRecordings,
            getCuePoints: getCuePoints,
            getWordCount: getWordCount,
            getTranscript: getTranscript
        };
    }

})();