<script lang="ts">
  import { Car } from '$lib/car';
  import type { NeuralNetwork } from '$lib/network';
  import { Road } from '$lib/road';

  import { onMount } from 'svelte';
  import { getTraffic } from '../../data/traffic';

  //variables
  let carCanvas: HTMLCanvasElement;
  let UsrCar: Car;
  let carCtx: CanvasRenderingContext2D;
  let road: Road;
  let traffic: Car[];
  let bestCar: Car;

  let AiSpeed: number = 3;
  let UserSpeed: number = 3.3;
  onMount(() => {
    carCanvas = document.getElementById('carCanvas') as HTMLCanvasElement;
    carCanvas.width = 200;
    carCtx = carCanvas.getContext('2d') as CanvasRenderingContext2D;
    road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);
    traffic = getTraffic(road);
    // const N = 1;
    // cars = generateCars(N);
    bestCar = new Car(road.getLaneCenter(1), 100, 30, 50, 'AI', AiSpeed);
    bestCar.brain = JSON.parse(
      localStorage.getItem(`bestBrain-${AiSpeed}`) as string
    ) as NeuralNetwork;

    UsrCar = new Car(road.getLaneCenter(1), 100, 30, 50, 'KEYS', UserSpeed);

    animate();
  });

  function animate() {
    for (let i = 0; i < traffic.length; i++) {
      traffic[i].update(road.borders, []);
    }
    bestCar.update(road.borders, traffic);
    UsrCar.update(road.borders, traffic);

    // bestCar = cars.find((c) => c.y == Math.min(...cars.map((c) => c.y))) as Car;

    carCanvas.height = window.innerHeight;

    // makes the road infinite
    carCtx.save();
    carCtx.translate(0, -UsrCar.y + carCanvas.height * 0.7);

    road.draw(carCtx);
    for (let i = 0; i < traffic.length; i++) {
      traffic[i].draw(carCtx, false);
    }

    bestCar.draw(carCtx, true);
    UsrCar.draw(carCtx);

    carCtx.restore();

    requestAnimationFrame(animate);
  }
</script>

<main class="body">
  <canvas id="carCanvas" />
</main>

<style>
  #carCanvas {
    background: lightgray;
  }

  main {
    margin: 0;
    background: darkgray;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
