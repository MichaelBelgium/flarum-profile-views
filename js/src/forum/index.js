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
import ProfileView from '../ProfileView';
import humanTime from 'flarum/utils/humanTime';

app.initializers.add('michaelbelgium-flarum-profile-views', function() {
    User.prototype.profileViews = Model.hasMany('profileViews');

    extend(UserCard.prototype, 'infoItems', function(items) {
        const user = this.props.user;

        items.add('profile-views',(
            <span>
                {icon('far fa-eye')}
                {' '}
                {app.translator.trans('flarum_profile_views.forum.user.views_count_text', {viewcount: 'todo'})}
            </span>
        ));
    });

    extend(UserPage.prototype, 'sidebarItems', function(items) {
        app.request({
            method: 'GET',
            url: app.forum.attribute('apiUrl') + '/profileview',
        }).then(data => {
            var profileViews = data.data.map(obj => new ProfileView(obj));
            var views = profileViews.filter(obj => obj.viewedUser() == this.user);
            var lastViewed = new ItemList();

            views.forEach(element => {
                lastViewed.add('lastUser-' + element.viewer().id(),
                    <a href={app.forum.attribute('baseUrl') + '/u/' + element.viewer().username() }>
                        {avatar(element.viewer(), {className: 'lastUser-avatar'})}
                        {username(element.viewer(), {className: 'lastUser-name'})}
                        <span className="lastUser-visited">{humanTime(new Date(element.visitedAt()))}</span>
                    </a>
                );
            });

            items.add('lastViewedUsers', FieldSet.component({
                label: app.translator.trans('flarum_profile_views.forum.user.title_last_viewers'),
                className: 'LastUsers',
                children: lastViewed.toArray()
            }));

            console.log(lastViewed.toArray());
        });
    });

    extend(UserPage.prototype, 'show', function() {
        if(typeof app.session.user !== 'undefined' && app.session.user.id() !== this.user.id())
        {
            app.request({
                method: 'POST',
                url: app.forum.attribute('apiUrl') + '/profileview/' + this.user.id(),
                data: { viewer: app.session.user.id() }
            });
        }
    });
});