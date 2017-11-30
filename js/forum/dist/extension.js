'use strict';

System.register('michaelbelgium/flarum-profile-views/main', ['flarum/app'], function (_export, _context) {
    "use strict";

    var app;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }],
        execute: function () {

            app.initializers.add('michaelbelgium-flarum-profile-views', function () {
                alert('Hello, world!');
            });
        }
    };
});