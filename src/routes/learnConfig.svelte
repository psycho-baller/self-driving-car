<script lang="ts">
import { goto } from '$app/navigation';

     import { Button } from '@svelteuidev/core';
import { NumberInput } from '@svelteuidev/core';
;
</script>

<main>

    <NumberInput
    defaultValue={5}
    label='Your age'
    description='From 0 to 120, step is 1'
    min={3}
    max={6}
/>

<NumberInput
    label='Number input with decimal steps'
    defaultValue={0.1}
    precision={2}
    min={0.05}
    max={1}
    step={0.05}
/>

<!--  size="lg" outline {color} -->
  <Button on:click={() => goto(`/learning`)}> Learn 🧠 </Button>

</main>

<style>
</style>
