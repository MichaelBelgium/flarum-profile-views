'use strict';

System.register('michaelbelgium/flarum-profile-views/main', ['flarum/app', 'flarum/models/User', 'flarum/components/UserCard', 'flarum/helpers/icon', 'flarum/Model', 'flarum/extend'], function (_export, _context) {
    "use strict";

    var app, User, UserCard, icon, Model, extend;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumModelsUser) {
            User = _flarumModelsUser.default;
        }, function (_flarumComponentsUserCard) {
            UserCard = _flarumComponentsUserCard.default;
        }, function (_flarumHelpersIcon) {
            icon = _flarumHelpersIcon.default;
        }, function (_flarumModel) {
            Model = _flarumModel.default;
        }, function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }],
        execute: function () {

            app.initializers.add('michaelbelgium-flarum-profile-views', function () {
                User.prototype.views = Model.attribute('views');

                extend(UserCard.prototype, 'infoItems', function (items) {
                    var user = this.props.user;

                    items.add('profile-views', m(
                        'span',
                        null,
                        icon('eye'),
                        ' ',
                        app.translator.trans('flarum_profile_views.forum.user.views_count_text', { viewcount: user.views() })
                    ));
                });
            });
        }
    };
});