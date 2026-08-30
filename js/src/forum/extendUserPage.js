import app from 'flarum/forum/app';
import UserPage from 'flarum/forum/components/UserPage';
import { extend } from 'flarum/common/extend';
import FieldSet from 'flarum/common/components/FieldSet';
import Avatar from 'flarum/common/components/Avatar';
import username from 'flarum/common/helpers/username';
import ItemList from 'flarum/common/utils/ItemList';
import humanTime from 'flarum/common/helpers/humanTime';

export default function extendUserPage() {
    extend(UserPage.prototype, 'sidebarItems', function (items) {
        const lastViewed = new ItemList();
        const views = this.user.latestProfileViews();

        if (!views || !views.length) {
            return;
        }

        views.forEach((pv, i) => {
            const viewer = pv.viewer();
            const visitedAt = pv.visitedAt();
            const userName = viewer === false
                ? app.translator.trans('michaelbelgium-flarum-profile-views.forum.user.viewlist.guest')
                : username(viewer);

            let item =
                <div className="item-lastUser-content">
                    <Avatar user={viewer === false ? null : viewer} />
                    <div>
                        {userName}
                        <span className="lastUser-visited" title={visitedAt.toLocaleString()}>
                            {humanTime(visitedAt)}
                        </span>
                    </div>
                </div>;

            if (viewer)
                item = <a href={app.route.user(viewer)}>{item}</a>;

            lastViewed.add('lastUser-' + i, item);
        });

        items.add('lastViewedUsers', FieldSet.component({
            label: app.translator.trans('michaelbelgium-flarum-profile-views.forum.user.viewlist.title'),
            className: 'LastUsers'
        }, lastViewed.toArray()));
    });

    extend(UserPage.prototype, 'show', function () {
        if (!this.user) {
            return;
        }

        return app.store.createRecord('userprofileview').save({
            relationships: {
                viewedUser: this.user,
            },
        }, {
            errorHandler: (error) => {
                // Prevent showing the UI an error notification
                if (error.status === 422 || error.status === 401) {
                    return;
                }

                return false;
            },
        });
    });
}


