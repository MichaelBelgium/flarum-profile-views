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

app.initializers.add('michaelbelgium-flarum-profile-views', function() {
    app.store.models.profileview = ProfileView;
    User.prototype.profileViews = Model.hasMany('profileview');//comes from the extended user serializer relationship self::RELATIONSHIP

    extend(UserCard.prototype, 'infoItems', function(items) {
        const user = this.props.user;

        // items.add('profile-views',(
        //     <span>
        //         {icon('far fa-eye')}
        //         {' '}
        //         {app.translator.trans('flarum_profile_views.forum.user.views_count_text', {viewcount: '' + (user.profileViews() === false ? '0' : user.profileViews().length)})}
        //     </span>
        // ));
    });

    extend(UserPage.prototype, 'sidebarItems', function(items) {
        const lastViewed = new ItemList();

        console.log(this.user);
        console.log(this.user.profileViews());//from User prototype
        // $.each(this.user.profileViews(), function(index, view) {

            // console.log(view);
            // lastViewed.add('lastUser-' + viewer.id(),
            //     <a href={app.forum.attribute('baseUrl') + '/u/' + viewer.username() }>
            //         {avatar(viewer, {className: 'lastUser-avatar'})}
            //         {username(viewer, {className: 'lastUser-name'})}
            //     </a>
            // );
        // });

        // items.add('lastViewedUsers', FieldSet.component({
        //     label: app.translator.trans('flarum_profile_views.forum.user.title_last_viewers'),
        //     className: 'LastUsers',
        //     children: lastViewed.toArray()
        // }));
    });

    extend(UserPage.prototype, 'show', function() {
        if(typeof app.session.user !== 'undefined' && app.session.user.id() !== this.user.id())
        {
            app.request({
                method: 'POST',
                url: app.forum.attribute('apiUrl') + '/profileview',
                data: { 
                    viewer: app.session.user.id(),
                    viewedUser: this.user.id()
                }
            });
        }
    });
});