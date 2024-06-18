export const el = (css) => document.querySelector(css)
export const random = (min, max) => {
  if (max === undefined) {
    max = min
    min = 0
  }
  return Math.random() * (max - min) + min
}
