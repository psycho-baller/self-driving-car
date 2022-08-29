import { Controls } from './controls';
import type { Point } from 'src/types/point.type';
import { Sensor } from './sensor';
import { polysIntersect } from '../utils';

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
  sensor!: Sensor;
  controls: Controls;
  polygon!: Point[];
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    controlType: string,
    maxSpeed: number = 3,
    acceleration: number = 0.2,
    friction: number = 0.05,
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

    if (controlType != 'DUMMY') {
      this.sensor = new Sensor(this) as Sensor;
    }
    this.controls = new Controls(controlType);
  }

  update(roadBorders: Point[][], traffic: Car[]) {
    if (!this.damaged) {
      this.#move();
      this.polygon = this.#createPolygon();
      this.damaged = this.#assessDamage(roadBorders, traffic);
    }
    if (this.sensor) {
      this.sensor.update(roadBorders, traffic);
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

  draw(ctx: CanvasRenderingContext2D, color = 'black') {
    if (this.damaged) {
      ctx.fillStyle = 'gray';
    } else {
      ctx.fillStyle = color;
    }
    ctx.beginPath();
    ctx.moveTo(this.polygon[0].x, this.polygon[0].y);
    for (let i = 1; i < this.polygon.length; i++) {
      ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
    }
    ctx.fill();
    if (this.sensor) {
      this.sensor.draw(ctx);
    }
  }
}
