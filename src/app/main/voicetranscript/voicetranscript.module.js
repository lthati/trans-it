(function() {
    'use strict';

    angular
        .module('app.trans-it', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
        // State
        $stateProvider
            .state('app.transit', {
                url: '/trans-it',
                views: {
                    'content@app': {
                        templateUrl: 'app/main/voicetranscript/voicetranscript.html',
                        controller: 'VoiceTranscript as vm'
                    }
                },
                resolve: {
                    VoiceTranscripts: function(msApi) {
                        return msApi.resolve('voicetranscript@get');
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/voicetranscript');

        // Api
        msApiProvider.register('voicetranscript', ['app/data/voicetranscript/voicetranscript.json']);

        // Navigation
        msNavigationServiceProvider.saveItem('fuse', {
            title: 'Voice Transcript',
            group: true,
            weight: 1
        });

        msNavigationServiceProvider.saveItem('fuse.voicetranscript', {
            title: 'Voice Transcript',
            icon: 'icon-voicemail',
            state: 'app.transit',
            /*stateParams: {
                'param1': 'page'
             },*/
            // translate: 'SAMPLE.SAMPLE_NAV',
            weight: 1
        });
    }
})();