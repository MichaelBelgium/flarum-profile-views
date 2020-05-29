import { extend } from 'flarum/extend';
import ProfileviewSettingsModal from './components/ProfileviewSettingsModal';

app.initializers.add('michaelbelgium-admin-profile-views', function() {
    app.extensionSettings['michaelbelgium-profile-views'] = () => app.modal.show(new ProfileviewSettingsModal());
});