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
            <button class="try-now">TRY NOW</button>
        </div>
        <div class="ship-container">
            <img src="@/assets/images/pirate-ship.svg" alt="Black Pearl" title="Black Pearl" />
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
    height: calc(100vh - 4.5rem);
    display: grid;
    grid-template-columns: 1fr 5fr 5fr 1fr;
    grid-template-areas: '. left right .';

    .text-container {
        grid-area: left;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        .title {
            display: grid;
            font-size: 48px;
            font-weight: bold;
            margin-bottom: 20px;
        }
        .sub-title {
            display: grid;
            font-size: 1rem;
            color: #676767;
            margin-bottom: 50px;
        }
    }

    .ship-container {
        grid-area: right;
        display: flex;
        align-items: center;
        padding: 1rem;
        img {
            width: 100%;
        }
    }

    .try-now {
        border: 0px;
        background: #6d4c40;
        color: white;
        padding: 0.9rem 4rem;
        border-radius: 15px;
        font-weight: bold;
        font-size: 0.75rem;
        transition: box-shadow 0.2s ease-in-out;
        transition: transform 0.2s ease-in-out;
        &:hover {
            box-shadow: 4px 4px 10px -5px black;
        }
        &:active {
            box-shadow: inset 4px 4px 10px -5px black;
            transform: scale(0.96, 0.96);
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
            align-items: center;
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
