<script lang="ts">
  import { onMount } from 'svelte';

  import LearnConfig from './learnConfig.svelte';
  import RaceConfig from './raceConfig.svelte';
  import { brains } from '../data/brains';

  import { Tabs } from '@svelteuidev/core';
  import { EnvelopeClosed, InfoCircled } from 'radix-icons-svelte';
  import Brain from '$lib/brain.svelte';
  import RaceFlag from '$lib/raceFlag.svelte';
  import About from './about.svelte';
import Footer from '$lib/footer.svelte';

  onMount(() => {
    for (let i in brains) {
      if (!localStorage.getItem(i)) {
        localStorage.setItem(i, brains[i] as string);
      }
    }
  });
</script>

<div>
<Tabs  color="cyan" tabPadding="lg">
  <Tabs.Tab label="Racing Mode" icon={RaceFlag}>
    <RaceConfig />
  </Tabs.Tab>
  <Tabs.Tab label="Learning Mode" icon={Brain}><LearnConfig /></Tabs.Tab>
  <Tabs.Tab icon={InfoCircled}><About /></Tabs.Tab>
</Tabs>
<Footer/>
</div>


<!-- <div style="margin-top: 1em;">
    <div>Programmatically select:</div>
    {#each tabs as tab}
      <Button on:click={() => (active = tab)}><Label>{tab}</Label></Button>
    {/each}
  </div> -->

<!-- {#if active === 'Racing Mode'}
    <RaceConfig />
  {:else if active === 'Learning Mode'}
    <LearnConfig />
  {/if}
     -->

