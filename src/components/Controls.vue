<template>
    <div class="controls">
        <button class="button" title="Go Back" @click="goBack">
            <svg width="1em" height="1em" viewBox="0 0 16 16">
                <path
                    fill-rule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
            </svg>
        </button>
    </div>
</template>

<script>
import { getCurrentInstance } from 'vue';

export default {
    setup() {
        const self = getCurrentInstance();

        function goBack() {
            const router = self.appContext.config.globalProperties.$router;
            const route = self.appContext.config.globalProperties.$route;

            let path = route.path.split('/');
            // remove last path in string
            path.pop();
            path = path.join('/');

            router.push(path);
        }

        return { goBack };
    }
};
</script>

<style lang="scss">
.controls {
    grid-column: 2;
}
</style>
