/* global requestAnimationFrame */
import { createCanvas, fillStyle, background, noStroke, rect } from './my.js'

export const main = () => {
  setup()
  render()
}

const setup = () => {
  createCanvas(800, 600)
}

const render = () => {
  background(51)

  fillStyle('rgb(200 0 0)')
  noStroke()
  rect(10, 10, 50, 50)

  fillStyle('rgb(0 0 200 / 50%)')
  rect(30, 30, 50, 50)

  requestAnimationFrame(render)
}
