<template>
  <v-app class="app">
    <Header />
    <CharSearch ref="charSearchComponent" @searchQueryUpdated="updateSearchQuery"
      @errorMessageUpdated="updateErrorMessage" :error-message="errorMessage" />
    <v-btn @click="cleanSearchParams" class="clean-up">Обнулить! :)</v-btn>
    <v-main class="d-flex justify-center align-center">
      <v-column class="gallery">
        <v-btn @click="moveScrollToBottom" block variant="tonal">Вниз! :)</v-btn>
        <Card v-for="char in chars" :char="char" :key="char.id" />
        <v-btn @click="moveScrollToTop" block variant="tonal">Вверх! :)</v-btn>
        <Pagination v-model:page="page" :length="pagesLength" />
      </v-column>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from "vue";
import { Char } from "./contracts";
import { baseUrl, pageParams, getRequest } from "./api";
import { moveScrollToTop, moveScrollToBottom } from "./utils";

const charSearchComponent = ref<{ selectedItem: string } | null>(null);
const errorMessage = ref("");
const chars = ref<Char[]>([]);
const page = ref(1);
const pagesLength = ref(1);
const searchQuery = ref("");

const updateSearchQuery = (query: string) => searchQuery.value = query;
const updateErrorMessage = (message: string) => errorMessage.value = message;
const cleanSearchParams = () => {
  if (charSearchComponent.value) charSearchComponent.value.selectedItem = "";
  searchQuery.value = "";
  page.value = 1;
}

const fetchData = async () => {
  try {
    const url = searchQuery.value ? `${searchQuery.value}&page=${page.value}` :
      (baseUrl + pageParams + page.value);
    const response = await getRequest(url);
    if (!response.results) {
      errorMessage.value = "К сожалению, по запросу ничего не найдено";
      return;
    }
    chars.value = response.results;
    pagesLength.value = response.info.pages;
  } catch (error) {
    console.error('Error fetching characters:', error);
  }
};

onMounted(fetchData);
watchEffect(fetchData);
</script>

<style scoped>
.app {
  background-color: var(--main);
}

.gallery>* {
  margin-bottom: 30px;
}

.clean-up {
  margin-bottom: 30px;
  background-color: white;
  color: var(--main);
}
</style>