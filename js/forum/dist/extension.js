'use strict';

System.register('michaelbelgium/flarum-profile-views/main', ['flarum/app', 'flarum/models/User', 'flarum/components/UserCard', 'flarum/components/UserPage', 'flarum/components/FieldSet', 'flarum/helpers/icon', 'flarum/Model', 'flarum/utils/ItemList', 'flarum/helpers/avatar', 'flarum/helpers/username', 'michaelbelgium/flarum-profile-views/models/ProfileView', 'flarum/extend'], function (_export, _context) {
    "use strict";

    var app, User, UserCard, UserPage, FieldSet, icon, Model, ItemList, avatar, username, ProfileView, extend;
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
        }, function (_michaelbelgiumFlarumProfileViewsModelsProfileView) {
            ProfileView = _michaelbelgiumFlarumProfileViewsModelsProfileView.default;
        }, function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }],
        execute: function () {

            app.initializers.add('michaelbelgium-flarum-profile-views', function () {
                app.store.models.userViewers = ProfileView;

                User.prototype.userviews = Model.hasMany('userViewers');

                extend(UserCard.prototype, 'infoItems', function (items) {
                    var user = this.props.user;
                    var views = user.userviews() === false ? 0 : user.userviews().length;

                    items.add('profile-views', m(
                        'span',
                        null,
                        icon('eye'),
                        ' ',
                        app.translator.trans('flarum_profile_views.forum.user.views_count_text', { viewcount: views })
                    ));
                });

                extend(UserPage.prototype, 'sidebarItems', function (items) {
                    if (this.user.userviews() !== false) {
                        var lastViewed = new ItemList();

                        $.each(this.user.userviews(), function (index, element) {
                            var viewer = element.viewer();

                            lastViewed.add('lastUser', m(
                                'a',
                                { href: app.forum.attribute('baseUrl') + '/u/' + viewer.username() },
                                avatar(viewer, { className: 'lastUser-avatar' }),
                                username(viewer, { className: 'lastUser-name' })
                            ));
                        });

                        items.add('lastViewedUsers', FieldSet.component({
                            label: app.translator.trans('flarum_profile_views.forum.user.title_last_viewers'),
                            className: 'LastUsers',
                            children: lastViewed.toArray()
                        }));
                    }
                });
            });
        }
    };
});;
'use strict';

System.register('michaelbelgium/flarum-profile-views/models/ProfileView', ['flarum/Model', 'flarum/utils/mixin'], function (_export, _context) {
    "use strict";

    var Model, mixin, ProfileView;
    return {
        setters: [function (_flarumModel) {
            Model = _flarumModel.default;
        }, function (_flarumUtilsMixin) {
            mixin = _flarumUtilsMixin.default;
        }],
        execute: function () {
            ProfileView = function (_mixin) {
                babelHelpers.inherits(ProfileView, _mixin);

                function ProfileView() {
                    babelHelpers.classCallCheck(this, ProfileView);
                    return babelHelpers.possibleConstructorReturn(this, (ProfileView.__proto__ || Object.getPrototypeOf(ProfileView)).apply(this, arguments));
                }

                return ProfileView;
            }(mixin(Model, {
                viewer: Model.hasOne('userviewer'),
                viewed: Model.hasOne('userviewed')
            }));

            _export('default', ProfileView);
        }
    };
});