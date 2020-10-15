<template>
    <div class="torrent">
        <div class="input-group">
            <div class="magnet">
                <input type="text" size="1" placeholder="Magnet URI or Link to .torrent file." />
                <button class="next">
                    <svg width="1em" height="1em" viewBox="0 0 16 16">
                        <path
                            fill-rule="evenodd"
                            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                        />
                    </svg>
                </button>
            </div>
            <div class="torrent-file">
                <button class="upload">
                    <svg width="1em" height="1em" viewBox="0 0 16 16">
                        <path
                            fill-rule="evenodd"
                            d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"
                        />
                        <path
                            fill-rule="evenodd"
                            d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"
                        />
                    </svg>
                </button>
            </div>
            <div class="google-drive">
                <button>
                    <svg width="1em" height="1em" viewBox="0 0 512 512">
                        <path
                            d="M339 314.9L175.4 32h161.2l163.6 282.9H339zm-137.5 23.6L120.9 480h310.5L512 338.5H201.5zM154.1 67.4L0 338.5 80.6 480 237 208.8 154.1 67.4z"
                        ></path>
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.torrent {
    display: grid;
    grid-template-columns: 1fr 10fr 1fr;
    .input-group {
        grid-column: 2;
        display: grid;
        grid-template-columns: 6fr auto 4fr;
        column-gap: 1rem;
        .google-drive {
            flex-grow: 1;
            display: flex;
            justify-content: flex-end;
        }

        .magnet input {
            margin-right: 1rem;
        }

        .magnet input {
            background: #e1cdc6;
            border: 0px;
            padding: 0.7rem 1.4rem;
            border-radius: 10px;
            font-size: 0.85rem;
            color: #6d4c40;
            font-weight: 500;
            flex-grow: 1;
            outline: none;
            &::placeholder {
                color: #6d4c40;
            }
        }

        button {
            background: #6d4c40;
            border: 0px;
            border-radius: 10px;
            padding: 0px 1rem;
            svg {
                fill: white;
                height: 1.2rem;
                width: 1.2rem;
            }
        }
        .magnet,
        .torrent-file,
        .google-drive {
            display: flex;
            height: 100%;
        }
    }
}

@media (max-width: 768px) {
    .torrent {
        .input-group {
            grid-template-columns: 1fr auto;
            .google-drive {
                position: fixed;
                height: 2.7rem;
                bottom: 1rem;
                right: 0px;
                width: 100%;
                display: grid;
                grid-template-columns: 11fr 1fr;
                justify-items: end;
                button {
                    width: 3.2rem;
                }
            }
        }
    }
}
</style>
