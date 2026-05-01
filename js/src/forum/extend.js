import Extend from 'flarum/common/extenders';
import User from 'flarum/common/models/User';
import ProfileView from '../ProfileView';

export default [
    new Extend.Store()
        .add('userprofileview', ProfileView),

    new Extend.Model(User)
        .attribute('profileViewsCount')
        .hasMany('latestProfileViews'),
];