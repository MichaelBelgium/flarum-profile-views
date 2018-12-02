import app from 'flarum/app';
import User from 'flarum/models/User';
import UserPage from 'flarum/components/UserPage';
import UserCard from 'flarum/components/UserCard';
import icon from 'flarum/helpers/icon';
import Model from 'flarum/Model';
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
        // if(this.user.userviews() !== false)
        // {
        //     const lastViewed = new ItemList();

        //     $.each(this.user.userviews(), function(index, element) {
        //         var viewer = element.viewer();

        //         lastViewed.add('lastUser', 
        //             <a href={app.forum.attribute('baseUrl') + '/u/' + viewer.username() }>
        //                 {avatar(viewer, {className: 'lastUser-avatar'})}
        //                 {username(viewer, {className: 'lastUser-name'})}
        //             </a>
        //         );
        //     });

        //     items.add('lastViewedUsers', FieldSet.component({
        //         label: app.translator.trans('flarum_profile_views.forum.user.title_last_viewers'),
        //         className: 'LastUsers',
        //         children: lastViewed.toArray()
        //     }));
        // }
    });
});