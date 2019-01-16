import Model from 'flarum/Model';

export default class ProfileView extends Model {
  visitedAt = Model.attribute('visited_at', Model.transformDate);
  viewer = Model.hasOne('viewer');
  viewedUser = Model.hasOne('viewedUser');
}