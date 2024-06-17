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

  heading () {
    return Math.atan2(this.y, this.x)
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

  length () {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  normalize () {
    const length = this.length()
    if (length > 0) {
      this.mult(1 / length)
    }
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
