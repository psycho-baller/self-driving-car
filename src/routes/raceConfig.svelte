<script lang="ts">
import { goto } from '$app/navigation';

    import { Button } from 'sveltestrap';

</script>

<main>

  <Button on:click={() => goto(`/racing`)}> Race 🏁</Button>


</main>

<style>
</style>
