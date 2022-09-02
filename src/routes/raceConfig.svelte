<script lang="ts">
  import { goto } from '$app/navigation';

  import { Button, Center, Container, NumberInput, Stack } from '@svelteuidev/core';

  let UsrSpd: number = 4;
  function onChangeUsr(e: { detail: number }) {
    UsrSpd = e.detail;
  }
  var AiSpd: number = 4;
  function onChangeAi(e: { detail: number }) {
    AiSpd = e.detail;
  }
</script>

<Container size="xs"  override={{px: '20px'}}>
  <Stack spacing="xl">
    <NumberInput
      on:change={onChangeUsr}
      defaultValue={4}
      label="Your speed"
      description="Any number from 3 to 6"
      min={3}
      max={6}
    />

    <NumberInput
      on:change={onChangeAi}
      defaultValue={4}
      label="AI speed"
      description="Any integer from 3 to 6  (floats work but are not perfectly trained yet)"
      min={3}
      max={6}
    />

    <!--  size="lg" outline {color} -->
    <div class="center">

  <Button variant="gradient" size="lg" compact on:click={() => goto(`/racing/?UsrSpd=${UsrSpd}&AiSpd=${AiSpd}`)}>Race 🏁</Button>
    </div>
  
</Stack>
</Container>

<style>
  .center{
    display: flex;
    justify-content: center;
    align-items: center;

  }
</style>
