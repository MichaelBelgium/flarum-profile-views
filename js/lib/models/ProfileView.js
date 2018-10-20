import Model from 'flarum/Model';
import mixin from 'flarum/utils/mixin';

export default class ProfileView extends mixin(Model, {
    viewer: Model.hasOne('userviewer'),
    viewed: Model.hasOne('userviewed')
}) {
}