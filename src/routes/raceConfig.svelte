<script lang="ts">
import { goto } from '$app/navigation';

     import { Button } from '@svelteuidev/core';
      import { Input } from '@svelteuidev/core';


</script>

<main>

  <Button  on:click={() => goto(`/racing`)}> Race 🏁</Button>


</main>

<style>
</style>
