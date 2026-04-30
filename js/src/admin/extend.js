import Extend from 'flarum/common/extenders';
import app from 'flarum/admin/app';

export default [
    new Extend.Admin()
        .setting(() => ({
            setting: 'michaelbelgium-profileviews.track_guests',
            label: app.translator.trans('michaelbelgium-flarum-profile-views.admin.settings.track_guests_label'),
            type: 'boolean'
        })).setting(() => ({
            setting: 'michaelbelgium-profileviews.max_listcount',
            label: app.translator.trans('michaelbelgium-flarum-profile-views.admin.settings.max_viewcount_label'),
            type: 'number'
        }))
]