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
import { extend } from 'flarum/extend';

app.initializers.add('michaelbelgium-flarum-profile-views', function() {
    User.prototype.views = Model.attribute('views');

    extend(UserCard.prototype, 'infoItems', function(items) {
        const user = this.props.user;

        items.add('profile-views',(
            <span>
                {icon('eye')}
                {' '}
                {app.translator.trans('flarum_profile_views.forum.user.views_count_text', {viewcount: user.views()})}
            </span>
        ));
    });

    extend(UserPage.prototype, 'sidebarItems', function(items) {
        const lastViewed = new ItemList();
        const testUser = app.store.all('users').filter(user => user.id() == 1)[0];
        console.log(testUser);

        lastViewed.add('lastUser', 
            <a href={app.forum.attribute('baseUrl') + '/u/' + testUser.id()}>
                {avatar(testUser, {className: 'lastUser-avatar'})}
                {username(testUser, {className: 'lastUser-name'})}
            </a>
        );

        items.add('lastViewedUsers',
            FieldSet.component({
              label: 'Last viewed:',
              className: 'LastUsers',
              children: lastViewed.toArray()
            })
        );
        console.log(items);
    });
});