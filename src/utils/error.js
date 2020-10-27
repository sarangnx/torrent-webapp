import store from '@/store';

/**
 * Handle Errors from axios requests.
 * Shows toast messages on error.
 *
 * @param {Object} error - Axios Error Object
 */
export function handleAxiosError(error) {
    if (error.response && error.response.data && error.response.data.message) {
        store.dispatch('notifications/notify', { message: error.response.data.message, type: 'error' });
    } else {
        store.dispatch('notifications/notify', { message: 'Something Went Wrong!', type: 'error' });
    }
}
