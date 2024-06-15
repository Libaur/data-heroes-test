<template>
    <v-pagination v-model="currentPage" :length="length" total-visible="6"></v-pagination>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
    length: number;
    page: number;
}>()
const emit = defineEmits<{
    (e: 'update:page', value: number): void
}>()
const currentPage = ref(props.page)

watch(currentPage, (newPage) => {
    emit('update:page', newPage)
})
watch(props, (newProps) => {
    currentPage.value = newProps.page;
});
</script>