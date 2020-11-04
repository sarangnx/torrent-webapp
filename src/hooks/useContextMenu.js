import { ref } from 'vue';

export default function() {
    const show = ref(false);
    const coords = ref({ x: 0, y: 0 });
    const selectedItem = ref({});

    // open context menu
    function openContextMenu(event, item) {
        coords.value = { x: event.clientX, y: event.clientY };
        selectedItem.value = item;
        show.value = true;
    }

    // close context menu
    function closeContextMenu() {
        show.value = false;
    }

    return { openContextMenu, closeContextMenu, show, coords, selectedItem };
}
