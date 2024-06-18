class Vector {
  constructor (x, y) {
    this.x = x
    this.y = y
  }

  static random2D () {
    const rndx = Math.random() * 2 - 1
    const rndy = Math.random() * 2 - 1
    const vec = new Vector(rndx, rndy)
    vec.setMag(1)
    return vec
  }

  static sub (a, b) {
    return new Vector(a.x - b.x, a.y - b.y)
  }

  heading () {
    return Math.atan2(this.y, this.x)
  }

  angleBetween (vector) {
    return this.heading() - vector.heading()
  }

  fromAngle (angle) {
    this.x = Math.cos(angle)
    this.y = Math.sin(angle)
  }

  dist (vector) {
    const dx = this.x - vector.x
    const dy = this.y - vector.y
    return Math.sqrt(dx * dx + dy * dy)
  }

  distSquared (vector) {
    const dx = this.x - vector.x
    const dy = this.y - vector.y
    return dx * dx + dy * dy
  }

  add (vector) {
    this.x += vector.x
    this.y += vector.y
  }

  mult (scalar) {
    this.x *= scalar
    this.y *= scalar
  }

  div (scalar) {
    this.x /= scalar
    this.y /= scalar
  }

  sub (vector) {
    this.x -= vector.x
    this.y -= vector.y
  }

  limit (max) {
    if (this.mag() > max) {
      this.setMag(max)
    }
  }

  mag () {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  normalize () {
    const length = this.mag()
    if (length > 0) {
      this.mult(1 / length)
    }
    return this
  }

  setMag (mag) {
    this.normalize()
    this.mult(mag)
  }
}

export const createVector = (x = 0, y = 0) => {
  return new Vector(x, y)
}

export const random2D = Vector.random2D
export const sub = Vector.sub
