import app from 'flarum/app';
import User from 'flarum/models/User';
import UserCard from 'flarum/components/UserCard';
import UserPage from 'flarum/components/UserPage';
import FieldSet from 'flarum/components/FieldSet';
import icon from 'flarum/helpers/icon';
import Model from 'flarum/Model';
import ItemList from 'flarum/utils/ItemList';
import avatar from 'flarum/helpers/avatar';
import username from 'flarum/helpers/username';
import ProfileView from 'michaelbelgium/flarum-profile-views/models/ProfileView';
import { extend } from 'flarum/extend';

app.initializers.add('michaelbelgium-flarum-profile-views', function() {
    app.store.models.userViewers = ProfileView;

    User.prototype.userviews = Model.hasMany('userViewers');

    extend(UserCard.prototype, 'infoItems', function(items) {
        var user = this.props.user;
        var views = user.userviews() === false ? 0 : user.userviews().length;

        items.add('profile-views',(
            <span>
                {icon('eye')}
                {' '}
                {app.translator.trans('flarum_profile_views.forum.user.views_count_text', {viewcount: views})}
            </span>
        ));
    });

    extend(UserPage.prototype, 'sidebarItems', function(items) {
        if(this.user.userviews() !== false)
        {
            const lastViewed = new ItemList();

            $.each(this.user.userviews(), function(index, element) {
                var viewer = app.store.all('users').filter(u => u.id() == element.viewer())[0];

                lastViewed.add('lastUser', 
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
        }
    });
});