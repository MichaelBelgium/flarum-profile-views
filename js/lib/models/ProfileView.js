import Model from 'flarum/Model';
import mixin from 'flarum/utils/mixin';

export default class ProfileView extends mixin(Model, {
    id: Model.attribute('id'),
    ip: Model.attribute('ip'),
    viewer: Model.attribute('viewer_id'),
    viewed: Model.attribute('viewed_id')
}) {
}