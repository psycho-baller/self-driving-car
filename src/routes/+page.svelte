<script lang="ts">
  import { onMount } from 'svelte';

  import LearnConfig from './learnConfig.svelte';
  import RaceConfig from './raceConfig.svelte';
  import { brains } from '../data/brains';

  onMount(() => {
    for (let i in brains) {
      if (!localStorage.getItem(i)) {
        localStorage.setItem(i, brains[i] as string);
      }
    }
  });
</script>

<main>
  <RaceConfig />

  <LearnConfig />
</main>

<style>
</style>
