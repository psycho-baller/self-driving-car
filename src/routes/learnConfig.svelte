<script lang="ts">
import { goto } from '$app/navigation';

    import { Button } from 'sveltestrap';
const color = "secondary"
</script>

<main>

<!--  size="lg" outline {color} -->
  <Button on:click={() => goto(`/learning`)}> Learn 🧠 </Button>

</main>

<style>
</style>
