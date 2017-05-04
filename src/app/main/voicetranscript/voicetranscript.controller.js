(function() {
    'use strict';

    angular
        .module('app.trans-it')
        .controller('VoiceTranscript', VoiceTranscript);

    /** @ngInject */
    function VoiceTranscript(VoiceTranscripts, $scope) {
        var vm = this;

        // Data
        vm.voiceRecordings = VoiceTranscripts.data.recordings;
        vm.wordle = VoiceTranscripts.data.wordle;
        // WordCloud(angular.element('canvas').get(), { list: vm.wordle });

        vm.ngFlowOptions = {
            // You can configure the ngFlow from here
            /*target                   : 'api/media/image',
             chunkSize                : 15 * 1024 * 1024,
             maxChunkRetries          : 1,
             simultaneousUploads      : 1,
             testChunks               : false,
             progressCallbacksInterval: 1000*/
        };
        vm.ngFlow = {
            // ng-flow will be injected into here through its directive
            flow: {}
        };
        vm.fileAdded = fileAdded;
        vm.upload = upload;
        vm.fileSuccess = fileSuccess;

        // Methods

        /**
         * File added callback
         * Triggers when files added to the uploader
         *
         * @param file
         */
        function fileAdded(file) {
            // Prepare the temp file data for file list
            var uploadingFile = {
                id: file.uniqueIdentifier,
                file: file,
                type: '',
                owner: 'Emily Bennett',
                size: '',
                modified: moment().format('MMMM D, YYYY'),
                opened: '',
                created: moment().format('MMMM D, YYYY'),
                extention: '',
                location: 'My Files > Documents',
                offline: false,
                preview: 'assets/images/etc/sample-file-preview.jpg'
            };

            // Append it to the file list
            vm.files.push(uploadingFile);
        }

        /**
         * Upload
         * Automatically triggers when files added to the uploader
         */
        function upload() {
            // Set headers
            vm.ngFlow.flow.opts.headers = {
                'X-Requested-With': 'XMLHttpRequest',
                //'X-XSRF-TOKEN'    : $cookies.get('XSRF-TOKEN')
            };

            vm.ngFlow.flow.upload();
        }

        /**
         * File upload success callback
         * Triggers when single upload completed
         *
         * @param file
         * @param message
         */
        function fileSuccess(file, message) {
            // Iterate through the file list, find the one we
            // are added as a temp and replace its data
            // Normally you would parse the message and extract
            // the uploaded file data from it
            angular.forEach(vm.files, function(item, index) {
                if (item.id && item.id === file.uniqueIdentifier) {
                    // Normally you would update the file from
                    // database but we are cheating here!

                    // Update the file info
                    item.name = file.file.name;
                    item.type = 'document';

                    // Figure out & upddate the size
                    if (file.file.size < 1024) {
                        item.size = parseFloat(file.file.size).toFixed(2) + ' B';
                    } else if (file.file.size >= 1024 && file.file.size < 1048576) {
                        item.size = parseFloat(file.file.size / 1024).toFixed(2) + ' Kb';
                    } else if (file.file.size >= 1048576 && file.file.size < 1073741824) {
                        item.size = parseFloat(file.file.size / (1024 * 1024)).toFixed(2) + ' Mb';
                    } else {
                        item.size = parseFloat(file.file.size / (1024 * 1024 * 1024)).toFixed(2) + ' Gb';
                    }
                }
            });
        }

        vm.selectedRecording = null;

        vm.playVideo = function(recording) {
            vm.selectedRecording = recording;

            // Do what is necessary to play the video.
            vm.isVideoPlaying = true;
            vm.isVideoPaused = false;
        }

        vm.pauseVideoPlayback = function() {
            vm.isVideoPaused = true;
        }

        vm.stopVideoPlayback = function() {
            vm.isVideoPlaying = false;
            vm.isVideoPaused = false;
        }

        vm.skipTo = function(skipValue) {

        }

        $scope.$on('$destroy', function() {
            // $interval.cancel(nowWidgetTicker);
        });

        //////////
    }
})();