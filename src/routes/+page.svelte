<script lang="ts">
  import { Car } from '$lib/car';
  import { Road } from '$lib/road';
import { Visualizer } from '$lib/visualizer';
 

  import { onMount } from 'svelte';

  //variables
  let carCanvas: HTMLCanvasElement;
  let networkCanvas: HTMLCanvasElement;
  let car: Car;
  let carCtx: CanvasRenderingContext2D;
  let networkCtx: CanvasRenderingContext2D;
  let road: Road;
  let traffic: Car[];
  let colors: string[] = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff', '#ffffff'];

  onMount(() => {
    carCanvas = document.getElementById('carCanvas') as HTMLCanvasElement;
    networkCanvas = document.getElementById('networkCanvas') as HTMLCanvasElement;
    carCanvas.width = 200;
    networkCanvas.width = 300;
    carCtx = carCanvas.getContext('2d') as CanvasRenderingContext2D;
    networkCtx = networkCanvas.getContext('2d') as CanvasRenderingContext2D;
    road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);
    car = new Car(road.getLaneCenter(1), 100, 30, 50, "AI");
    traffic = [
      new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2),
      new Car(road.getLaneCenter(0), -100, 30, 50, "DUMMY", 1.7),
      new Car(road.getLaneCenter(2), -200, 30, 50, "DUMMY", 2.3),
      new Car(road.getLaneCenter(0), -600, 30, 50, "DUMMY", 2.2),
      new Car(road.getLaneCenter(1), -600, 30, 50, "DUMMY", 2.8),
      new Car(road.getLaneCenter(2), -700, 30, 50, "DUMMY", 2.4),
    ]
    animate();

  });

  function animate(time: number = 0) {
    for(let i = 0; i < traffic.length; i++) {
      traffic[i].update(road.borders, []);
    }
    car.update(road.borders, traffic);

    carCanvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight;

    // makes the road infinite
    carCtx.save();
    carCtx.translate(0, -car.y + carCanvas.height * 0.7);

    road.draw(carCtx);
    for(let i=0;i<traffic.length;i++){
        traffic[i].draw(carCtx,colors[i%colors.length]);
    }
    car.draw(carCtx);

    carCtx.restore();

    networkCtx.lineDashOffset=-time/50;
    Visualizer.drawNetwork(networkCtx, car.brain);
    requestAnimationFrame(animate);
  }
</script>

<main class="body">
  <canvas id="carCanvas" />
  <canvas id="networkCanvas"></canvas>
</main>

<style>
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
