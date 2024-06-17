import globalContext, { createVector, strokeWeight, stroke, point, random2D, random } from './my.js'

export class Boid {
  constructor () {
    this.position = createVector(globalContext.width / 2, globalContext.height / 2)
    this.velocity = random2D()
    this.velocity.setMag(random(0.5, 1.5))
    this.acceleration = createVector()
  }

  show () {
    strokeWeight(16)
    stroke(255)
    point(this.position.x, this.position.y)
  }

  update () {
    this.position.add(this.velocity)
    this.velocity.add(this.acceleration)
    this.acceleration.mult(0)
  }

  align (boids) {
    const perception = 100
    let total = 0
    const steering = createVector()

    for (const other of boids) {
      if (this === other) continue
      if (this.position.dist(other.position) > perception) continue
      steering.add(other.velocity)
      total++
    }
    if (total === 0) return
    steering.div(total)
    steering.sub(this.velocity)
    return steering
  }
}

export const createBoid = () => {
  return new Boid()
}
