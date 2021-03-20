import { extend } from 'flarum/extend';

app.initializers.add('michaelbelgium-admin-profile-views', function() {
    app.extensionData.for('michaelbelgium-profile-views')
        .registerSetting({
            setting: 'michaelbelgium-profileviews.track_guests',
            label: app.translator.trans('michaelbelgium-flarum-profile-views.admin.settings.track_guests_label'),
            type: 'boolean'
        }).registerSetting({
            setting: 'michaelbelgium-profileviews.max_listcount',
            label: app.translator.trans('michaelbelgium-flarum-profile-views.admin.settings.max_viewcount_label'),
            type: 'number'
        });
});