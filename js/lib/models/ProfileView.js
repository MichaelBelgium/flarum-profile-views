import Model from 'flarum/Model';
import mixin from 'flarum/utils/mixin';

export default class ProfileView extends mixin(Model, {
    identifier: Model.attribute('id'),
    ip: Model.attribute('ip'),
    viewer_id: Model.attribute('viewer_id'),
    viewed_id: Model.attribute('viewed_id')
}) {
}