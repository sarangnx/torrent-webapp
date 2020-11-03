export default {
    install(app) {
        app.directive('longpress', this.longpress);
    },

    /**
     * Used to simulate long press effect in touch devices.
     * bind only functions to this directive
     */
    longpress: {
        beforeMount(el, binding) {
            let timer = null;

            // start timeout
            function start() {
                if (timer === null) {
                    timer = setTimeout(() => binding.value(), 500);
                }
            }

            // cancel timeout
            function cancel() {
                if (timer !== null) {
                    clearTimeout(timer);
                    timer = null;
                }
            }

            el.addEventListener('touchstart', start);
            el.addEventListener('touchend', cancel);
            el.addEventListener('touchcancel', cancel);
        }
    }
};
