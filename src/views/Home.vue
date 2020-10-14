<template>
    <top-bar />
    <div class="home">
        <div class="text-container"></div>
        <div class="ship-container">
            <img src="@/assets/images/pirate-ship.svg" />
        </div>
    </div>
</template>

<script>
import TopBar from '@/components/TopBar';

export default {
    components: {
        TopBar
    }
};
</script>

<style lang="scss">
.home {
    display: grid;
    grid-template-columns: 1fr 5fr 5fr 1fr;
    grid-template-areas: '. left right .';
    .text-container {
        grid-area: left;
    }
    .ship-container {
        grid-area: right;
        img {
            width: 100%;
        }
    }
}
</style>
