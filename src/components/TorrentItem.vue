<template>
    <div class="torrent-item">
        <span class="torrent-item-name" :title="name">{{ name }}</span>
        <span class="torrent-item-size">{{ sizeComputed }}</span>
        <span class="torrent-item-count">{{ fileCount }} File{{ fileCount > 1 ? 's' : '' }}</span>
        <button class="torrent-item-download button">
            <svg width="1em" height="1em" viewBox="0 0 16 16">
                <path
                    fill-rule="evenodd"
                    d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"
                />
                <path
                    fill-rule="evenodd"
                    d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708l3 3z"
                />
            </svg>
        </button>
    </div>
</template>

<script>
import bytes from 'bytes';

export default {
    props: {
        name: String,
        size: [String, Number], // in bytes
        fileCount: [String, Number]
    },
    computed: {
        sizeComputed() {
            return bytes(this.size);
        }
    }
};
</script>

<style lang="scss">
.torrent-item {
    grid-column: 2;
    background: #faece7;
    padding: 1rem;
    display: grid;
    grid-template-columns: 4fr 1fr 1fr 1fr;
    align-items: center;
    border-radius: 10px;
    outline: none;
    border: 1px solid transparent;
    color: #6d4c40;
    font-weight: 500;
    font-size: 0.9rem;
    box-shadow: 0px 0px 4px -2px #6d4c40;

    &:hover,
    &:focus {
        border: 1px solid #6d4c40;
    }

    .torrent-item-download {
        width: 60px;
        justify-self: end;
    }

    .torrent-item-size,
    .torrent-item-count {
        justify-self: center;
    }

    .torrent-item-name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}

@media (max-width: 768px) {
    .torrent-item {
        grid-template-columns: auto auto 4fr 1fr;
        grid-template-rows: auto auto;
        column-gap: 1rem;

        .torrent-item-name {
            grid-column: 1 / span 3;
        }

        .torrent-item-size {
            grid-row: 2;
            grid-column: 1;
        }

        .torrent-item-count {
            grid-row: 2;
            grid-column: 2;
        }

        .torrent-item-download {
            grid-row: 1 / span 2;
            grid-column: 4;
        }
    }
}
</style>
