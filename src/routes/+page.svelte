<script lang="ts">
  import { Car } from '$lib/car';
  import { NeuralNetwork } from '$lib/network';
  import { Road } from '$lib/road';
  import { Visualizer } from '$lib/visualizer';

  import { onMount } from 'svelte';
  import { getTraffic } from '../data/traffic';

  //variables
  let carCanvas: HTMLCanvasElement;
  let networkCanvas: HTMLCanvasElement;
  let cars: Car[];
  let UsrCar: Car;
  let carCtx: CanvasRenderingContext2D;
  let networkCtx: CanvasRenderingContext2D;
  let road: Road;
  let traffic: Car[];
  let bestCar: Car;
  let AISpeed: number = 5;
  let UserSpeed: number = 6;
  let raceMode: boolean = true;

  onMount(() => {
    carCanvas = document.getElementById('carCanvas') as HTMLCanvasElement;
    networkCanvas = document.getElementById('networkCanvas') as HTMLCanvasElement;
    carCanvas.width = 200;
    networkCanvas.width = 300;
    carCtx = carCanvas.getContext('2d') as CanvasRenderingContext2D;
    networkCtx = networkCanvas.getContext('2d') as CanvasRenderingContext2D;
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
    if (raceMode) {
      UsrCar = new Car(road.getLaneCenter(1), 100, 30, 50, 'KEYS', UserSpeed);
    }

    animate();
  });

  function save(speed: number) {
    localStorage.setItem(`bestBrain-${speed}`, JSON.stringify(bestCar.brain));
  }

  function discard(speed: number) {
    localStorage.removeItem(`bestBrain-${speed}`);
  }

  function generateCars(N: number) {
    const cars = [];
    for (let i = 1; i <= N; i++) {
      cars.push(new Car(road.getLaneCenter(1), 100, 30, 50, 'AI', AISpeed));
    }
    return cars;
  }

  function animate(time: number = 0) {
    for (let i = 0; i < traffic.length; i++) {
      traffic[i].update(road.borders, []);
    }
    for (let i = 0; i < cars.length; i++) {
      cars[i].update(road.borders, traffic);
    }
    UsrCar.update(road.borders, traffic);

    bestCar = cars.find((c) => c.y == Math.min(...cars.map((c) => c.y))) as Car;

    carCanvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight;

    // makes the road infinite
    carCtx.save();
    if (raceMode) {
      carCtx.translate(0, -UsrCar.y + carCanvas.height * 0.7);
    } else {
      carCtx.translate(0, -bestCar.y + carCanvas.height * 0.7);
    }

    road.draw(carCtx);
    for (let i = 0; i < traffic.length; i++) {
      traffic[i].draw(carCtx, false);
    }
    carCtx.globalAlpha = 0.2;
    for (let i = 0; i < cars.length; i++) {
      cars[i].draw(carCtx);
    }

    carCtx.globalAlpha = 1;
    bestCar.draw(carCtx, !raceMode);
    if (raceMode) {
      UsrCar.draw(carCtx);
    }

    carCtx.restore();

    networkCtx.lineDashOffset = -time / 50;
    Visualizer.drawNetwork(networkCtx, cars[0].brain);
    requestAnimationFrame(animate);
  }
</script>

<main class="body">
  <canvas id="carCanvas" />
  <div id="verticalButtons">
    <button on:click={() => save(AISpeed)}>💾</button>
    <button on:click={() => discard(AISpeed)}>🗑️</button>
  </div>
  <canvas id="networkCanvas" />
</main>

<style>
  #verticalButtons {
    display: flex;
    flex-direction: column;
  }

  button {
    border: none;
    border-radius: 5px;
    padding: 5px 5px 7px 5px;
    margin: 2px;
    cursor: pointer;
  }
  button:hover {
    background: blue;
  }

  /* on click, make the button red */
  button:active {
    background: red;
  }

  #carCanvas {
    background: lightgray;
  }

  #networkCanvas {
    background: black;
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
