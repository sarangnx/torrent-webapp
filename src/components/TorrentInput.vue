<template>
    <div class="torrent">
        <div class="input-group">
            <div class="magnet">
                <input
                    type="text"
                    size="1"
                    placeholder="Magnet URI or Link to .torrent file."
                    v-model="link"
                    @keyup.enter="sendLink"
                />
                <button class="button" @click="sendLink" title="Send Magnet Link / Link to .torrent file">
                    <svg width="1em" height="1em" viewBox="0 0 16 16">
                        <path
                            fill-rule="evenodd"
                            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                        />
                    </svg>
                </button>
            </div>
            <div class="torrent-file">
                <input type="file" accept=".torrent" class="hidden" @change="loadFile($event)" ref="file" />
                <button class="button" @click="openFileSelector" title="Upload .torrent file">
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
                <button class="button" title="Authorize Google Drive" @click.stop="connectDrive">
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

<script>
import isURL from 'validator/lib/isURL';
import isMagentURI from 'validator/lib/isMagnetURI';

export default {
    data: () => ({
        link: ''
    }),
    props: {
        uid: String
    },
    methods: {
        sendLink() {
            const link = this.link;
            if (!isMagentURI(link) && !isURL(link)) {
                this.$error({ message: 'Invalid Magnet URI or Link', timeout: 3000 });
                return;
            }

            this.$emit('upload', link);
        },
        openFileSelector() {
            this.$refs.file.click();
        },
        loadFile(event) {
            const file = event.target.files[0];

            this.$emit('upload', file);
        },
        connectDrive() {
            window.location = `${process.env.VUE_APP_API_URL}/auth/login?uid=${this.uid}`;
        }
    }
};
</script>

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
            background: #e1cdc6;
            border: 1px solid transparent;
            padding: 0.7rem 1.4rem;
            border-radius: 10px;
            font-size: 0.85rem;
            color: #6d4c40;
            font-weight: 500;
            flex-grow: 1;
            outline: none;
            box-shadow: 0px 0px 5px -3px black;
            margin-right: 1rem;
            &::placeholder {
                color: #6d4c40;
            }
            &:focus {
                border: 1px solid #6d4c40;
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

.hidden {
    display: none;
}
</style>
