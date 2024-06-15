<template>
    <v-card variant="tonal">
        <v-img cover :src="char.image"></v-img>
        <v-card-text>
            <v-card-title>{{ char.name }}</v-card-title>
            <p class="main-subtitle">{{ charStatus }} - {{ char.species }}</p>
            <p class="subtitle">Last known location:<br /><span class="subtitle-content">{{ char.location.name }}</span>
            </p>
            <p class="subtitle">First seen in:<br /><span class="subtitle-content">{{ firstSeen }}</span></p>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Char } from '@/contracts';
import { getRequest } from "../api"

const props = defineProps<{
    char: Char;
}>()

const firstSeen = ref('')
const status = props.char.status
const charStatus = status === "Alive" ? `🟢 ${status}` : status === "Dead" ? `🔴 ${status}` : `⚫ ${status}`;

onMounted(async () => {
    try {
        const firstEpisodeUrl = props.char.episode[0];
        const episodeData = await getRequest(firstEpisodeUrl);
        firstSeen.value = episodeData.name;
    } catch (error) {
        console.error('Error fetching episode:', error);
    }
});
</script>

<style scoped>
.v-img {
    min-width: 230px;
}

.v-card {
    width: 600px;
    height: 225px;
    border-radius: 10px;
    display: flex;
}

p {
    margin-left: 12px;
    margin-bottom: 8px;
    font-size: 1rem;
}

.v-card-title {
    font-size: 1.5rem;
    font-weight: 900;
}

.main-subtitle {
    color: white;
    font-weight: 500;
}

.subtitle {
    margin-bottom: 10px;
    color: var(--second-text);
}

.subtitle-content {
    color: white;
}
</style>