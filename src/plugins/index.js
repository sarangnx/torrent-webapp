import notifications from './notifications';
import './styles';

export default {
    install(app) {
        app.use(notifications);
    }
};
