import User from 'flarum/models/User';
import UserPage from 'flarum/components/UserPage';
import UserCard from 'flarum/components/UserCard';
import FieldSet from 'flarum/components/FieldSet';
import icon from 'flarum/helpers/icon';
import avatar from 'flarum/helpers/avatar';
import username from 'flarum/common/helpers/username';
import Model from 'flarum/Model';
import ItemList from 'flarum/utils/ItemList';
import { extend } from 'flarum/extend';
import humanTime from 'flarum/utils/humanTime';
import ProfileView from '../ProfileView';

app.initializers.add('michaelbelgium-profile-views', function() {
    app.store.models.userprofileview = ProfileView;//".userprofileview" = serializer type "userprofileview"
    User.prototype.profileViews = Model.hasMany('profileViews');//comes from AddUserProfileViewsRelationship::RELATIONSHIP = php model relationship method
    User.prototype.latestProfileViews = Model.hasMany('latestProfileViews');

    extend(UserCard.prototype, 'infoItems', function(items) {
        const user = this.attrs.user;

        const count = user.profileViews() === false ? 0 : user.profileViews().length;

        items.add('profile-views',(
            <span>
                {icon('far fa-eye')}
                {' '}
                {app.translator.trans('michaelbelgium-flarum-profile-views.forum.user.view_count_text', {viewcount: count})}
            </span>
        ));
    });

    extend(UserPage.prototype, 'sidebarItems', function(items) {
        const lastViewed = new ItemList();

        let views = this.user.latestProfileViews();

        $.each(views, function(i, pv) {
            const userName = pv.viewer() === false ? app.translator.trans('michaelbelgium-flarum-profile-views.forum.user.viewlist.guest') : username(pv.viewer());

            let item = 
                <div className="item-lastUser-content">
                    {avatar(pv.viewer() === false ? null : pv.viewer())}
                    <div>
                        {userName}
                        <span className="lastUser-visited" title={pv.visitedAt().toLocaleString()}>{humanTime(pv.visitedAt())}</span>
                    </div>
                </div>;

            if(pv.viewer()) {
                item = <a href={app.route.user(pv.viewer())}>{item}</a>;
            }

            lastViewed.add('lastUser-' + i, item);
        });

        items.add('lastViewedUsers', FieldSet.component({
            label: app.translator.trans('michaelbelgium-flarum-profile-views.forum.user.viewlist.title'),
            className: 'LastUsers'
            }, lastViewed.toArray())
        );
    });

    extend(UserPage.prototype, 'show', function() {
        app.request({
            method: 'POST',
            url: app.forum.attribute('apiUrl') + '/profileview',
            body: {
                viewedUser: this.user.id()
            }
        });
    });
});
