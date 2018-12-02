import app from 'flarum/app';
import User from 'flarum/models/User';
import UserPage from 'flarum/components/UserPage';
import UserCard from 'flarum/components/UserCard';
import FieldSet from 'flarum/components/FieldSet';
import icon from 'flarum/helpers/icon';
import avatar from 'flarum/helpers/avatar';
import username from 'flarum/helpers/username';
import Model from 'flarum/Model';
import ItemList from 'flarum/utils/ItemList';
import { extend } from 'flarum/extend';

app.initializers.add('michaelbelgium-flarum-profile-views', function() {
    User.prototype.profileViews = Model.hasMany('profileViews');

    extend(UserCard.prototype, 'infoItems', function(items) {
        const user = this.props.user;

        items.add('profile-views',(
            <span>
                {icon('far fa-eye')}
                {' '}
                {app.translator.trans('flarum_profile_views.forum.user.views_count_text', {viewcount: '' + user.profileViews().length})}
            </span>
        ));
    });

    extend(UserPage.prototype, 'sidebarItems', function(items) {
        const lastViewed = new ItemList();

        $.each(this.user.profileViews(), function(index, viewer) {

            lastViewed.add('lastUser-' + viewer.id(),
                <a href={app.forum.attribute('baseUrl') + '/u/' + viewer.username() }>
                    {avatar(viewer, {className: 'lastUser-avatar'})}
                    {username(viewer, {className: 'lastUser-name'})}
                </a>
            );
        });

        items.add('lastViewedUsers', FieldSet.component({
            label: app.translator.trans('flarum_profile_views.forum.user.title_last_viewers'),
            className: 'LastUsers',
            children: lastViewed.toArray()
        }));
    });
});