import SettingsModal from 'flarum/components/SettingsModal';
import Switch from 'flarum/components/Switch';

export default class ProfileviewSettingsModal extends SettingsModal {
    className() {
        return 'Modal--small';
    }

    title() {
        return app.translator.trans('michaelbelgium-flarum-profile-views.admin.settings.title');
    }

    form() {
        return [
            <div className="Form-group">
                {Switch.component({
                    state: this.setting('michaelbelgium-profileviews.track_guests')() == 1,
                    onchange: this.setting('michaelbelgium-profileviews.track_guests'),
                    children: app.translator.trans('michaelbelgium-flarum-profile-views.admin.settings.track_guests_label')
                })}
            </div>
        ];
    }
}