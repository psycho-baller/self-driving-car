<script lang="ts">
  import { goto } from '$app/navigation';

  import { Stack, Container, Button, NumberInput } from '@svelteuidev/core';

  let spdVal: number = 6;
  function onChangeSpd(e: { detail: number }) {
    spdVal = e.detail;
  }
  var mtnVal: number = 0.1;
  function onChangeMtn(e: { detail: number }) {
    mtnVal = e.detail;
  }
  let popVal: number = 10;
  function onChangePop(e: { detail: number }) {
    popVal = e.detail;
  }
</script>

<Container size="xs"  override={{px: '20px'}}>
  <Stack spacing="xl">
    <NumberInput
      on:change={onChangeSpd}
      defaultValue={6}
      label="AI speed"
      description="Any integer from 3 to 6 (floats work but are not perfectly trained yet)"
      min={3}
      max={6}
    />

    <NumberInput
      on:change={onChangeMtn}
      label="Mutation"
      description="Betweeen 0 and 1, the higher the more diverse the population"
      defaultValue={0.1}
      precision={2}
      min={0.01}
      max={0.99}
      step={0.05}
    />

    <NumberInput
      on:change={onChangePop}
      label="The population size of the AI cars"
      description="Any integer from 1 to 1000"
      defaultValue={10}
      min={1}
      max={1000}
      step={10}
      stepHoldDelay={500}
      stepHoldInterval={50}
    />
      <div class="center">

  <Button variant="gradient" size="lg" compact  on:click={() => goto(`/learning/?AiSpd=${spdVal}&mtn=${mtnVal}&n=${popVal}`)}>Learn 🧠</Button>
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
