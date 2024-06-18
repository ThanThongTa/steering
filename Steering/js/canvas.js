/* global Path2D */
import globalContext from './globalContext.js'

let lineWidth = 4
let useStroke = true
let useFill = true
let region = null
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

export const beginShape = () => {
  context.beginPath()
}

export const beginPath = () => {
  region = new Path2D()
}

export const endPath = () => {
  region.closePath()
  context.fillStyle = 'green'
  context.strokeStyle = 'green'
  context.fill(region)
}

export const triangle = (x, y, angle, size) => {
  const colorFill = 127
  const colorStroke = 0
  context.fillStyle = `rgb(${colorFill}, ${colorFill}, ${colorFill})`
  useFill = true
  context.strokeStyle = `rgb(${colorStroke}, ${colorStroke}, ${colorStroke})`
  useStroke = true
  context.save()
  context.translate(x, y)
  context.rotate(angle)
  context.beginPath()
  context.moveTo(size * 2, 0)
  context.lineTo(size * -2, size * -1)
  context.lineTo(size * -2, size * 1)
  context.stroke()
  context.fill()
  context.closePath()
  context.restore()
}

export const endShape = () => {
  context.closePath()
}

export const line = (x1, y1, x2, y2) => {
  context.moveTo(x1, y1)
  context.lineTo(x2, y2)
  context.stroke()
  context.fillStyle = 'green'
  context.fill()
}

export const stroke = (color) => {
  context.strokeStyle = `rgb(${color}, ${color}, ${color})`
  useStroke = true
}

export const fillStyle = (style) => {
  context.fillStyle = style
  useFill = true
}

export const push = () => {
  context.save()
}

export const pop = () => {
  context.restore()
}

export const translate = (x, y) => {
  context.translate(x, y)
}

export const rotate = (angle) => {
  context.rotate(angle)
}

export const fill = (color) => {
  context.fillStyle = `rgb(${color}, ${color}, ${color})`
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
