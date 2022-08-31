<script lang="ts">
  import { Car } from '$lib/car';
  import { NeuralNetwork } from '$lib/network';
  import { Road } from '$lib/road';

  import { onMount } from 'svelte';
  import { getTraffic } from '../../data/traffic';

  //variables
  let carCanvas: HTMLCanvasElement;
  let cars: Car[];
  let UsrCar: Car;
  let carCtx: CanvasRenderingContext2D;
  let road: Road;
  let traffic: Car[];
  let bestCar: Car;
  let AISpeed: number = 5;
  let UserSpeed: number = 6;

  onMount(() => {
    carCanvas = document.getElementById('carCanvas') as HTMLCanvasElement;
    carCanvas.width = 200;
    carCtx = carCanvas.getContext('2d') as CanvasRenderingContext2D;
    road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);
    traffic = getTraffic(road);
    const N = 1;
    cars = generateCars(N);
    bestCar = cars[0];
    const speed = bestCar.maxSpeed;
    if (localStorage.getItem('bestBrain')) {
      for (let i = 0; i < cars.length; i++) {
        cars[i].brain = JSON.parse(localStorage.getItem(`bestBrain-${speed}`) as string)
          ? (JSON.parse(localStorage.getItem(`bestBrain-${speed}`) as string) as NeuralNetwork)
          : (JSON.parse(localStorage.getItem('bestBrain') as string) as NeuralNetwork);
        if (i != 0) {
          NeuralNetwork.mutate(cars[i].brain, 0.1);
        }
      }
    }
    UsrCar = new Car(road.getLaneCenter(1), 100, 30, 50, 'KEYS', UserSpeed);

    animate();
  });

  function generateCars(N: number) {
    const cars = [];
    for (let i = 1; i <= N; i++) {
      cars.push(new Car(road.getLaneCenter(1), 100, 30, 50, 'AI', AISpeed));
    }
    return cars;
  }

  function animate() {
    for (let i = 0; i < traffic.length; i++) {
      traffic[i].update(road.borders, []);
    }
    for (let i = 0; i < cars.length; i++) {
      cars[i].update(road.borders, traffic);
    }
    UsrCar.update(road.borders, traffic);

    bestCar = cars.find((c) => c.y == Math.min(...cars.map((c) => c.y))) as Car;

    carCanvas.height = window.innerHeight;

    // makes the road infinite
    carCtx.save();
      carCtx.translate(0, -UsrCar.y + carCanvas.height * 0.7);


    road.draw(carCtx);
    for (let i = 0; i < traffic.length; i++) {
      traffic[i].draw(carCtx, false);
    }
    carCtx.globalAlpha = 0.2;
    for (let i = 0; i < cars.length; i++) {
      cars[i].draw(carCtx);
    }

    carCtx.globalAlpha = 1;
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
