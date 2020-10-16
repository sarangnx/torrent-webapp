<template>
    <div :style="styles" class="notification">
        <div class="message">
            <span v-if="title" class="title">{{ title }}</span>
            <span v-if="message">{{ message }}</span>
        </div>
        <slot name="dismiss-icon">
            <button type="button" class="close" :style="{ color: styles.color }" @click="close">
                &times;
            </button>
        </slot>
    </div>
</template>

<script>
export default {
    name: 'Notification',
    props: {
        message: String,
        title: String,
        type: {
            type: String,
            default: 'info',
            validator: value => ['error', 'warn', 'success', 'info'].indexOf(value) !== -1
        },
        timeout: {
            type: Number,
            default: 5000,
            validator: value => value >= 0
        },
        timestamp: {
            type: Date,
            default: () => new Date()
        }
    },
    data: () => ({
        elmHeight: 0
    }),
    computed: {
        styles() {
            switch (this.type) {
                case 'error':
                    return { background: '#ffc8c8', color: '#b30000' };
                case 'warn':
                    return { background: '#ffebe2', color: '#a64206' };
                case 'success':
                    return { background: '#c2eec2', color: '#004f00' };

                case 'info':
                default:
                    return { background: '#9fe4ff', color: '#2121f4' };
            }
        }
    },
    mounted() {
        if (this.timeout) {
            setTimeout(this.close, this.timeout);
        }
    },
    methods: {
        close() {
            this.$emit('close', this.timestamp);
        }
    }
};
</script>

<style lang="scss">
.notification {
    grid-column: 2;
    z-index: 10000;
    display: flex;
    align-items: center;
    padding: 0.5rem 2rem;
    justify-content: space-between;
    border-radius: 10px;
    pointer-events: all;
    box-shadow: 0px 0px 5px -2px;
    .message {
        display: flex;
        flex-direction: column;
        .title {
            font-weight: bold;
        }
    }
    .close {
        border: none;
        background: none;
        padding: 0.5rem;
        font-size: 2rem;
        cursor: pointer;
    }
}
</style>
