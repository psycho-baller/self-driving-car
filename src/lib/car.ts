import { Controls } from './controls';
import type { Point } from 'src/types/point.type';
import { Sensor } from './sensor';
import { polysIntersect } from '../utils';
import { NeuralNetwork } from './network';

export class Car {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  acceleration: number;
  maxSpeed: number;
  friction: number;
  angle: number;
  damaged: boolean;
  useBrain: boolean;
  controls: Controls;
  sensor!: Sensor;
  polygon!: Point[];
  brain!: NeuralNetwork;
  img: HTMLImageElement;
  mask: HTMLCanvasElement;
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    controlType: string,
    color: string = "blue",
    maxSpeed: number = 3,
    acceleration: number = 0.2,
    friction: number = 0.05
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = 0;
    this.acceleration = acceleration;
    this.maxSpeed = maxSpeed;
    this.friction = friction;
    this.angle = 0;
    this.damaged = false;
    this.useBrain = controlType == 'AI';

    if (controlType != 'DUMMY') {
      this.sensor = new Sensor(this) as Sensor;
      this.brain = new NeuralNetwork([this.sensor.rayCount, 6, 4]);
    }
    this.controls = new Controls(controlType);

    this.img = new Image();
    this.img.src = 'src/assets/car.png';

    this.mask = document.createElement('canvas');
    this.mask.width = width;
    this.mask.height = height;

    const maskCtx = this.mask.getContext('2d') as CanvasRenderingContext2D;
    this.img.onload = () => {
      maskCtx.fillStyle = color;
      maskCtx.rect(0, 0, this.width, this.height);
      maskCtx.fill();

      maskCtx.globalCompositeOperation = 'destination-atop';
      maskCtx.drawImage(this.img, 0, 0, this.width, this.height);
    };
  }

  update(roadBorders: Point[][], traffic: Car[]) {
    if (!this.damaged) {
      this.#move();
      this.polygon = this.#createPolygon();
      this.damaged = this.#assessDamage(roadBorders, traffic);
    }
    if (this.sensor) {
      this.sensor.update(roadBorders, traffic);
      const offsets = this.sensor.readings.map((s) => (s == null ? 0 : 1 - s.offset));
      const outputs = NeuralNetwork.feedForward(offsets, this.brain);

      if (this.useBrain) {
        this.controls.forward = outputs[0] == 1;
        this.controls.left = outputs[1] == 1;
        this.controls.right = outputs[2] == 1;
        this.controls.reverse = outputs[3] == 1;
      }
    }
  }

  #assessDamage(roadBorders: Point[][], traffic: Car[]) {
    // Check if car is outside of the road
    for (let i = 0; i < roadBorders.length; i++) {
      if (polysIntersect(this.polygon as Point[], roadBorders[i] as Point[])) {
        return true;
      }
    }

    // Check if car has collided with another car
    for (let i = 0; i < traffic.length; i++) {
      if (polysIntersect(this.polygon, traffic[i].polygon)) {
        return true;
      }
    }
    return false;
  }

  #createPolygon(): Point[] {
    const points = [];
    const rad = Math.hypot(this.width, this.height) / 2;
    const alpha = Math.atan2(this.width, this.height);
    points.push({
      x: this.x - Math.sin(this.angle - alpha) * rad,
      y: this.y - Math.cos(this.angle - alpha) * rad
    });
    points.push({
      x: this.x - Math.sin(this.angle + alpha) * rad,
      y: this.y - Math.cos(this.angle + alpha) * rad
    });
    points.push({
      x: this.x - Math.sin(Math.PI + this.angle - alpha) * rad,
      y: this.y - Math.cos(Math.PI + this.angle - alpha) * rad
    });
    points.push({
      x: this.x - Math.sin(Math.PI + this.angle + alpha) * rad,
      y: this.y - Math.cos(Math.PI + this.angle + alpha) * rad
    });
    return points;
  }

  #move() {
    if (this.controls.forward) {
      this.speed += this.acceleration;
    }
    if (this.controls.reverse) {
      this.speed -= this.acceleration;
    }

    if (this.speed > this.maxSpeed) {
      this.speed = this.maxSpeed;
    }
    if (this.speed < -this.maxSpeed / 2) {
      this.speed = -this.maxSpeed / 2;
    }

    if (this.speed > 0) {
      this.speed -= this.friction;
    }
    if (this.speed < 0) {
      this.speed += this.friction;
    }
    if (Math.abs(this.speed) < this.friction) {
      this.speed = 0;
    }

    if (this.speed != 0) {
      const flip = this.speed > 0 ? 1 : -1;
      if (this.controls.left) {
        this.angle += 0.03 * flip;
      }
      if (this.controls.right) {
        this.angle -= 0.03 * flip;
      }
    }

    this.x -= Math.sin(this.angle) * this.speed;
    this.y -= Math.cos(this.angle) * this.speed;
  }

  draw(ctx: CanvasRenderingContext2D, drawSensor = false) {
    if (this.sensor && drawSensor) {
      this.sensor.draw(ctx);
    }
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(-this.angle);
    if (!this.damaged) {
      ctx.drawImage(this.mask, -this.width / 2, -this.height / 2, this.width, this.height);
      ctx.globalCompositeOperation = 'multiply';
    }
    ctx.drawImage(this.img, -this.width / 2, -this.height / 2, this.width, this.height);
    ctx.restore();
  }
}
