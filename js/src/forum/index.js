import User from 'flarum/models/User';
import UserPage from 'flarum/components/UserPage';
import UserCard from 'flarum/components/UserCard';
import FieldSet from 'flarum/components/FieldSet';
import icon from 'flarum/helpers/icon';
import avatar from 'flarum/helpers/avatar';
import {ucfirst} from 'flarum/utils/string';
import Model from 'flarum/Model';
import ItemList from 'flarum/utils/ItemList';
import { extend } from 'flarum/extend';
import humanTime from 'flarum/utils/humanTime';
import ProfileView from '../ProfileView';

app.initializers.add('michaelbelgium-profile-views', function() {
    app.store.models.userprofileview = ProfileView;//".userprofileview" = serializer type "userprofileview"
    User.prototype.profileViews = Model.hasMany('profileViews');//comes from AddUserProfileViewsRelationship::RELATIONSHIP = php model relationship method

    extend(UserCard.prototype, 'infoItems', function(items) {
        const user = this.props.user;

        const count = user.profileViews() === false ? 0 : user.profileViews().length;

        items.add('profile-views',(
            <span>
                {icon('far fa-eye')}
                {' '}
                {app.translator.transChoice('michaelbelgium-flarum-profile-views.forum.user.view_count_text', count, {viewcount: '' + count})}
            </span>
        ));
    });

    extend(UserPage.prototype, 'sidebarItems', function(items) {
        const lastViewed = new ItemList();

        let views = this.user.profileViews();

        if(views.length >= 5) {
            views = views.slice(0, 5);
        }

        $.each(views, function(i, pv) {
            const userName = pv.viewer() === false ? 'Guest' : ucfirst(pv.viewer().username());

            let item = 
                <div className="item-lastUser-content">
                    {avatar(pv.viewer() === false ? null : pv.viewer())}
                    <div>
                        {userName}
                        <span className="lastUser-visited" title={pv.visitedAt().toLocaleString()}>{humanTime(pv.visitedAt())}</span>
                    </div>
                </div>;

            if(pv.viewer()) {
                item = <a href={app.forum.attribute('baseUrl') + '/u/' + userName}>{item}</a>;
            }

            lastViewed.add('lastUser-' + i, item);
        });

        items.add('lastViewedUsers', FieldSet.component({
            label: app.translator.trans('michaelbelgium-flarum-profile-views.forum.user.last_viewers_heading'),
            className: 'LastUsers',
            children: lastViewed.toArray()
        }));
    });

    extend(UserPage.prototype, 'show', function() {
        app.request({
            method: 'POST',
            url: app.forum.attribute('apiUrl') + '/profileview',
            data: { 
                viewer: typeof app.session.user === 'undefined' ? null : app.session.user.id(),
                viewedUser: this.user.id()
            }
        });
    });
});
