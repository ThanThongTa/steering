/* global requestAnimationFrame */
import { createCanvas, background } from './my.js'
import { Boid } from './boid.js'

export const main = () => {
  setup()
  render()
}

const flock = []

const setup = () => {
  createCanvas(800, 600)
  for (let i = 0; i < 100; i++) {
    flock.push(new Boid())
  }
}

const render = () => {
  background(51)

  // use a snapshot of all velocities instead of one after the other

  // spacial sub division, quad tree

  // interface: perception radius, max force, max speed, each rule

  // visual design: triangles

  // view rule

  for (const boid of flock) {
    boid.run(flock)
  }

  requestAnimationFrame(render)
}
