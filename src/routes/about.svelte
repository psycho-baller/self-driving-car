<script lang="ts">
  import { Text, Container, Stack } from '@svelteuidev/core';
</script>

<Container>
  <Stack>
    <Text size="xl" weight={'bold'}>Racing Mode</Text>
    <Text>Where u can race against an AI</Text>
    <Text>
      In the racing mode tab, you can specify the speed of your car and the AI's car (neural
      networks were used to teach the car how to drive)
    </Text>
    <hr />
    <Text size="xl" weight={'bold'}>Learning Mode</Text>
    <Text>
      Where u can watch how the cars learn to drive by themselves. U can also reset the neural
      network so u can re-teach them how to drive using neural networks
    </Text>
    <Text class='list'>
      In the learning mode tab, you can specify:
      <br>
      <br>
      <li>
        The population of cars you want to train (the more cars the higher the chance of getting a
        better, well taught car)
      </li>
      <li>
        The mutation rate (the higher the mutation rate the more diverse the population)
      </li>
        <li>
            The speed of the cars
        </li>
    </Text>
    <hr />

    <Text>
      This website was initially made by following a <a href="https://youtu.be/Rs_rAxEsAvI">tutorial</a> by <a href="https://radufromfinland.com/">Radu From Finland</a> but then I added my own twist to it by adding a Racing Mode. You can check out my code <a href="https://github.com/psycho-baller/self-driving-car">here</a>
    </Text>
  </Stack>
</Container>

<style>
:global(.list > *){
    padding-left: 5px;
    padding-bottom: 10px;
}
a{
    color: rgb(16, 152, 173);
}
a:hover{
    color: rgb(0, 255, 149);
}
a:active{
    color: rgb(111, 0, 255);
}

</style>