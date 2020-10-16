<template>
    <div class="notifications">
        <notification
            v-for="notification in notifications"
            :key="notification.timestamp.getTime()"
            v-bind="notification"
            @close="removeNotification"
        />
    </div>
</template>

<script>
import Notification from './Notification';
import { mapState, mapMutations } from 'vuex';

export default {
    name: 'Notifications',
    components: {
        Notification
    },
    computed: {
        ...mapState({
            notifications: state => state.notifications.notifications
        })
    },
    methods: {
        ...mapMutations({
            removeNotification: 'notifications/removeNotification'
        })
    }
};
</script>

<style lang="scss">
.notifications {
    display: grid;
    grid-gap: 1rem;
    height: 100%;
    width: 100%;
    grid-template-columns: 1fr 10fr 1fr;
    align-content: baseline;
    position: fixed;
    left: 50%;
    top: 1rem;
    transform: translateX(-50%);
    pointer-events: none;
}

@media (min-width: 768px) {
    .notifications {
        justify-items: end;
    }
}
</style>
