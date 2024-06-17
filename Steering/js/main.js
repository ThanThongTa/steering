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
  for (let i = 0; i < 50; i++) {
    flock.push(new Boid())
  }
}

const render = () => {
  background(51)

  for (const boid of flock) {
    boid.update()
    boid.show()
  }

  requestAnimationFrame(render)
}
