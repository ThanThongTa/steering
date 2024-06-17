import { createVector, globalContext } from './my.js'

export class Boid {
  constructor () {
    this.position = createVector(globalContext.width / 2, globalContext.height / 2)
    this.velocity = createVector()
    this.acceleration = createVector()
  }

  show () {}
}

export const createBoid = () => {
  return new Boid()
}
