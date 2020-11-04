export default {
    install(app) {
        app.directive('longpress', this.longpress);
        app.directive('click-outside', this.clickOutside);
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
    },
    /**
     * Used to simulate click outside of any element.
     * can be used to close any modals or menu when clicked outside.
     */
    clickOutside: {
        beforeMount(el, binding) {
            function eventHandler(event) {
                if (!el.contains(event.target) && el !== event.target) {
                    binding.value(event);
                }
            }

            el.__vueClickHandler = eventHandler;

            document.body.addEventListener('click', el.__vueClickHandler);
        },
        unmounted(el) {
            document.body.removeEventListener('click', el.__vueClickHandler);
        }
    }
};
