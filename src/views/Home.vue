<template>
    <top-bar />
    <div class="home">
        <div class="text-container">
            <div class="title">
                <span>Dowload Torrents</span>
                <span>To Google Drive</span>
            </div>
            <div class="sub-title">
                <span>Faster downloads</span>
                <span>No installs required</span>
                <span>No additional softwares required</span>
            </div>
        </div>
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
        display: flex;
        flex-direction: column;
        justify-content: center;
        .title {
            display: grid;
            font-size: 48px;
            font-weight: bold;
        }
        .sub-title {
            display: grid;
            font-size: 1rem;
            color: #676767;
        }
    }
    .ship-container {
        grid-area: right;
        img {
            width: 100%;
        }
    }
}

// For mobile
@media (max-width: 768px) {
    .home {
        grid-template-rows: 1fr 1fr;
        .text-container {
            grid-column: 2 / span 2;
            grid-row: 1;
            text-align: center;
            .title {
                font-size: 30px;
            }
            .sub-title {
                font-size: 1rem;
            }
        }
        .ship-container {
            grid-column: 2 / span 2;
            grid-row: 2;
        }
    }
}
</style>
