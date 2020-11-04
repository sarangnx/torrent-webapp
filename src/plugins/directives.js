export default {
    install(app) {
        app.directive('long-press', this.longPress);
        app.directive('click-outside', this.clickOutside);
    },

    /**
     * Used to simulate long press effect in touch devices.
     * bind only functions to this directive
     */
    longPress: {
        beforeMount(el, binding) {
            let timer = null;

            // start timeout
            function start(event) {
                if (timer === null) {
                    timer = setTimeout(() => {
                        /**
                         * We have 2 options to use this directive
                         * - pass a function directly to v-long-press
                         * - pass an object with keys { handler: Function, args: Array }
                         */
                        if (typeof binding.value === 'function') {
                            binding.value(event);
                        } else if (typeof binding.value === 'object' && typeof binding.value.handler === 'function') {
                            binding.value.handler(event, ...binding.value.args);
                        }
                    }, 500);
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
