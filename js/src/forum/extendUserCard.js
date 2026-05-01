import UserCard from 'flarum/forum/components/UserCard';
import { extend } from 'flarum/common/extend';
import Icon from 'flarum/common/components/Icon';

export default function extendUserCard() {
    extend(UserCard.prototype, 'infoItems', function (items) {
        const user = this.attrs.user;

        items.add('profile-views',(
            <span>
                <Icon name="fa-regular fa-eye" />
                {' '}
                {app.translator.trans('michaelbelgium-flarum-profile-views.forum.user.view_count_text', {viewcount: user.profileViewsCount()})}
            </span>
        ));
    });
}


