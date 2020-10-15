<template>
    <top-bar />
    <torrent-input />
    <empty-page />
</template>

<script>
import TopBar from '@/components/TopBar';
import TorrentInput from '@/components/TorrentInput';
import EmptyPage from '@/components/EmptyPage';

export default {
    components: {
        TopBar,
        TorrentInput,
        EmptyPage
    }
};
</script>
