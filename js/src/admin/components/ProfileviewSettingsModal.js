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
        ];
    }
}