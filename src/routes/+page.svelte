<script lang="ts">
  import { Car } from '$lib/car';
  import { Road } from '$lib/road';
  import { Sensor } from '$lib/sensor';

  import { onMount } from 'svelte';

  //variables
  let canvas: HTMLCanvasElement;
  let car: Car;
  let ctx: any;
  let road: Road;

  onMount(() => {
    canvas = document.getElementById('carCanvas') as HTMLCanvasElement;
    // @ts-ignore
    // @ts-ignore
    canvas.width = 200;
    // @ts-ignore
    ctx = canvas.getContext('2d');
    road = new Road(canvas.width / 2, canvas.width * 0.9);
    car = new Car(road.getLaneCenter(1), 100, 30, 50);
    animate();
  });

  function animate() {
    car.update(road.borders);

    canvas.height = window.innerHeight;

    // makes the road infinite
    ctx.save();
    ctx.translate(0, -car.y + canvas.height * 0.7);

    road.draw(ctx);
    car.draw(ctx);

    ctx.restore();
    requestAnimationFrame(animate);
  }
</script>

<main class="body">
  <canvas id="carCanvas" />
  <!-- <canvas id="networkCanvas"></canvas> -->
</main>

<style>
  #carCanvas {
    background: lightgray;
  }
  .body {
    margin: 0;
    background: darkgray;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
