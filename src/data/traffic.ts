import { Car } from "$lib/car";
import type { Road } from "$lib/road";
import { getRandomColor } from "../utils";


export function getTraffic(road: Road) {
    return [
      new Car(road.getLaneCenter(1), -100, 30, 50, 'DUMMY', 2, getRandomColor()),
      new Car(road.getLaneCenter(0), -100, 30, 50, 'DUMMY', 2, getRandomColor()),
      new Car(road.getLaneCenter(2), -300, 30, 50, 'DUMMY', 2, getRandomColor()),
      new Car(road.getLaneCenter(1), -300, 30, 50, 'DUMMY', 2, getRandomColor()),
      // new Car(road.getLaneCenter(1), -150, 30, 50, 'DUMMY', 2, getRandomColor()),
      // new Car(road.getLaneCenter(0), -250, 30, 50, 'DUMMY', 2, getRandomColor()),
      // new Car(road.getLaneCenter(2), -250, 30, 50, 'DUMMY', 2, getRandomColor()),
      // new Car(road.getLaneCenter(1), -350, 30, 50, 'DUMMY', 2, getRandomColor()),
      new Car(road.getLaneCenter(0), -600, 30, 50, 'DUMMY', 2, getRandomColor()),
      new Car(road.getLaneCenter(1), -700, 30, 50, 'DUMMY', 2, getRandomColor()),
      new Car(road.getLaneCenter(2), -820, 30, 50, 'DUMMY', 2, getRandomColor()),
      new Car(road.getLaneCenter(1), -900, 30, 50, 'DUMMY', 2, getRandomColor()),
      new Car(road.getLaneCenter(0), -1050, 30, 50, 'DUMMY', 2, getRandomColor()),
      new Car(road.getLaneCenter(2), -1050, 30, 50, 'DUMMY', 2, getRandomColor()),
      new Car(road.getLaneCenter(0), -1150, 30, 50, 'DUMMY', 2, getRandomColor()),
      new Car(road.getLaneCenter(2), -1150, 30, 50, 'DUMMY', 2, getRandomColor()),
      new Car(road.getLaneCenter(0), -1250, 30, 50, 'DUMMY', 2, getRandomColor()),
      new Car(road.getLaneCenter(2), -1250, 30, 50, 'DUMMY', 2, getRandomColor()),
      new Car(road.getLaneCenter(0), -1350, 30, 50, 'DUMMY', 2, getRandomColor()),
      new Car(road.getLaneCenter(2), -1350, 30, 50, 'DUMMY', 2, getRandomColor()),
      new Car(road.getLaneCenter(1), -1550, 30, 50, 'DUMMY', 2, getRandomColor()),
      new Car(road.getLaneCenter(0), -1650, 30, 50, 'DUMMY', 2, getRandomColor()),
      new Car(road.getLaneCenter(2), -1650, 30, 50, 'DUMMY', 2, getRandomColor()),
      new Car(road.getLaneCenter(1), -1750, 30, 50, 'DUMMY', 2, getRandomColor()),
      new Car(road.getLaneCenter(0), -1950, 30, 50, 'DUMMY', 2, getRandomColor()),
      new Car(road.getLaneCenter(2), -1950, 30, 50, 'DUMMY', 2, getRandomColor()),
      new Car(road.getLaneCenter(0), -2050, 30, 50, 'DUMMY', 2, getRandomColor()),
      new Car(road.getLaneCenter(2), -2050, 30, 50, 'DUMMY', 2, getRandomColor()),
      new Car(road.getLaneCenter(0), -2150, 30, 50, 'DUMMY', 2, getRandomColor()),
      new Car(road.getLaneCenter(2), -2150, 30, 50, 'DUMMY', 2, getRandomColor()),
      new Car(road.getLaneCenter(0), -2250, 30, 50, 'DUMMY', 2, getRandomColor()),
      new Car(road.getLaneCenter(2), -2250, 30, 50, 'DUMMY', 2, getRandomColor())
    ];
}