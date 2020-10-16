import { createStore } from 'vuex';

import notifications from './modules/notifications';
import user from './modules/user';

export default createStore({
    modules: {
        notifications,
        user
    }
});
