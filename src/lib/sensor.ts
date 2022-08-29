import { lerp, getIntersection } from '../utils';
import type { Car } from './car';
import type { Point } from 'src/types/point.type';
import type { Ray } from 'src/types/ray.type';
import type { Reading } from 'src/types/reading.type';

export class Sensor {
  car: Car;
  rayCount: number;
  rayLength: number;
  raySpread: number;
  rays: Ray[][];
  readings: Reading[];

  constructor(car: Car) {
    this.car = car;
    this.rayCount = 5;
    this.rayLength = 150;
    this.raySpread = Math.PI / 2;

    this.rays = [];
    this.readings = [];
  }

  update(roadBorders: Point[][], traffic: Car[]) {
    this.#castRays();
    this.readings = [];
    for (let i = 0; i < this.rays.length; i++) {
      this.readings.push(
        this.#getReading(
          this.rays[i] as Ray[],
          roadBorders as Point[][],
          traffic as Car[]
        ) as Reading
      );
    }
  }

  #getReading(ray: Ray[], roadBorders: Point[][], traffic: Car[]): Reading | null {
    let touches = [];

    for (let i = 0; i < roadBorders.length; i++) {
      const touch = getIntersection(
        ray[0] as Ray,
        ray[1] as Ray,
        roadBorders[i][0] as Point,
        roadBorders[i][1] as Point
      );
      if (touch) {
        touches.push(touch);
      }
    }

    for (let i = 0; i < traffic.length; i++) {
      const poly = traffic[i].polygon;
      for (let j = 0; j < poly.length; j++) {
        const value = getIntersection(
          ray[0] as Ray,
          ray[1] as Ray,
          poly[j] as Point,
          poly[(j + 1) % poly.length] as Point
        );
        if (value) {
          touches.push(value);
        }
      }
    }

    if (touches.length == 0) {
      return null;
    } else {
      // goes through the touches and gets the closest one
      const offsets = touches.map((e) => e.offset);
      const minOffset = Math.min(...offsets);
      // finds the touch with the min offset and returns it
      return touches.find((e) => e.offset == minOffset) as Reading;
    }
  }

  #castRays() {
    this.rays = [];
    for (let i = 0; i < this.rayCount; i++) {
      const rayAngle =
        lerp(
          this.raySpread / 2,
          -this.raySpread / 2,
          this.rayCount == 1 ? 0.5 : i / (this.rayCount - 1)
        ) + this.car.angle;

      const start = { x: this.car.x, y: this.car.y };
      const end = {
        x: this.car.x - Math.sin(rayAngle) * this.rayLength,
        y: this.car.y - Math.cos(rayAngle) * this.rayLength
      };
      this.rays.push([start, end] as Ray[]);
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (let i = 0; i < this.rayCount; i++) {
      let end = this.readings[i] ? (this.readings[i] as Reading) : (this.rays[i][1] as Ray);

      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'yellow';
      ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();

      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'black';
      ctx.moveTo(this.rays[i][1].x, this.rays[i][1].y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
    }
  }
}
