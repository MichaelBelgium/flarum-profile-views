import extendUserCard from './extendUserCard';
import extendUserPage from './extendUserPage';

export { default as extend } from './extend';

app.initializers.add('michaelbelgium-profile-views', function() {
    extendUserCard();
    extendUserPage();
});
