<template>
    <notifications />
    <router-view />
</template>

<script>
import Notifications from '@/components/Notifications/Notifications';

export default {
    components: {
        Notifications
    }
};
</script>
