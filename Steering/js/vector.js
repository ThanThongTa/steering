class Vector {
  constructor (x, y) {
    this.x = x
    this.y = y
  }
}

export const createVector = (x = 0, y = 0) => {
  return new Vector(x, y)
}
