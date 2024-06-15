<template>
    <v-row>
        <v-text-field v-model="input" label="Поиск персонажа" :error-messages="errorMessage"></v-text-field>
        <v-select v-model="selectedItem" :items="items" label="Критерии"></v-select>
        <v-btn @click="formingCorrectQuery" variant="outlined">Применить</v-btn>
    </v-row>
</template>

<script setup>
import { ref } from 'vue';
import { baseUrl, nameParams, statusParams } from "../api";

defineProps({
    errorMessage: {
        type: String,
        default: ""
    }
});

const selectedItem = ref("");
const input = ref("");
const searchQuery = ref("");
const items = ["По имени", "По статусу"];
const emit = defineEmits(["searchQueryUpdated", "errorMessageUpdated"]);

const formingCorrectQuery = () => {
    const isSearchWasted = !selectedItem.value.length || !input.value.length;
    if (isSearchWasted) {
        emit("errorMessageUpdated", "Пожалуйста, введите запрос и выберите критерий поиска");
        return;
    }
    emit("errorMessageUpdated", "");
    const selectedName = selectedItem.value === items[0];
    searchQuery.value = selectedName ?
        baseUrl + nameParams + input.value :
        baseUrl + statusParams + input.value;
    emit("searchQueryUpdated", searchQuery.value);
    input.value = "";
};

defineExpose({
    selectedItem
});
</script>

<style scoped>
.v-row {
    padding-left: 12px;
    padding-right: 12px;
    gap: 4px;
    margin-bottom: 10px;
}

.v-select {
    max-width: 226px;
}

.v-btn {
    min-height: 56.5px;
    min-width: 226px;
}
</style>