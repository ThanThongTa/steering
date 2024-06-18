import globalContext, { createVector, strokeWeight, stroke, point, sub, triangle, random } from './my.js'

export class Boid {
  constructor () {
    this.position = createVector(random(globalContext.width),
      random(globalContext.height))
    this.velocity = createVector(random(-1, 1), random(-1, 1))
    this.velocity.setMag(random(2, 4))
    this.acceleration = createVector()
    this.maxForce = 0.2
    this.maxSpeed = 4
    this.size = 5
    this.alignPerception = 50
    this.coherePerception = 50
    this.separatePerception = 50
    this.viewPerception = 50
    this.viewAversion = 2
    this.alignWeight = 1
    this.cohereWeight = 1
    this.separateWeight = 1
    this.viewWeight = 1
  }

  run (boids) {
    this.flock(boids)
    this.update()
    this.edges()
    this.show(false)
  }

  show (asCircle = true) {
    if (asCircle) {
      strokeWeight(8)
      stroke(255)
      point(this.position.x, this.position.y)
    } else {
      const angle = this.velocity.heading()
      triangle(this.position.x, this.position.y, angle, this.size)
    }
  }

  edges () {
    if (this.position.x > globalContext.width) {
      this.position.x = 0
    } else if (this.position.x < 0) {
      this.position.x = globalContext.width
    }
    if (this.position.y > globalContext.height) {
      this.position.y = 0
    } else if (this.position.y < 0) {
      this.position.y = globalContext.height
    }
  }

  update () {
    this.position.add(this.velocity)
    this.velocity.add(this.acceleration)
    this.velocity.limit(this.maxSpeed)
    this.acceleration.mult(0)
  }

  seek (target) {
    const desired = sub(target, this.position) // A vector pointing from the location to the target
    // Normalize desired and scale to maximum speed
    desired.normalize()
    desired.mult(this.maxSpeed)
    // Steering = Desired minus Velocity
    const steer = sub(desired, this.velocity)
    steer.limit(this.maxForce) // Limit to maximum steering force
    return steer
  }

  align (boids) {
    const perception = this.alignPerception
    let total = 0
    const steering = createVector()

    for (const other of boids) {
      if (this === other) continue
      if (this.position.dist(other.position) > perception) continue
      steering.add(other.velocity)
      total++
    }

    if (total === 0) return steering

    steering.div(total)
    steering.setMag(this.maxSpeed)
    steering.sub(this.velocity)
    steering.limit(this.maxForce)
    return steering
  }

  cohere (boids) {
    const perception = this.coherePerception
    let total = 0
    const steering = createVector()

    for (const other of boids) {
      if (this === other) continue
      if (this.position.dist(other.position) > perception) continue
      steering.add(other.position)
      total++
    }

    if (total === 0) return steering

    steering.div(total)
    steering.sub(this.position)
    steering.setMag(this.maxSpeed)
    steering.sub(this.velocity)
    steering.limit(this.maxForce)
    return steering
  }

  separate (boids) {
    const perception = this.separatePerception
    let total = 0
    const steering = createVector()

    for (const other of boids) {
      const distance = this.position.dist(other.position)
      if (this === other) continue
      if (distance > perception) continue
      const diff = sub(this.position, other.position)
      diff.div(distance)
      steering.add(diff)
      total++
    }

    if (total === 0) return steering

    steering.div(total)
    steering.setMag(this.maxSpeed)
    steering.sub(this.velocity)
    steering.limit(this.maxForce)
    return steering
  }

  view (boids) {
    const viewAngle = Math.PI / 4
    const aversion = this.viewAversion
    const viewDistance = this.viewPerception
    const lateralMove = createVector(
      this.velocity.y,
      -this.velocity.x
    ).normalize()
    const steer = createVector(0, 0)
    let blocking = false
    for (const other of boids) {
      const difference = sub(other.position, this.position)
      const distance = difference.mag() * aversion
      const angle = this.velocity.angleBetween(difference)
      if (
        other !== this &&
        distance < viewDistance &&
        Math.abs(angle) < viewAngle
      ) {
        blocking = true
        if (angle < 0) {
          steer.sub(lateralMove)
        } else {
          steer.add(lateralMove)
        }
      }
    }

    if (blocking) {
      steer.setMag(this.maxSpeed)
      steer.sub(this.velocity)
      steer.limit(this.maxForce)
    }

    return steer
  }

  flock (boids) {
    const alignment = this.align(boids)
    const cohesion = this.cohere(boids)
    const separation = this.separate(boids)
    const sight = this.view(boids)
    alignment.mult(this.alignWeight)
    cohesion.mult(this.cohereWeight)
    separation.mult(this.separateWeight)
    sight.mult(this.viewWeight)
    this.acceleration.add(alignment)
    this.acceleration.add(cohesion)
    this.acceleration.add(separation)
    this.acceleration.add(sight)
  }
}

export const createBoid = () => {
  return new Boid()
}
