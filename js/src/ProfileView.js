import Model from 'flarum/common/Model';

export default class ProfileView extends Model {
    visitedAt() {
        return Model.attribute('visitedAt', Model.transformDate).call(this);
    }

    viewer() {
        return Model.hasOne('viewer').call(this);
    }

    viewedUser() {
        return Model.hasOne('viewedUser').call(this);
    }
}