import app from 'flarum/app';
import User from 'flarum/models/User';
import UserCard from 'flarum/components/UserCard';
import icon from 'flarum/helpers/icon';
import Model from 'flarum/Model';
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
});