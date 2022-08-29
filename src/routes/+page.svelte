<script lang="ts">
  import { Car } from '$lib/car';
  import { Road } from '$lib/road';
 

  import { onMount } from 'svelte';

  //variables
  let canvas: HTMLCanvasElement;
  let car: Car;
  let ctx: any;
  let road: Road;
  let traffic: Car[];
  let colors: string[] = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff', '#ffffff'];

  onMount(() => {
    canvas = document.getElementById('carCanvas') as HTMLCanvasElement;
    // @ts-ignore
    canvas.width = 200;
    ctx = canvas.getContext('2d');
    road = new Road(canvas.width / 2, canvas.width * 0.9);
    car = new Car(road.getLaneCenter(1), 100, 30, 50, "KEYS");
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

  function animate() {
    for(let i = 0; i < traffic.length; i++) {
      traffic[i].update(road.borders, []);
    }
    car.update(road.borders, traffic);

    canvas.height = window.innerHeight;

    // makes the road infinite
    ctx.save();
    ctx.translate(0, -car.y + canvas.height * 0.7);

    road.draw(ctx);
    for(let i=0;i<traffic.length;i++){
        traffic[i].draw(ctx,colors[i%colors.length]);
    }
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
