<template>
    <div class="context-menu" :style="{ top: `${coords.y}px`, left: `${coords.x}px` }">
        <div v-for="item in menu" :key="item.text" class="menu-item" @click="item.handler">
            <content-render :component="item.icon" /><span>{{ item.text }}</span>
        </div>
    </div>
</template>

<script>
import { h } from 'vue';

export default {
    props: {
        coords: Object,
        menu: Array
    },
    components: {
        contentRender: {
            props: ['component'],
            render: props => h(props.component)
        }
    }
};
</script>

<style lang="scss">
.context-menu {
    position: fixed;
    padding: 1rem 0rem;
    background: #faece7;
    border: 1px solid #6d4c40;
    border-radius: 10px;
    .menu-item {
        padding: 0.6rem 1rem;
        cursor: pointer;
        user-select: none;
        display: grid;
        grid-template-columns: auto 1fr;
        column-gap: 1rem;
        align-items: center;
        color: #6d4c40;
        font-weight: 600;
        font-size: 0.9rem;
        &:hover {
            color: #000;
            svg {
                fill: #000;
            }
        }
        svg {
            fill: #6d4c40;
            height: 1.3rem;
            width: 1.3rem;
        }
    }
}
</style>
