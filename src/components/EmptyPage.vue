<template>
    <div class="empty-page">
        <div class="image-container">
            <img src="@/assets/images/sea.svg" alt="Emptiness" />
            <span>Nothing to see here</span>
        </div>
    </div>
</template>

<style lang="scss">
.empty-page {
    display: grid;
    grid-template-columns: 3fr 6fr 3fr;
    height: 80vh;
    align-items: center;
    text-align: center;
    .image-container {
        grid-column: 2;
        display: grid;
        justify-content: center;
        img {
            width: 100%;
            max-width: 500px;
        }
        span {
            font-weight: 500;
            color: #6d4c40;
            margin-top: 2rem;
        }
    }
}
</style>
