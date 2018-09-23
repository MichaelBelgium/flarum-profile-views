'use strict';

System.register('michaelbelgium/flarum-profile-views/main', ['flarum/app', 'flarum/models/User', 'flarum/components/UserCard', 'flarum/components/UserPage', 'flarum/components/FieldSet', 'flarum/helpers/icon', 'flarum/Model', 'flarum/utils/ItemList', 'flarum/helpers/avatar', 'flarum/helpers/username', 'flarum/extend'], function (_export, _context) {
    "use strict";

    var app, User, UserCard, UserPage, FieldSet, icon, Model, ItemList, avatar, username, extend;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumModelsUser) {
            User = _flarumModelsUser.default;
        }, function (_flarumComponentsUserCard) {
            UserCard = _flarumComponentsUserCard.default;
        }, function (_flarumComponentsUserPage) {
            UserPage = _flarumComponentsUserPage.default;
        }, function (_flarumComponentsFieldSet) {
            FieldSet = _flarumComponentsFieldSet.default;
        }, function (_flarumHelpersIcon) {
            icon = _flarumHelpersIcon.default;
        }, function (_flarumModel) {
            Model = _flarumModel.default;
        }, function (_flarumUtilsItemList) {
            ItemList = _flarumUtilsItemList.default;
        }, function (_flarumHelpersAvatar) {
            avatar = _flarumHelpersAvatar.default;
        }, function (_flarumHelpersUsername) {
            username = _flarumHelpersUsername.default;
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

                extend(UserPage.prototype, 'sidebarItems', function (items) {
                    var lastViewed = new ItemList();
                    var testUser = app.store.all('users').filter(function (user) {
                        return user.id() == 1;
                    })[0];
                    console.log(testUser);

                    lastViewed.add('lastUser', m(
                        'a',
                        { href: app.forum.attribute('baseUrl') + '/u/' + testUser.id() },
                        avatar(testUser, { className: 'lastUser-avatar' }),
                        username(testUser, { className: 'lastUser-name' })
                    ));

                    items.add('lastViewedUsers', FieldSet.component({
                        label: app.translator.trans('flarum_profile_views.forum.user.title_last_viewers'),
                        className: 'LastUsers',
                        children: lastViewed.toArray()
                    }));
                });
            });
        }
    };
});