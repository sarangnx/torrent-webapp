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

/**
 * Show success message on axios request completion
 *
 * @param {Object} response - Axios Response Object
 */
export function handleAxiosSuccess(response) {
    if (response && response.data && response.data.message) {
        store.dispatch('notifications/notify', { message: response.data.message, type: 'success' });
    }
}
