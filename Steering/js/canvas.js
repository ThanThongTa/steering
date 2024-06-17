import globalContext from './globalContext.js'

let lineWidth = 4
let useStroke = true
let useFill = true
const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

export const noStroke = () => {
  useStroke = false
}

export const noFill = () => {
  useFill = false
}

export const strokeWeight = (weight) => {
  lineWidth = weight
  useStroke = true
}

export const stroke = (color) => {
  context.strokeStyle = `rgb(${color}, ${color}, ${color})`
  useStroke = true
}

export const fillStyle = (style) => {
  context.fillStyle = style
  useFill = true
}

export const circle = (x, y, radius) => {
  context.lineWidth = lineWidth
  context.beginPath()
  context.arc(x, y, radius, 0, 2 * Math.PI)
  if (useFill) context.fill()
  if (useStroke) context.stroke()
}

export const point = (x, y) => {
  circle(x, y, 1)
}

export const createCanvas = (width, height) => {
  canvas.width = width
  canvas.height = height
  globalContext.width = canvas.width
  globalContext.height = canvas.height
  context.clearRect(0, 0, canvas.width, canvas.height)
}

export const background = (color) => {
  context.fillStyle = `rgb(${color}, ${color}, ${color})`
  context.fillRect(0, 0, canvas.width, canvas.height)
}

export const rect = (x, y, width, height) => {
  context.beginPath()
  context.rect(x, y, width, height)
  if (useFill) context.fill()
  if (useStroke) context.stroke()
}
